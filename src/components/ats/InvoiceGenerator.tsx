import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Download, 
  Loader2, 
  Building2, 
  User, 
  Mail, 
  Calendar,
  DollarSign,
  Percent
} from 'lucide-react';
import type { Placement } from '@/lib/ats/types';
import { format, addDays } from 'date-fns';

interface InvoiceGeneratorProps {
  placement: Placement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InvoiceFormData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billToCompany: string;
  billToContact: string;
  billToEmail: string;
  billToAddress: string;
  paymentTerms: string;
  notes: string;
}

const PAYMENT_TERMS = [
  { value: 'net15', label: 'Net 15', days: 15 },
  { value: 'net30', label: 'Net 30', days: 30 },
  { value: 'net45', label: 'Net 45', days: 45 },
  { value: 'net60', label: 'Net 60', days: 60 },
  { value: 'due_on_receipt', label: 'Due on Receipt', days: 0 },
];

function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${year}-${random}`;
}

export function InvoiceGenerator({ placement, open, onOpenChange }: InvoiceGeneratorProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNumber: '',
    invoiceDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
    billToCompany: '',
    billToContact: '',
    billToEmail: '',
    billToAddress: '',
    paymentTerms: 'net30',
    notes: '',
  });

  // Initialize form when placement changes
  useEffect(() => {
    if (placement && open) {
      setFormData(prev => ({
        ...prev,
        invoiceNumber: generateInvoiceNumber(),
        billToCompany: placement.client_company,
        invoiceDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      }));
    }
  }, [placement, open]);

  const handlePaymentTermsChange = (value: string) => {
    const term = PAYMENT_TERMS.find(t => t.value === value);
    if (term) {
      const invoiceDate = new Date(formData.invoiceDate);
      const dueDate = addDays(invoiceDate, term.days);
      setFormData(prev => ({
        ...prev,
        paymentTerms: value,
        dueDate: format(dueDate, 'yyyy-MM-dd'),
      }));
    }
  };

  const handleInvoiceDateChange = (date: string) => {
    const term = PAYMENT_TERMS.find(t => t.value === formData.paymentTerms);
    const dueDate = term ? addDays(new Date(date), term.days) : new Date(date);
    setFormData(prev => ({
      ...prev,
      invoiceDate: date,
      dueDate: format(dueDate, 'yyyy-MM-dd'),
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleGenerateInvoice = async () => {
    setIsGenerating(true);
    
    try {
      const invoiceData = {
        invoiceNumber: formData.invoiceNumber,
        invoiceDate: formData.invoiceDate,
        dueDate: formData.dueDate,
        paymentTerms: PAYMENT_TERMS.find(t => t.value === formData.paymentTerms)?.label || 'Net 30',
        notes: formData.notes,
        placement: {
          id: placement.id,
          candidateName: placement.candidate_name,
          jobTitle: placement.job_title,
          clientCompany: placement.client_company,
          startDate: placement.start_date,
          salary: Number(placement.salary) || 0,
          feeType: placement.fee_type,
          feePercentage: Number(placement.fee_percentage) || 0,
          feeFlat: Number(placement.fee_flat) || 0,
          feeTotal: Number(placement.fee_total) || 0,
        },
        billTo: {
          company: formData.billToCompany,
          contactName: formData.billToContact,
          email: formData.billToEmail,
          address: formData.billToAddress,
        },
        from: {
          company: 'Engaged Headhunters',
          address: 'Houston, TX',
          phone: '(713) 505-6060',
          email: 'billing@engagedheadhunters.com',
        },
      };

      const { data, error } = await supabase.functions.invoke('generate-invoice', {
        body: invoiceData,
      });

      if (error) throw error;

      // Download the PDF
      if (data?.pdf) {
        const byteCharacters = atob(data.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${formData.invoiceNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({ title: 'Invoice generated successfully!' });
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error('Invoice generation error:', error);
      toast({
        title: 'Failed to generate invoice',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const feeTotal = Number(placement.fee_total) || 0;
  const salary = Number(placement.salary) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select value={formData.paymentTerms} onValueChange={handlePaymentTermsChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_TERMS.map(term => (
                    <SelectItem key={term.value} value={term.value}>
                      {term.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => handleInvoiceDateChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>

          <Separator />

          {/* Bill To */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Bill To
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billToCompany">Company Name *</Label>
                <Input
                  id="billToCompany"
                  value={formData.billToCompany}
                  onChange={(e) => setFormData(prev => ({ ...prev, billToCompany: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billToContact">Contact Name</Label>
                <Input
                  id="billToContact"
                  value={formData.billToContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, billToContact: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billToEmail">Email</Label>
                <Input
                  id="billToEmail"
                  type="email"
                  value={formData.billToEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, billToEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billToAddress">Address</Label>
                <Input
                  id="billToAddress"
                  value={formData.billToAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, billToAddress: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Placement Details - Read Only Preview */}
          <Card className="bg-muted/50">
            <CardContent className="pt-4">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Placement Details
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Candidate:</span>
                  <span className="font-medium">{placement.candidate_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-medium">{placement.job_title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">
                    {placement.start_date 
                      ? format(new Date(placement.start_date), 'MMM d, yyyy')
                      : 'Not set'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Salary:</span>
                  <span className="font-medium">{formatCurrency(salary)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Fee ({placement.fee_type === 'percentage' 
                      ? `${placement.fee_percentage}% of salary`
                      : 'Flat fee'
                    }):
                  </span>
                  <span className="font-medium">{formatCurrency(feeTotal)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-base">
                  <span className="font-medium">Total Due:</span>
                  <span className="font-bold text-primary">{formatCurrency(feeTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional notes or payment instructions..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerateInvoice} disabled={isGenerating || !formData.billToCompany}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
