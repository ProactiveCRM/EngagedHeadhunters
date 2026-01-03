import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ATSSyncRequest {
  action: 'sync_candidate' | 'sync_job' | 'create_placement' | 'submit_candidate' | 'get_sync_status';
  platform?: 'gohire' | 'recruiterflow';
  data?: Record<string, unknown>;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, platform, data }: ATSSyncRequest = await req.json();
    const atsPlatform = platform || Deno.env.get('ATS_PLATFORM') || 'gohire';

    console.log(`ATS Sync - Action: ${action}, Platform: ${atsPlatform}`);

    switch (action) {
      case 'sync_candidate': {
        // Sync candidate to external ATS via Zapier webhook
        const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_GOHIRE_CANDIDATE');
        
        if (!webhookUrl) {
          return new Response(
            JSON.stringify({ error: 'Zapier webhook not configured', code: 'WEBHOOK_NOT_CONFIGURED' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Send to Zapier
        const zapierResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_candidate',
            timestamp: new Date().toISOString(),
            source: 'engaged_headhunters',
            ...data
          })
        });

        // Update sync timestamp in database
        if (data?.id) {
          await supabase
            .from('candidates')
            .update({ last_synced_at: new Date().toISOString(), ats_platform: atsPlatform })
            .eq('id', data.id);
        }

        console.log('Candidate synced to ATS via Zapier');
        return new Response(
          JSON.stringify({ success: true, message: 'Candidate synced to ATS' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'sync_job': {
        // Sync job order to external ATS
        const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_GOHIRE_JOB');
        
        if (!webhookUrl) {
          return new Response(
            JSON.stringify({ error: 'Zapier job webhook not configured', code: 'WEBHOOK_NOT_CONFIGURED' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_job',
            timestamp: new Date().toISOString(),
            source: 'engaged_headhunters',
            ...data
          })
        });

        if (data?.id) {
          await supabase
            .from('job_orders')
            .update({ last_synced_at: new Date().toISOString(), ats_platform: atsPlatform })
            .eq('id', data.id);
        }

        console.log('Job order synced to ATS via Zapier');
        return new Response(
          JSON.stringify({ success: true, message: 'Job order synced to ATS' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'submit_candidate': {
        // Submit candidate to a job order
        const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_GOHIRE_SUBMIT');
        
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'submit_candidate',
              timestamp: new Date().toISOString(),
              source: 'engaged_headhunters',
              ...data
            })
          });
        }

        // Create local submission record
        if (data?.candidate_id && data?.job_order_id) {
          const { error } = await supabase
            .from('candidate_submissions')
            .upsert({
              candidate_id: data.candidate_id,
              job_order_id: data.job_order_id,
              submitted_by: data.submitted_by,
              stage: 'submitted',
              last_synced_at: new Date().toISOString()
            });

          if (error) {
            console.error('Error creating submission:', error);
          }

          // Increment candidates_submitted count on job order
          await supabase.rpc('increment_job_submissions', { job_id: data.job_order_id });
        }

        console.log('Candidate submitted to job via ATS');
        return new Response(
          JSON.stringify({ success: true, message: 'Candidate submitted to job' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'create_placement': {
        // Create placement record and sync
        const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_GOHIRE_PLACEMENT');
        
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'create_placement',
              timestamp: new Date().toISOString(),
              source: 'engaged_headhunters',
              ...data
            })
          });
        }

        console.log('Placement synced to ATS');
        return new Response(
          JSON.stringify({ success: true, message: 'Placement created and synced' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'get_sync_status': {
        // Get sync status for all entities
        const { data: candidates } = await supabase
          .from('candidates')
          .select('id, ats_id, last_synced_at')
          .not('ats_id', 'is', null)
          .order('last_synced_at', { ascending: false })
          .limit(10);

        const { data: jobs } = await supabase
          .from('job_orders')
          .select('id, ats_id, last_synced_at')
          .not('ats_id', 'is', null)
          .order('last_synced_at', { ascending: false })
          .limit(10);

        return new Response(
          JSON.stringify({
            platform: atsPlatform,
            last_synced_candidates: candidates,
            last_synced_jobs: jobs
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('ATS Sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
