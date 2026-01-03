-- Create alliance_applications table for tracking recruiter applications to the Alliance program
CREATE TABLE public.alliance_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  years_experience INTEGER NOT NULL,
  specialty_niche TEXT NOT NULL,
  current_placements_year TEXT NOT NULL,
  why_join TEXT NOT NULL,
  how_heard TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  honeypot TEXT,
  tcpa_consent BOOLEAN NOT NULL DEFAULT false,
  tcpa_timestamp TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.alliance_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an application (with validation)
CREATE POLICY "Anyone can submit alliance application"
ON public.alliance_applications
FOR INSERT
WITH CHECK (
  ((honeypot IS NULL) OR (honeypot = '')) 
  AND (tcpa_consent = true)
);

-- Policy: Only admins can view applications
CREATE POLICY "Admins can view alliance applications"
ON public.alliance_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can update applications
CREATE POLICY "Admins can update alliance applications"
ON public.alliance_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_alliance_applications_updated_at
BEFORE UPDATE ON public.alliance_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();