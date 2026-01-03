import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsletterRequest {
  email: string;
  source_page?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source_page }: NewsletterRequest = await req.json();
    
    console.log('Newsletter subscription request:', { email, source_page });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id, is_active')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (existing) {
      if (existing.is_active) {
        return new Response(
          JSON.stringify({ message: 'Already subscribed', already_subscribed: true }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Reactivate subscription
        await supabase
          .from('subscribers')
          .update({ is_active: true, unsubscribed_at: null })
          .eq('id', existing.id);
        
        console.log('Reactivated subscriber:', email);
      }
    }

    // Submit to GHL
    const ghlApiKey = Deno.env.get('GHL_API_KEY');
    let ghlContactId: string | null = null;

    if (ghlApiKey) {
      try {
        const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ghlApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            source: 'Newsletter Subscription',
            tags: ['newsletter-subscriber'],
            customField: {
              source_page: source_page || 'blog'
            }
          }),
        });

        if (ghlResponse.ok) {
          const ghlData = await ghlResponse.json();
          ghlContactId = ghlData.contact?.id || null;
          console.log('GHL contact created/updated:', ghlContactId);
        } else {
          console.error('GHL API error:', await ghlResponse.text());
        }
      } catch (ghlError) {
        console.error('GHL integration error:', ghlError);
        // Continue even if GHL fails - still save to database
      }
    }

    // Insert new subscriber (if not reactivating)
    if (!existing) {
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert({
          email: email.toLowerCase(),
          source_page: source_page || 'blog',
          ghl_contact_id: ghlContactId,
        });

      if (insertError) {
        console.error('Database insert error:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to save subscription' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('Newsletter subscription successful:', email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
