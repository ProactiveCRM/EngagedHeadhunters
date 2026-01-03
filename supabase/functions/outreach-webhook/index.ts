import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      prospectId, 
      webhookUrl, 
      platform, 
      campaignId,
      sequenceId,
      customData 
    } = await req.json();
    
    console.log(`Outreach webhook request - Platform: ${platform}, Prospect: ${prospectId}`);

    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ error: 'Webhook URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Fetch prospect data if ID provided
    let prospectData = customData || {};
    if (prospectId) {
      const { data: prospect, error } = await supabase
        .from('prospects')
        .select('*')
        .eq('id', prospectId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching prospect:', error);
      } else if (prospect) {
        prospectData = {
          ...prospectData,
          email: prospect.contact_email,
          firstName: prospect.contact_name?.split(' ')[0],
          lastName: prospect.contact_name?.split(' ').slice(1).join(' '),
          fullName: prospect.contact_name,
          title: prospect.contact_title,
          company: prospect.company_name,
          companyDomain: prospect.company_domain,
          linkedinUrl: prospect.contact_linkedin || prospect.company_linkedin,
          phone: prospect.contact_phone,
          industry: prospect.company_industry,
          location: prospect.company_location,
          tags: prospect.tags,
          notes: prospect.notes,
          enrichmentData: prospect.enrichment_data,
        };
      }
    }

    // Build webhook payload based on platform
    let webhookPayload: Record<string, any> = {};

    switch (platform) {
      case 'smartlead':
        webhookPayload = buildSmartLeadPayload(prospectData, campaignId);
        break;
      case 'salesrobot':
        webhookPayload = buildSalesRobotPayload(prospectData, sequenceId);
        break;
      case 'instantly':
        webhookPayload = buildInstantlyPayload(prospectData, campaignId);
        break;
      case 'lemlist':
        webhookPayload = buildLemlistPayload(prospectData, campaignId);
        break;
      case 'zapier':
      case 'make':
      case 'n8n':
      default:
        // Generic webhook payload for automation platforms
        webhookPayload = {
          timestamp: new Date().toISOString(),
          source: 'engaged-headhunters',
          platform,
          campaignId,
          sequenceId,
          prospect: prospectData,
        };
    }

    console.log(`Sending webhook to ${platform}:`, webhookPayload);

    // Send webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    const responseStatus = webhookResponse.status;
    const responseOk = webhookResponse.ok;

    console.log(`Webhook response: ${responseStatus} - OK: ${responseOk}`);

    // Update prospect outreach status if ID provided
    if (prospectId) {
      await supabase
        .from('prospects')
        .update({
          outreach_campaign: campaignId || sequenceId || platform,
          outreach_status: responseOk ? 'sent' : 'failed',
          last_outreach_at: new Date().toISOString(),
          status: 'outreach',
          updated_at: new Date().toISOString(),
        })
        .eq('id', prospectId);
    }

    return new Response(
      JSON.stringify({ 
        success: responseOk,
        status: responseStatus,
        platform,
        prospectId,
        message: responseOk ? 'Webhook sent successfully' : 'Webhook failed',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in outreach-webhook function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function buildSmartLeadPayload(prospect: Record<string, any>, campaignId?: string) {
  return {
    api_key: '{{SMARTLEAD_API_KEY}}', // User should replace in their automation
    campaign_id: campaignId,
    lead: {
      email: prospect.email,
      first_name: prospect.firstName,
      last_name: prospect.lastName,
      company: prospect.company,
      phone: prospect.phone,
      linkedin: prospect.linkedinUrl,
      custom_fields: {
        title: prospect.title,
        industry: prospect.industry,
        location: prospect.location,
      }
    }
  };
}

function buildSalesRobotPayload(prospect: Record<string, any>, sequenceId?: string) {
  return {
    sequence_id: sequenceId,
    prospect: {
      linkedin_url: prospect.linkedinUrl,
      email: prospect.email,
      first_name: prospect.firstName,
      last_name: prospect.lastName,
      company: prospect.company,
      title: prospect.title,
      notes: prospect.notes,
    },
    tags: prospect.tags,
  };
}

function buildInstantlyPayload(prospect: Record<string, any>, campaignId?: string) {
  return {
    campaign_id: campaignId,
    leads: [{
      email: prospect.email,
      first_name: prospect.firstName,
      last_name: prospect.lastName,
      company_name: prospect.company,
      personalization: prospect.notes,
      custom_variables: {
        title: prospect.title,
        linkedin: prospect.linkedinUrl,
      }
    }]
  };
}

function buildLemlistPayload(prospect: Record<string, any>, campaignId?: string) {
  return {
    campaignId,
    lead: {
      email: prospect.email,
      firstName: prospect.firstName,
      lastName: prospect.lastName,
      companyName: prospect.company,
      linkedinUrl: prospect.linkedinUrl,
      phone: prospect.phone,
    }
  };
}
