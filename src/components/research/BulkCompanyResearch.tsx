import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, FileSpreadsheet, Loader2, CheckCircle2, XCircle, 
  Save, Download, Building2, AlertCircle, Play, Pause
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface BulkResearchResult {
  input: string;
  status: 'pending' | 'researching' | 'success' | 'error';
  data?: any;
  error?: string;
  savedToProspects?: boolean;
}

export const BulkCompanyResearch = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState<BulkResearchResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSavingAll, setIsSavingAll] = useState(false);

  const parseCSV = (text: string): string[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const results: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Skip header row if it contains common header words
      if (i === 0 && /^(company|name|domain|url|website)/i.test(line)) continue;
      
      // Handle CSV with multiple columns - take first non-empty value
      const parts = line.split(',').map(p => p.trim().replace(/^["']|["']$/g, ''));
      const value = parts.find(p => p.length > 0);
      if (value) results.push(value);
    }
    
    return results;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      toast.error('Please upload a CSV or TXT file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      
      if (parsed.length === 0) {
        toast.error('No valid company names or domains found in file');
        return;
      }

      if (parsed.length > 100) {
        toast.error('Maximum 100 companies per batch. Please split your file.');
        return;
      }

      setCompanies(parsed.map(input => ({ input, status: 'pending' })));
      setProgress(0);
      toast.success(`Loaded ${parsed.length} companies from file`);
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const researchCompany = async (input: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      let params: { companyName?: string; domain?: string; linkedinUrl?: string } = {};
      
      if (input.includes('linkedin.com')) {
        params.linkedinUrl = input;
      } else if (input.includes('.')) {
        params.domain = input;
      } else {
        params.companyName = input;
      }

      const { data, error } = await supabase.functions.invoke('company-research', {
        body: params,
      });

      if (error) throw error;

      if (data.success) {
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.error || 'Research failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to research company' };
    }
  };

  const startResearch = async () => {
    if (companies.length === 0) {
      toast.error('Please upload a CSV file first');
      return;
    }

    setIsProcessing(true);
    setIsPaused(false);

    const pendingCompanies = companies.filter(c => c.status === 'pending' || c.status === 'error');
    
    for (let i = 0; i < companies.length; i++) {
      // Check if paused
      if (isPaused) break;

      const company = companies[i];
      if (company.status !== 'pending' && company.status !== 'error') {
        continue;
      }

      // Update status to researching
      setCompanies(prev => prev.map((c, idx) => 
        idx === i ? { ...c, status: 'researching' } : c
      ));

      const result = await researchCompany(company.input);

      // Update with result
      setCompanies(prev => prev.map((c, idx) => 
        idx === i ? { 
          ...c, 
          status: result.success ? 'success' : 'error',
          data: result.data,
          error: result.error
        } : c
      ));

      // Update progress
      const completed = companies.filter((c, idx) => 
        idx <= i && (c.status === 'success' || c.status === 'error' || idx === i)
      ).length;
      setProgress(Math.round((completed / companies.length) * 100));

      // Small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsProcessing(false);
    toast.success('Bulk research completed');
  };

  const pauseResearch = () => {
    setIsPaused(true);
    setIsProcessing(false);
  };

  const saveAllToProspects = async () => {
    if (!user) {
      toast.error('Please log in to save prospects');
      return;
    }

    const successfulCompanies = companies.filter(c => c.status === 'success' && c.data && !c.savedToProspects);
    
    if (successfulCompanies.length === 0) {
      toast.error('No new companies to save');
      return;
    }

    setIsSavingAll(true);

    try {
      const prospects = successfulCompanies.map(company => {
        const data = company.data;
        const primaryContact = data.decisionMakers?.find((dm: any) => dm.influence === 'high') || data.decisionMakers?.[0];
        
        return {
          prospect_type: 'company' as const,
          status: 'new' as const,
          company_name: data.overview?.name || company.input,
          company_domain: data.overview?.domain || null,
          company_industry: data.overview?.industry || null,
          company_size: data.size?.employeeCount?.range || null,
          company_location: data.overview?.headquarters || null,
          company_linkedin: data.overview?.linkedinUrl || null,
          company_website: data.overview?.website || null,
          contact_name: primaryContact?.name || null,
          contact_title: primaryContact?.title || null,
          contact_email: primaryContact?.email || null,
          contact_linkedin: primaryContact?.linkedinUrl || null,
          enrichment_data: JSON.parse(JSON.stringify(data)),
          enriched_at: new Date().toISOString(),
          enrichment_source: 'bulk-company-research',
          score: data.hiringSignals?.overallScore || 0,
          tags: ['from-bulk-research', data.overview?.industry?.toLowerCase() || 'unknown'],
          source: 'bulk-research-tool',
          notes: `Hiring Score: ${data.hiringSignals?.overallScore || 0}/100. ${data.hiringSignals?.openRoles?.length || 0} open roles.`,
          created_by: user.id,
        };
      });

      const { error } = await supabase.from('prospects').insert(prospects);

      if (error) throw error;

      // Mark all as saved
      setCompanies(prev => prev.map(c => 
        c.status === 'success' && c.data ? { ...c, savedToProspects: true } : c
      ));

      toast.success(`Saved ${prospects.length} companies to prospects`);
    } catch (error) {
      console.error('Error saving prospects:', error);
      toast.error('Failed to save some prospects');
    } finally {
      setIsSavingAll(false);
    }
  };

  const exportResults = () => {
    const successfulCompanies = companies.filter(c => c.status === 'success' && c.data);
    
    if (successfulCompanies.length === 0) {
      toast.error('No results to export');
      return;
    }

    const csvRows = [
      ['Company', 'Domain', 'Industry', 'Employees', 'Location', 'Hiring Score', 'Open Roles', 'Funding Stage', 'Revenue'].join(','),
      ...successfulCompanies.map(c => {
        const d = c.data;
        return [
          `"${d.overview?.name || ''}"`,
          d.overview?.domain || '',
          d.overview?.industry || '',
          d.size?.employeeCount?.range || '',
          `"${d.overview?.headquarters || ''}"`,
          d.hiringSignals?.overallScore || '',
          d.hiringSignals?.openRoles?.length || 0,
          d.size?.fundingStage || '',
          d.size?.revenue || '',
        ].join(',');
      })
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company-research-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Results exported to CSV');
  };

  const clearAll = () => {
    setCompanies([]);
    setProgress(0);
    setIsProcessing(false);
    setIsPaused(false);
  };

  const successCount = companies.filter(c => c.status === 'success').length;
  const errorCount = companies.filter(c => c.status === 'error').length;
  const pendingCount = companies.filter(c => c.status === 'pending').length;
  const savedCount = companies.filter(c => c.savedToProspects).length;

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            Bulk Company Research
          </CardTitle>
          <CardDescription>
            Upload a CSV file with company names or domains to research multiple companies at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
            </Button>
            
            {companies.length > 0 && !isProcessing && (
              <Button onClick={startResearch} className="bg-primary hover:bg-primary/90">
                <Play className="mr-2 h-4 w-4" />
                Start Research ({pendingCount + errorCount} remaining)
              </Button>
            )}
            
            {isProcessing && (
              <Button onClick={pauseResearch} variant="secondary">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            )}
            
            {companies.length > 0 && (
              <Button variant="ghost" onClick={clearAll} disabled={isProcessing}>
                Clear All
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Format: One company per line. Accepts company names, domains (example.com), or LinkedIn URLs.
            Max 100 companies per batch.
          </p>
        </CardContent>
      </Card>

      {/* Progress & Stats */}
      {companies.length > 0 && (
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-foreground">{successCount} Researched</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-foreground">{errorCount} Failed</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{pendingCount} Pending</span>
                </div>
                {savedCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{savedCount} Saved</span>
                  </div>
                )}
              </div>

              {successCount > 0 && (
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={saveAllToProspects} 
                    disabled={isSavingAll || successCount === savedCount}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSavingAll ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save All to Prospects ({successCount - savedCount})
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={exportResults}>
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Table */}
      {companies.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Research Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium text-foreground">Company</th>
                    <th className="text-left p-3 font-medium text-foreground">Status</th>
                    <th className="text-left p-3 font-medium text-foreground">Industry</th>
                    <th className="text-left p-3 font-medium text-foreground">Employees</th>
                    <th className="text-left p-3 font-medium text-foreground">Hiring Score</th>
                    <th className="text-left p-3 font-medium text-foreground">Open Roles</th>
                    <th className="text-left p-3 font-medium text-foreground">Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground font-medium">
                            {company.data?.overview?.name || company.input}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        {company.status === 'pending' && (
                          <Badge variant="outline">Pending</Badge>
                        )}
                        {company.status === 'researching' && (
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Researching
                          </Badge>
                        )}
                        {company.status === 'success' && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        )}
                        {company.status === 'error' && (
                          <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                            <XCircle className="mr-1 h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {company.data?.overview?.industry || '-'}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {company.data?.size?.employeeCount?.range || '-'}
                      </td>
                      <td className="p-3">
                        {company.data?.hiringSignals?.overallScore ? (
                          <span className="font-semibold text-primary">
                            {company.data.hiringSignals.overallScore}/100
                          </span>
                        ) : '-'}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {company.data?.hiringSignals?.openRoles?.length ?? '-'}
                      </td>
                      <td className="p-3">
                        {company.savedToProspects ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {companies.length === 0 && (
        <Card className="border-border bg-card border-dashed">
          <CardContent className="py-16 text-center">
            <FileSpreadsheet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Upload a CSV to Get Started</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Create a CSV file with one company name or domain per line, then upload it to research them all at once.
            </p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkCompanyResearch;
