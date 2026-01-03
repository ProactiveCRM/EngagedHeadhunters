import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  notes?: string;
  placement: {
    id: string;
    candidateName: string;
    jobTitle: string;
    clientCompany: string;
    startDate?: string;
    salary: number;
    feeType: string;
    feePercentage: number;
    feeFlat: number;
    feeTotal: number;
  };
  billTo: {
    company: string;
    contactName?: string;
    email?: string;
    address?: string;
  };
  from: {
    company: string;
    address: string;
    phone: string;
    email: string;
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Generate a simple PDF using raw PDF syntax
// This creates a valid PDF without external libraries
function generatePDF(data: InvoiceData): Uint8Array {
  const lineHeight = 14;
  const margin = 50;
  const pageWidth = 612; // Letter size
  const pageHeight = 792;
  
  let y = pageHeight - margin;
  
  // PDF content stream commands
  const lines: string[] = [];
  
  // Helper to add text
  const addText = (text: string, x: number, fontSize: number = 10, bold: boolean = false) => {
    lines.push(`BT`);
    lines.push(`/${bold ? 'F2' : 'F1'} ${fontSize} Tf`);
    lines.push(`${x} ${y} Td`);
    lines.push(`(${text.replace(/[()\\]/g, '\\$&')}) Tj`);
    lines.push(`ET`);
  };
  
  const addLine = (x1: number, y1: number, x2: number, y2: number) => {
    lines.push(`${x1} ${y1} m`);
    lines.push(`${x2} ${y2} l`);
    lines.push(`S`);
  };
  
  const newLine = (spacing: number = lineHeight) => {
    y -= spacing;
  };

  // Header - Company Info
  addText(data.from.company, margin, 18, true);
  newLine(16);
  addText(data.from.address, margin, 10);
  newLine();
  addText(data.from.phone, margin, 10);
  newLine();
  addText(data.from.email, margin, 10);
  
  // Invoice Title
  y = pageHeight - margin;
  addText('INVOICE', pageWidth - margin - 100, 24, true);
  newLine(20);
  addText(`#${data.invoiceNumber}`, pageWidth - margin - 100, 12);
  
  // Dates
  y = pageHeight - margin - 80;
  addText(`Invoice Date: ${formatDate(data.invoiceDate)}`, pageWidth - margin - 150, 10);
  newLine();
  addText(`Due Date: ${formatDate(data.dueDate)}`, pageWidth - margin - 150, 10);
  newLine();
  addText(`Terms: ${data.paymentTerms}`, pageWidth - margin - 150, 10);
  
  // Separator line
  y = pageHeight - margin - 120;
  addLine(margin, y, pageWidth - margin, y);
  
  // Bill To Section
  y -= 30;
  addText('BILL TO:', margin, 10, true);
  newLine(16);
  addText(data.billTo.company, margin, 12, true);
  if (data.billTo.contactName) {
    newLine();
    addText(`Attn: ${data.billTo.contactName}`, margin, 10);
  }
  if (data.billTo.email) {
    newLine();
    addText(data.billTo.email, margin, 10);
  }
  if (data.billTo.address) {
    newLine();
    addText(data.billTo.address, margin, 10);
  }
  
  // Placement Details Header
  y -= 40;
  addLine(margin, y, pageWidth - margin, y);
  y -= 20;
  addText('PLACEMENT DETAILS', margin, 12, true);
  
  // Placement Info
  newLine(20);
  addText(`Candidate: ${data.placement.candidateName}`, margin, 10);
  newLine();
  addText(`Position: ${data.placement.jobTitle}`, margin, 10);
  newLine();
  addText(`Client: ${data.placement.clientCompany}`, margin, 10);
  if (data.placement.startDate) {
    newLine();
    addText(`Start Date: ${formatDate(data.placement.startDate)}`, margin, 10);
  }
  newLine();
  addText(`Base Salary: ${formatCurrency(data.placement.salary)}`, margin, 10);
  
  // Fee Calculation Section
  y -= 30;
  addLine(margin, y, pageWidth - margin, y);
  y -= 20;
  addText('FEE CALCULATION', margin, 12, true);
  
  newLine(20);
  const feeDescription = data.placement.feeType === 'percentage'
    ? `Placement Fee (${data.placement.feePercentage}% of base salary)`
    : 'Placement Fee (Flat)';
  addText(feeDescription, margin, 10);
  addText(formatCurrency(data.placement.feeTotal), pageWidth - margin - 80, 10);
  
  // Total
  y -= 30;
  addLine(margin, y, pageWidth - margin, y);
  y -= 20;
  addText('TOTAL DUE:', margin, 14, true);
  addText(formatCurrency(data.placement.feeTotal), pageWidth - margin - 80, 14, true);
  
  // Notes
  if (data.notes) {
    y -= 40;
    addText('Notes:', margin, 10, true);
    newLine();
    addText(data.notes, margin, 10);
  }
  
  // Payment Instructions
  y = 100;
  addLine(margin, y + 20, pageWidth - margin, y + 20);
  addText('Payment Terms: ' + data.paymentTerms, margin, 10);
  newLine();
  addText('Please remit payment to Engaged Headhunters', margin, 10);
  newLine();
  addText('Thank you for your business!', margin, 10, true);

  // Build PDF structure
  const contentStream = lines.join('\n');
  
  const objects: string[] = [];
  let objNum = 1;
  
  // Object 1: Catalog
  objects.push(`${objNum} 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);
  objNum++;
  
  // Object 2: Pages
  objects.push(`${objNum} 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`);
  objNum++;
  
  // Object 3: Page
  objects.push(`${objNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj`);
  objNum++;
  
  // Object 4: Content stream
  objects.push(`${objNum} 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj`);
  objNum++;
  
  // Object 5: Font (Helvetica)
  objects.push(`${objNum} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`);
  objNum++;
  
  // Object 6: Font (Helvetica-Bold)
  objects.push(`${objNum} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`);
  objNum++;
  
  // Build PDF
  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj + '\n';
  }
  
  // Cross-reference table
  const xrefStart = pdf.length;
  pdf += 'xref\n';
  pdf += `0 ${objNum}\n`;
  pdf += '0000000000 65535 f \n';
  for (const offset of offsets) {
    pdf += offset.toString().padStart(10, '0') + ' 00000 n \n';
  }
  
  // Trailer
  pdf += 'trailer\n';
  pdf += `<< /Size ${objNum} /Root 1 0 R >>\n`;
  pdf += 'startxref\n';
  pdf += `${xrefStart}\n`;
  pdf += '%%EOF';
  
  return new TextEncoder().encode(pdf);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const invoiceData: InvoiceData = await req.json();
    
    console.log('Generating invoice:', invoiceData.invoiceNumber);
    
    // Validate required fields
    if (!invoiceData.placement || !invoiceData.billTo?.company) {
      return new Response(
        JSON.stringify({ error: 'Missing required invoice data' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Generate PDF
    const pdfBytes = generatePDF(invoiceData);
    
    // Convert to base64 for response
    const base64Pdf = btoa(String.fromCharCode(...pdfBytes));
    
    console.log('Invoice generated successfully:', invoiceData.invoiceNumber);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        pdf: base64Pdf,
        invoiceNumber: invoiceData.invoiceNumber 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Invoice generation error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate invoice' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
