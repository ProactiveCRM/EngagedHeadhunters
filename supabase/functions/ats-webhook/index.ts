import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

interface ATSWebhookPayload {
  event_type: 'candidate_created' | 'candidate_updated' | 'status_changed' | 'interview_scheduled' | 'offer_made' | 'hired' | 'job_created' | 'job_updated';
  platform: 'gohire' | 'recruiterflow';
  data: Record<string, unknown>;
  timestamp?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate webhook secret (optional security)
    const webhookSecret = req.headers.get('x-webhook-secret');
    const expectedSecret = Deno.env.get('ATS_WEBHOOK_SECRET');
    
    if (expectedSecret && webhookSecret !== expectedSecret) {
      console.warn('Invalid webhook secret received');
      return new Response(
        JSON.stringify({ error: 'Invalid webhook secret' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: ATSWebhookPayload = await req.json();
    const { event_type, platform, data } = payload;

    console.log(`ATS Webhook - Event: ${event_type}, Platform: ${platform}`);

    switch (event_type) {
      case 'candidate_created':
      case 'candidate_updated': {
        // Sync candidate from ATS to local database
        const candidateData = {
          ats_id: data.id as string,
          ats_platform: platform,
          first_name: data.first_name as string,
          last_name: data.last_name as string,
          email: data.email as string,
          phone: data.phone as string,
          linkedin_url: data.linkedin_url as string,
          current_title: data.title as string,
          current_company: data.company as string,
          location: data.location as string,
          status: mapATSStatus(data.status as string),
          last_synced_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('candidates')
          .upsert(candidateData, { onConflict: 'ats_id' });

        if (error) {
          console.error('Error syncing candidate:', error);
          throw error;
        }

        console.log(`Candidate ${event_type} synced successfully`);
        break;
      }

      case 'status_changed': {
        // Update candidate status
        const atsId = data.candidate_id as string;
        const newStatus = mapATSStatus(data.new_status as string);

        await supabase
          .from('candidates')
          .update({ 
            status: newStatus,
            last_synced_at: new Date().toISOString()
          })
          .eq('ats_id', atsId);

        // Also update submission stage if applicable
        if (data.job_id) {
          await supabase
            .from('candidate_submissions')
            .update({
              stage: newStatus,
              last_synced_at: new Date().toISOString()
            })
            .eq('ats_application_id', data.application_id as string);
        }

        console.log(`Status changed to ${newStatus} for candidate ${atsId}`);
        break;
      }

      case 'interview_scheduled': {
        // Update submission with interview details
        const { error } = await supabase
          .from('candidate_submissions')
          .update({
            stage: 'interview',
            interview_dates: data.interview_dates,
            last_synced_at: new Date().toISOString()
          })
          .eq('ats_application_id', data.application_id as string);

        if (error) console.error('Error updating interview:', error);
        console.log('Interview scheduled');
        break;
      }

      case 'offer_made': {
        // Update submission with offer details
        await supabase
          .from('candidate_submissions')
          .update({
            stage: 'offer',
            offer_details: data.offer_details,
            last_synced_at: new Date().toISOString()
          })
          .eq('ats_application_id', data.application_id as string);

        console.log('Offer recorded');
        break;
      }

      case 'hired': {
        // Create placement record
        const placementData = {
          ats_id: data.placement_id as string,
          ats_platform: platform,
          candidate_name: `${data.candidate_first_name} ${data.candidate_last_name}`,
          client_company: data.company_name as string,
          job_title: data.job_title as string,
          start_date: data.start_date as string,
          salary: data.salary as number,
          fee_type: data.fee_type as string || 'percentage',
          fee_percentage: data.fee_percentage as number,
          fee_total: data.fee_amount as number,
          fee_status: 'pending',
          placement_type: data.employment_type as string || 'permanent',
          last_synced_at: new Date().toISOString()
        };

        await supabase.from('placements').insert(placementData);

        // Update candidate status
        await supabase
          .from('candidates')
          .update({ status: 'hired' })
          .eq('ats_id', data.candidate_id as string);

        // Update job order status if filled
        if (data.job_filled) {
          await supabase
            .from('job_orders')
            .update({ status: 'filled' })
            .eq('ats_id', data.job_id as string);
        }

        console.log('Placement created from hire event');
        break;
      }

      case 'job_created':
      case 'job_updated': {
        // Sync job from ATS
        const jobData = {
          ats_id: data.id as string,
          ats_platform: platform,
          client_company: data.company_name as string,
          job_title: data.title as string,
          department: data.department as string,
          location: data.location as string,
          employment_type: data.employment_type as string,
          salary_min: data.salary_min as number,
          salary_max: data.salary_max as number,
          description: data.description as string,
          requirements: data.requirements as string,
          status: mapJobStatus(data.status as string),
          last_synced_at: new Date().toISOString()
        };

        await supabase
          .from('job_orders')
          .upsert(jobData, { onConflict: 'ats_id' });

        console.log(`Job ${event_type} synced successfully`);
        break;
      }

      default:
        console.log(`Unknown event type: ${event_type}`);
    }

    return new Response(
      JSON.stringify({ success: true, event_type }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('ATS Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Map ATS-specific statuses to our standard statuses
function mapATSStatus(atsStatus: string): string {
  const statusMap: Record<string, string> = {
    // GoHire statuses
    'new': 'new',
    'applied': 'new',
    'screening': 'screening',
    'phone_screen': 'screening',
    'interview': 'interviewed',
    'interviewing': 'interviewed',
    'offer': 'offered',
    'offer_extended': 'offered',
    'hired': 'hired',
    'rejected': 'rejected',
    'withdrawn': 'rejected',
    // RecruiterFlow statuses (future)
    'lead': 'new',
    'contacted': 'screening',
    'qualified': 'screening',
    'submitted': 'submitted',
    'client_review': 'submitted',
    'placed': 'hired'
  };

  return statusMap[atsStatus?.toLowerCase()] || 'new';
}

function mapJobStatus(atsStatus: string): string {
  const statusMap: Record<string, string> = {
    'open': 'open',
    'active': 'open',
    'on_hold': 'on-hold',
    'paused': 'on-hold',
    'filled': 'filled',
    'closed': 'filled',
    'cancelled': 'cancelled'
  };

  return statusMap[atsStatus?.toLowerCase()] || 'open';
}
