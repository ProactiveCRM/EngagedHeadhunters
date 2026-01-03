import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Upload, FileSpreadsheet, Loader2, CheckCircle, 
  AlertCircle, X, ArrowRight, FileWarning, Copy, SkipForward
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface ProspectCSVImportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CSVRow {
  [key: string]: string;
}

const PROSPECT_FIELDS = [
  { key: 'company_name', label: 'Company Name', required: false },
  { key: 'company_domain', label: 'Company Domain', required: false },
  { key: 'company_industry', label: 'Industry', required: false },
  { key: 'company_size', label: 'Company Size', required: false },
  { key: 'company_location', label: 'Company Location', required: false },
  { key: 'company_linkedin', label: 'Company LinkedIn', required: false },
  { key: 'contact_name', label: 'Contact Name', required: false },
  { key: 'contact_email', label: 'Contact Email', required: false },
  { key: 'contact_phone', label: 'Contact Phone', required: false },
  { key: 'contact_title', label: 'Contact Title', required: false },
  { key: 'contact_linkedin', label: 'Contact LinkedIn', required: false },
  { key: 'notes', label: 'Notes', required: false },
  { key: 'tags', label: 'Tags (comma-separated)', required: false },
  { key: 'source', label: 'Source', required: false },
];

export function ProspectCSVImport({ open, onOpenChange }: ProspectCSVImportProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<'upload' | 'mapping' | 'preview' | 'checking' | 'importing' | 'complete'>('upload');
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState({ success: 0, failed: 0, skipped: 0, errors: [] as string[] });
  const [isDragging, setIsDragging] = useState(false);
  const [duplicates, setDuplicates] = useState<Set<number>>(new Set());
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const parseCSV = (text: string): { headers: string[]; rows: CSVRow[] } => {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length === 0) return { headers: [], rows: [] };

    // Parse CSV properly handling quoted fields
    const parseRow = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseRow(lines[0]);
    const rows = lines.slice(1).map(line => {
      const values = parseRow(line);
      const row: CSVRow = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });

    return { headers, rows };
  };

  const handleFileUpload = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({ 
        title: 'Invalid file type', 
        description: 'Please upload a CSV file',
        variant: 'destructive' 
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { headers, rows } = parseCSV(text);
      
      if (rows.length === 0) {
        toast({ 
          title: 'Empty file', 
          description: 'The CSV file contains no data rows',
          variant: 'destructive' 
        });
        return;
      }

      setCsvHeaders(headers);
      setCsvData(rows);
      
      // Auto-map columns based on header names
      const autoMapping: Record<string, string> = {};
      headers.forEach(header => {
        const normalizedHeader = header.toLowerCase().replace(/[^a-z]/g, '');
        PROSPECT_FIELDS.forEach(field => {
          const normalizedField = field.key.replace(/_/g, '');
          const normalizedLabel = field.label.toLowerCase().replace(/[^a-z]/g, '');
          if (normalizedHeader === normalizedField || normalizedHeader === normalizedLabel) {
            autoMapping[field.key] = header;
          }
          // Common variations
          if (normalizedHeader === 'company' && field.key === 'company_name') autoMapping[field.key] = header;
          if (normalizedHeader === 'email' && field.key === 'contact_email') autoMapping[field.key] = header;
          if (normalizedHeader === 'name' && field.key === 'contact_name') autoMapping[field.key] = header;
          if (normalizedHeader === 'phone' && field.key === 'contact_phone') autoMapping[field.key] = header;
          if (normalizedHeader === 'title' && field.key === 'contact_title') autoMapping[field.key] = header;
          if (normalizedHeader === 'linkedin' && field.key === 'contact_linkedin') autoMapping[field.key] = header;
          if (normalizedHeader === 'domain' && field.key === 'company_domain') autoMapping[field.key] = header;
          if (normalizedHeader === 'website' && field.key === 'company_domain') autoMapping[field.key] = header;
          if (normalizedHeader === 'industry' && field.key === 'company_industry') autoMapping[field.key] = header;
          if (normalizedHeader === 'size' && field.key === 'company_size') autoMapping[field.key] = header;
          if (normalizedHeader === 'location' && field.key === 'company_location') autoMapping[field.key] = header;
        });
      });
      
      setColumnMapping(autoMapping);
      setStep('mapping');
    };
    reader.readAsText(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const updateMapping = (prospectField: string, csvColumn: string) => {
    setColumnMapping(prev => ({
      ...prev,
      [prospectField]: csvColumn === '_skip_' ? '' : csvColumn,
    }));
  };

  const getMappedData = (): Partial<any>[] => {
    return csvData.map(row => {
      const prospect: Record<string, any> = {
        created_by: user?.id,
        status: 'new',
        prospect_type: 'company',
      };
      
      Object.entries(columnMapping).forEach(([prospectField, csvColumn]) => {
        if (csvColumn && row[csvColumn]) {
          if (prospectField === 'tags') {
            prospect[prospectField] = row[csvColumn].split(',').map(t => t.trim()).filter(Boolean);
          } else {
            prospect[prospectField] = row[csvColumn];
          }
        }
      });

      // Determine prospect type based on data
      if (prospect.contact_name && !prospect.company_name) {
        prospect.prospect_type = 'person';
      }

      return prospect;
    });
  };

  const checkForDuplicates = async () => {
    setStep('checking');
    setImportProgress(0);
    
    const mappedData = getMappedData();
    const duplicateIndices = new Set<number>();
    
    // Collect all domains and emails from import data
    const domains: string[] = [];
    const emails: string[] = [];
    
    mappedData.forEach((prospect, index) => {
      if (prospect.company_domain) domains.push(prospect.company_domain.toLowerCase());
      if (prospect.contact_email) emails.push(prospect.contact_email.toLowerCase());
    });

    // Fetch existing prospects with matching domains or emails
    const { data: existingProspects } = await supabase
      .from('prospects')
      .select('company_domain, contact_email')
      .or(`company_domain.in.(${domains.map(d => `"${d}"`).join(',')}),contact_email.in.(${emails.map(e => `"${e}"`).join(',')})`);

    setImportProgress(50);

    if (existingProspects && existingProspects.length > 0) {
      const existingDomains = new Set(existingProspects.map(p => p.company_domain?.toLowerCase()).filter(Boolean));
      const existingEmails = new Set(existingProspects.map(p => p.contact_email?.toLowerCase()).filter(Boolean));

      mappedData.forEach((prospect, index) => {
        const domain = prospect.company_domain?.toLowerCase();
        const email = prospect.contact_email?.toLowerCase();
        
        if ((domain && existingDomains.has(domain)) || (email && existingEmails.has(email))) {
          duplicateIndices.add(index);
        }
      });
    }

    setDuplicates(duplicateIndices);
    setImportProgress(100);
    setStep('preview');
  };

  const handleImport = async () => {
    setStep('importing');
    setImportProgress(0);
    setImportResults({ success: 0, failed: 0, skipped: 0, errors: [] });

    const mappedData = getMappedData();
    const dataToImport = skipDuplicates 
      ? mappedData.filter((_, index) => !duplicates.has(index))
      : mappedData;
    
    const skippedCount = mappedData.length - dataToImport.length;
    
    if (dataToImport.length === 0) {
      setImportResults({ success: 0, failed: 0, skipped: skippedCount, errors: ['All rows are duplicates'] });
      setStep('complete');
      return;
    }

    const batchSize = 50;
    let successCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < dataToImport.length; i += batchSize) {
      const batch = dataToImport.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('prospects')
        .insert(batch);

      if (error) {
        failedCount += batch.length;
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        successCount += batch.length;
      }

      setImportProgress(Math.round(((i + batch.length) / dataToImport.length) * 100));
    }

    setImportResults({ success: successCount, failed: failedCount, skipped: skippedCount, errors });
    setStep('complete');
    queryClient.invalidateQueries({ queryKey: ['prospects'] });
  };

  const resetImport = () => {
    setStep('upload');
    setCsvData([]);
    setCsvHeaders([]);
    setColumnMapping({});
    setImportProgress(0);
    setImportResults({ success: 0, failed: 0, skipped: 0, errors: [] });
    setDuplicates(new Set());
    setSkipDuplicates(true);
  };

  const handleClose = () => {
    resetImport();
    onOpenChange(false);
  };

  const mappedFieldsCount = Object.values(columnMapping).filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Prospects from CSV
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {step === 'upload' && (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Drop your CSV file here</p>
              <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
                id="csv-upload"
              />
              <Button asChild>
                <label htmlFor="csv-upload" className="cursor-pointer">
                  Select CSV File
                </label>
              </Button>
            </div>
          )}

          {step === 'mapping' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {csvData.length} rows found • {csvHeaders.length} columns
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {mappedFieldsCount} fields mapped
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={resetImport}>
                  <X className="h-4 w-4 mr-1" />
                  Start Over
                </Button>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {PROSPECT_FIELDS.map(field => (
                    <div key={field.key} className="flex items-center gap-4">
                      <div className="w-40 shrink-0">
                        <Label className="text-sm">{field.label}</Label>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      <Select
                        value={columnMapping[field.key] || '_skip_'}
                        onValueChange={(value) => updateMapping(field.key, value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select column..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_skip_">
                            <span className="text-muted-foreground">Skip this field</span>
                          </SelectItem>
                          {csvHeaders.map(header => (
                            <SelectItem key={header} value={header}>
                              {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {columnMapping[field.key] && (
                        <Badge variant="secondary" className="shrink-0">
                          Mapped
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {step === 'checking' && (
            <div className="py-12 text-center space-y-6">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <div>
                <p className="text-lg font-medium mb-2">Checking for duplicates...</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Comparing against existing prospects
                </p>
              </div>
              <div className="max-w-xs mx-auto">
                <Progress value={importProgress} className="h-2" />
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Preview first 5 rows of mapped data
                  </p>
                  {duplicates.size > 0 && (
                    <p className="text-sm text-yellow-600 flex items-center gap-1 mt-1">
                      <Copy className="h-3 w-3" />
                      {duplicates.size} duplicate{duplicates.size > 1 ? 's' : ''} detected
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep('mapping')}>
                  Back to Mapping
                </Button>
              </div>

              {duplicates.size > 0 && (
                <div className="flex items-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <Checkbox
                    id="skip-duplicates"
                    checked={skipDuplicates}
                    onCheckedChange={(checked) => setSkipDuplicates(checked === true)}
                  />
                  <label
                    htmlFor="skip-duplicates"
                    className="text-sm font-medium cursor-pointer flex items-center gap-2"
                  >
                    <SkipForward className="h-4 w-4" />
                    Skip {duplicates.size} duplicate{duplicates.size > 1 ? 's' : ''} (matching domain or email)
                  </label>
                </div>
              )}

              <ScrollArea className="h-[350px]">
                <div className="space-y-3">
                  {getMappedData().slice(0, 5).map((prospect, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "border rounded-lg p-3 text-sm",
                        duplicates.has(index) && "border-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20"
                      )}
                    >
                      {duplicates.has(index) && (
                        <Badge variant="outline" className="mb-2 text-yellow-600 border-yellow-400">
                          <Copy className="h-3 w-3 mr-1" />
                          Duplicate
                        </Badge>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(prospect)
                          .filter(([key]) => !['created_by', 'status', 'prospect_type'].includes(key))
                          .map(([key, value]) => (
                            <div key={key}>
                              <span className="text-muted-foreground">{key}: </span>
                              <span className="font-medium">
                                {Array.isArray(value) ? value.join(', ') : String(value)}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {step === 'importing' && (
            <div className="py-12 text-center space-y-6">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <div>
                <p className="text-lg font-medium mb-2">Importing prospects...</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Please wait while we import your data
                </p>
              </div>
              <div className="max-w-xs mx-auto">
                <Progress value={importProgress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">{importProgress}% complete</p>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="py-8 text-center space-y-6">
              {importResults.failed === 0 ? (
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
              ) : importResults.success > 0 ? (
                <FileWarning className="h-16 w-16 mx-auto text-yellow-500" />
              ) : (
                <AlertCircle className="h-16 w-16 mx-auto text-destructive" />
              )}
              
              <div>
                <p className="text-lg font-medium mb-2">Import Complete</p>
                <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                  <Badge variant="default" className="bg-green-500">
                    {importResults.success} imported
                  </Badge>
                  {importResults.skipped > 0 && (
                    <Badge variant="secondary">
                      {importResults.skipped} skipped
                    </Badge>
                  )}
                  {importResults.failed > 0 && (
                    <Badge variant="destructive">
                      {importResults.failed} failed
                    </Badge>
                  )}
                </div>
              </div>

              {importResults.errors.length > 0 && (
                <div className="text-left max-w-md mx-auto">
                  <p className="text-sm font-medium mb-2">Errors:</p>
                  <ScrollArea className="h-24 border rounded p-2">
                    {importResults.errors.map((error, i) => (
                      <p key={i} className="text-xs text-destructive">{error}</p>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          {step === 'mapping' && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={checkForDuplicates}
                disabled={mappedFieldsCount === 0}
              >
                Check & Preview
              </Button>
            </>
          )}
          {step === 'preview' && (
            <>
              <Button variant="outline" onClick={() => setStep('mapping')}>
                Back
              </Button>
              <Button onClick={handleImport}>
                Import {skipDuplicates ? csvData.length - duplicates.size : csvData.length} Prospect{(skipDuplicates ? csvData.length - duplicates.size : csvData.length) !== 1 ? 's' : ''}
              </Button>
            </>
          )}
          {step === 'complete' && (
            <Button onClick={handleClose}>
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
