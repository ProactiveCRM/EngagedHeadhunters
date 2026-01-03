import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  inquiryType?: string;
  source: string;
  firstName?: string;
  lastName?: string;
  companyTitle?: string;
  interest?: string;
  positionDetails?: string;
  timeline?: string;
  tcpaConsent?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ghlApiKey = Deno.env.get('GHL_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!ghlApiKey) {
      console.error('GHL_API_KEY not configured');
      throw new Error('GHL API key not configured');
    }

    const formData: FormData = await req.json();
    console.log('Received form submission:', { ...formData, email: '***' });

    // Validate required fields
    if (!formData.email) {
      throw new Error('Email is required');
    }

    // Build contact name
    let contactName = formData.name;
    if (formData.firstName && formData.lastName) {
      contactName = `${formData.firstName} ${formData.lastName}`;
    }

    if (!contactName) {
      throw new Error('Name is required');
    }

    // Build tags based on source and inquiry type
    const tags: string[] = ['website-lead'];
    if (formData.source) {
      tags.push(`source:${formData.source}`);
    }
    if (formData.inquiryType) {
      tags.push(`inquiry:${formData.inquiryType}`);
      // Add special tag for alliance applications
      if (formData.inquiryType === 'alliance-application') {
        tags.push('alliance-application');
        tags.push('founding-member-prospect');
      }
    }
    if (formData.interest) {
      tags.push(`interest:${formData.interest.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    }

    // Build custom fields/notes
    const notes: string[] = [];
    if (formData.message) {
      notes.push(`Message: ${formData.message}`);
    }
    if (formData.positionDetails) {
      notes.push(`Details: ${formData.positionDetails}`);
    }
    if (formData.timeline) {
      notes.push(`Timeline/Source: ${formData.timeline}`);
    }
    if (formData.companyTitle) {
      notes.push(`Company & Title: ${formData.companyTitle}`);
    }
    if (formData.tcpaConsent) {
      notes.push(`TCPA Consent: Yes - ${new Date().toISOString()}`);
    }

    // Create/update contact in GHL
    const ghlPayload = {
      firstName: formData.firstName || contactName.split(' ')[0],
      lastName: formData.lastName || contactName.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      phone: formData.phone || '',
      companyName: formData.company || formData.companyTitle?.split(',')[0]?.trim() || '',
      tags: tags,
      source: formData.inquiryType === 'alliance-application' 
        ? 'Alliance Application Form' 
        : 'Website Contact Form',
      customFields: [],
    };

    console.log('Creating GHL contact:', { ...ghlPayload, email: '***' });

    // GHL API call to create/update contact
    const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlPayload),
    });

    const ghlResult = await ghlResponse.json();
    console.log('GHL API response status:', ghlResponse.status);

    if (!ghlResponse.ok) {
      console.error('GHL API error:', ghlResult);
      throw new Error(`GHL API error: ${ghlResult.message || 'Unknown error'}`);
    }

    // Add notes if we have any
    if (notes.length > 0 && ghlResult.contact?.id) {
      const notePayload = {
        body: notes.join('\n\n'),
        userId: ghlResult.contact.id,
      };

      await fetch(`https://rest.gohighlevel.com/v1/contacts/${ghlResult.contact.id}/notes/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notePayload),
      });
    }

    console.log('Contact created successfully in GHL:', ghlResult.contact?.id);

    // Store submission locally in Supabase for analytics (only for non-alliance submissions)
    // Alliance applications are stored separately in alliance_applications table
    if (supabaseUrl && supabaseServiceKey && formData.inquiryType !== 'alliance-application') {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        const { error: dbError } = await supabase
          .from('contact_submissions')
          .insert({
            name: contactName,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || formData.companyTitle?.split(',')[0]?.trim() || null,
            message: formData.message || notes.join('\n\n') || 'No message provided',
            source_page: formData.source || null,
            inquiry_type: formData.inquiryType || formData.interest || null,
            utm_source: formData.utm_source || null,
            utm_medium: formData.utm_medium || null,
            utm_campaign: formData.utm_campaign || null,
            tcpa_consent: formData.tcpaConsent || false,
            tcpa_timestamp: formData.tcpaConsent ? new Date().toISOString() : null,
            status: 'new',
          });

        if (dbError) {
          console.error('Error storing submission locally:', dbError);
        } else {
          console.log('Submission stored locally for analytics');
        }
      } catch (dbErr) {
        console.error('Database error:', dbErr);
        // Don't fail the request if local storage fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact submitted successfully',
        contactId: ghlResult.contact?.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in ghl-submit function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An error occurred' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
