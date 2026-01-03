-- Create candidates table for ATS integration
CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ats_id TEXT,
  ats_platform TEXT DEFAULT 'gohire',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  current_title TEXT,
  current_company TEXT,
  location TEXT,
  skills TEXT[] DEFAULT '{}',
  experience_years INTEGER,
  salary_expectation TEXT,
  availability TEXT,
  source TEXT,
  source_detail TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  custom_fields JSONB DEFAULT '{}',
  last_synced_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create job_orders table
CREATE TABLE public.job_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ats_id TEXT,
  ats_platform TEXT DEFAULT 'gohire',
  client_company TEXT NOT NULL,
  client_contact_name TEXT,
  client_contact_email TEXT,
  job_title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  employment_type TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_type TEXT DEFAULT 'annual',
  fee_type TEXT,
  fee_amount DECIMAL,
  description TEXT,
  requirements TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal',
  target_start_date DATE,
  assigned_agent UUID REFERENCES auth.users(id),
  candidates_submitted INTEGER DEFAULT 0,
  interviews_scheduled INTEGER DEFAULT 0,
  last_synced_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create placements table
CREATE TABLE public.placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ats_id TEXT,
  ats_platform TEXT DEFAULT 'gohire',
  candidate_id UUID REFERENCES public.candidates(id),
  job_order_id UUID REFERENCES public.job_orders(id),
  client_company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  candidate_name TEXT NOT NULL,
  start_date DATE,
  salary DECIMAL,
  fee_type TEXT,
  fee_percentage DECIMAL,
  fee_flat DECIMAL,
  fee_total DECIMAL,
  fee_status TEXT DEFAULT 'pending',
  fee_paid_date DATE,
  placement_type TEXT,
  contract_end_date DATE,
  guarantee_period_days INTEGER DEFAULT 90,
  guarantee_expires DATE,
  notes TEXT,
  agent_id UUID REFERENCES auth.users(id),
  commission_split JSONB,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create candidate_submissions junction table
CREATE TABLE public.candidate_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  job_order_id UUID REFERENCES public.job_orders(id) ON DELETE CASCADE,
  stage TEXT DEFAULT 'submitted',
  submitted_at TIMESTAMPTZ DEFAULT now(),
  submitted_by UUID REFERENCES auth.users(id),
  client_feedback TEXT,
  internal_notes TEXT,
  rejection_reason TEXT,
  interview_dates JSONB,
  offer_details JSONB,
  ats_application_id TEXT,
  last_synced_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(candidate_id, job_order_id)
);

-- Enable RLS on all tables
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_submissions ENABLE ROW LEVEL SECURITY;

-- Candidates policies
CREATE POLICY "Admins can manage all candidates" ON public.candidates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Agents can manage all candidates" ON public.candidates
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

CREATE POLICY "Users can manage their own candidates" ON public.candidates
  FOR ALL USING (auth.uid() = created_by);

-- Job orders policies
CREATE POLICY "Admins can manage all job orders" ON public.job_orders
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Agents can manage all job orders" ON public.job_orders
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

CREATE POLICY "Users can view assigned job orders" ON public.job_orders
  FOR SELECT USING (auth.uid() = assigned_agent OR auth.uid() = created_by);

-- Placements policies
CREATE POLICY "Admins can manage all placements" ON public.placements
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Agents can manage all placements" ON public.placements
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

CREATE POLICY "Users can view their placements" ON public.placements
  FOR SELECT USING (auth.uid() = agent_id);

-- Candidate submissions policies
CREATE POLICY "Admins can manage all submissions" ON public.candidate_submissions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Agents can manage all submissions" ON public.candidate_submissions
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

CREATE POLICY "Users can manage their submissions" ON public.candidate_submissions
  FOR ALL USING (auth.uid() = submitted_by);

-- Create updated_at triggers
CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_job_orders_updated_at
  BEFORE UPDATE ON public.job_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_placements_updated_at
  BEFORE UPDATE ON public.placements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_candidate_submissions_updated_at
  BEFORE UPDATE ON public.candidate_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for common queries
CREATE INDEX idx_candidates_status ON public.candidates(status);
CREATE INDEX idx_candidates_ats_id ON public.candidates(ats_id);
CREATE INDEX idx_candidates_created_by ON public.candidates(created_by);
CREATE INDEX idx_job_orders_status ON public.job_orders(status);
CREATE INDEX idx_job_orders_assigned_agent ON public.job_orders(assigned_agent);
CREATE INDEX idx_placements_agent_id ON public.placements(agent_id);
CREATE INDEX idx_placements_fee_status ON public.placements(fee_status);
CREATE INDEX idx_candidate_submissions_stage ON public.candidate_submissions(stage);