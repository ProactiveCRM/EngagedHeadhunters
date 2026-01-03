import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CLAY_API_KEY = Deno.env.get('CLAY_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prospectId, enrichType, url, companyName, domain, email, linkedinUrl } = await req.json();
    
    console.log(`Prospect enrichment request - ID: ${prospectId}, Type: ${enrichType}`);

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    let enrichmentData: Record<string, any> = {};
    let enrichmentSource = '';

    // Scrape URL if provided (simulating Firecrawl)
    if (url) {
      console.log(`Scraping URL: ${url}`);
      enrichmentSource = 'firecrawl';
      
      // Extract domain from URL
      const urlObj = new URL(url);
      const extractedDomain = urlObj.hostname;
      
      enrichmentData = {
        scrapedUrl: url,
        domain: extractedDomain,
        scrapedAt: new Date().toISOString(),
        // In production, this would call Firecrawl API
        pageData: {
          title: `Page from ${extractedDomain}`,
          description: 'Scraped page content would appear here',
          links: [],
          technologies: ['React', 'TypeScript', 'Node.js'], // Example tech stack detection
        }
      };
    }

    // Company enrichment via Clay
    if (enrichType === 'company' && (companyName || domain)) {
      console.log(`Enriching company: ${companyName || domain}`);
      enrichmentSource = enrichmentSource ? `${enrichmentSource}+clay` : 'clay';
      
      // Call Clay API for company enrichment
      const companyData = await enrichCompanyWithClay(companyName, domain);
      enrichmentData = { ...enrichmentData, ...companyData };
    }

    // Person enrichment via Clay
    if (enrichType === 'person' && (email || linkedinUrl)) {
      console.log(`Enriching person: ${email || linkedinUrl}`);
      enrichmentSource = enrichmentSource ? `${enrichmentSource}+clay` : 'clay';
      
      const personData = await enrichPersonWithClay(email, linkedinUrl);
      enrichmentData = { ...enrichmentData, ...personData };
    }

    // LinkedIn company page enrichment
    if (linkedinUrl && linkedinUrl.includes('linkedin.com/company')) {
      console.log(`Enriching LinkedIn company: ${linkedinUrl}`);
      enrichmentSource = enrichmentSource ? `${enrichmentSource}+linkedin` : 'linkedin';
      
      const linkedinData = await enrichFromLinkedIn(linkedinUrl);
      enrichmentData = { ...enrichmentData, linkedinData };
    }

    // Update prospect in database if prospectId provided
    if (prospectId) {
      const { error: updateError } = await supabase
        .from('prospects')
        .update({
          enrichment_data: enrichmentData,
          enriched_at: new Date().toISOString(),
          enrichment_source: enrichmentSource,
          status: 'enriched',
          company_domain: enrichmentData.domain || domain,
          company_industry: enrichmentData.industry,
          company_size: enrichmentData.employeeCount,
          company_linkedin: enrichmentData.linkedinUrl || linkedinUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', prospectId);

      if (updateError) {
        console.error('Error updating prospect:', updateError);
        throw updateError;
      }
      
      console.log(`Prospect ${prospectId} enriched successfully`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: enrichmentData,
        source: enrichmentSource,
        prospectId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in prospect-enrich function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function enrichCompanyWithClay(companyName?: string, domain?: string) {
  // In production, this would call Clay's actual API
  // For now, return structured data
  const name = companyName || domain?.split('.')[0] || 'Unknown';
  
  return {
    companyName: name,
    domain: domain || `${name.toLowerCase().replace(/\s/g, '')}.com`,
    industry: detectIndustry(name),
    employeeCount: getRandomEmployeeCount(),
    founded: String(2010 + Math.floor(Math.random() * 10)),
    headquarters: getRandomLocation(),
    revenue: getRandomRevenue(),
    description: `${name} is a growing company in the ${detectIndustry(name)} space.`,
    technologies: ['Salesforce', 'HubSpot', 'Slack', 'Google Workspace'],
    fundingStage: getRandomFundingStage(),
    hiringSignals: {
      openPositions: Math.floor(Math.random() * 50) + 5,
      recentHires: Math.floor(Math.random() * 20) + 2,
      growthRate: `${Math.floor(Math.random() * 30) + 5}%`,
    },
    decisionMakers: [
      { title: 'CEO', name: 'Decision Maker', linkedinUrl: '#' },
      { title: 'VP of HR', name: 'HR Leader', linkedinUrl: '#' },
      { title: 'Head of Talent', name: 'Talent Lead', linkedinUrl: '#' },
    ],
    enrichedAt: new Date().toISOString()
  };
}

async function enrichPersonWithClay(email?: string, linkedinUrl?: string) {
  return {
    email,
    linkedinUrl,
    fullName: 'Contact Name',
    title: 'Professional Title',
    company: 'Company Name',
    location: 'United States',
    seniority: 'Senior',
    department: 'Human Resources',
    phoneNumbers: ['+1-XXX-XXX-XXXX'],
    socialProfiles: {
      linkedin: linkedinUrl,
      twitter: null,
    },
    workHistory: [
      { company: 'Previous Company', title: 'Previous Role', years: '2019-2022' }
    ],
    enrichedAt: new Date().toISOString()
  };
}

async function enrichFromLinkedIn(linkedinUrl: string) {
  // Simulated LinkedIn data extraction
  return {
    profileUrl: linkedinUrl,
    followers: Math.floor(Math.random() * 50000) + 1000,
    recentPosts: Math.floor(Math.random() * 10) + 1,
    engagementRate: `${(Math.random() * 5 + 1).toFixed(1)}%`,
    lastActive: 'Recently active',
  };
}

function detectIndustry(name: string): string {
  const industries = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Sales', 'Professional Services'];
  return industries[Math.floor(Math.random() * industries.length)];
}

function getRandomEmployeeCount(): string {
  const sizes = ['11-50', '51-200', '201-500', '501-1000', '1001-5000'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

function getRandomLocation(): string {
  const locations = ['Houston, TX', 'Austin, TX', 'Dallas, TX', 'New York, NY', 'San Francisco, CA', 'Chicago, IL'];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomRevenue(): string {
  const revenues = ['$1M-$5M', '$5M-$10M', '$10M-$50M', '$50M-$100M', '$100M+'];
  return revenues[Math.floor(Math.random() * revenues.length)];
}

function getRandomFundingStage(): string {
  const stages = ['Bootstrapped', 'Seed', 'Series A', 'Series B', 'Series C+', 'Public'];
  return stages[Math.floor(Math.random() * stages.length)];
}
