-- Create prospects table for the prospecting pipeline
CREATE TABLE public.prospects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Prospect type
  prospect_type TEXT NOT NULL DEFAULT 'company' CHECK (prospect_type IN ('company', 'person', 'lead')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'enriching', 'enriched', 'outreach', 'engaged', 'converted', 'archived')),
  
  -- Company data
  company_name TEXT,
  company_domain TEXT,
  company_industry TEXT,
  company_size TEXT,
  company_location TEXT,
  company_linkedin TEXT,
  company_website TEXT,
  
  -- Contact/Person data
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_title TEXT,
  contact_linkedin TEXT,
  
  -- Enrichment data (JSON for flexibility)
  enrichment_data JSONB DEFAULT '{}',
  enriched_at TIMESTAMP WITH TIME ZONE,
  enrichment_source TEXT,
  
  -- Outreach tracking
  outreach_campaign TEXT,
  outreach_status TEXT,
  last_outreach_at TIMESTAMP WITH TIME ZONE,
  
  -- Scoring
  score INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  
  -- Source tracking
  source TEXT,
  source_url TEXT
);

-- Enable RLS
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

-- Admins and agents can view all prospects
CREATE POLICY "Admins can manage all prospects" ON public.prospects
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Agents can view and manage prospects" ON public.prospects
FOR ALL USING (has_role(auth.uid(), 'agent'::app_role));

-- Users can view their own prospects
CREATE POLICY "Users can manage their own prospects" ON public.prospects
FOR ALL USING (auth.uid() = created_by);

-- Create index for fast lookups
CREATE INDEX idx_prospects_status ON public.prospects(status);
CREATE INDEX idx_prospects_type ON public.prospects(prospect_type);
CREATE INDEX idx_prospects_created_by ON public.prospects(created_by);

-- Add trigger for updated_at
CREATE TRIGGER update_prospects_updated_at
  BEFORE UPDATE ON public.prospects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();