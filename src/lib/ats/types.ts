// ATS Platform Types and Interfaces

export type ATSPlatform = 'gohire' | 'recruiterflow';

export interface Candidate {
  id: string;
  ats_id?: string;
  ats_platform?: ATSPlatform;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  resume_url?: string;
  current_title?: string;
  current_company?: string;
  location?: string;
  skills?: string[];
  experience_years?: number;
  salary_expectation?: string;
  availability?: string;
  source?: string;
  source_detail?: string;
  status: CandidateStatus;
  notes?: string;
  tags?: string[];
  custom_fields?: Record<string, unknown>;
  last_synced_at?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export type CandidateStatus = 
  | 'new'
  | 'screening'
  | 'interviewed'
  | 'offered'
  | 'hired'
  | 'rejected';

export interface JobOrder {
  required_skills?: string[];
  id: string;
  ats_id?: string;
  ats_platform?: ATSPlatform;
  client_company: string;
  client_contact_name?: string;
  client_contact_email?: string;
  job_title: string;
  department?: string;
  location?: string;
  employment_type?: EmploymentType;
  salary_min?: number;
  salary_max?: number;
  salary_type?: 'annual' | 'hourly' | 'monthly';
  fee_type?: 'percentage' | 'flat';
  fee_amount?: number;
  description?: string;
  requirements?: string;
  status: JobStatus;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  target_start_date?: string;
  assigned_agent?: string;
  candidates_submitted?: number;
  interviews_scheduled?: number;
  last_synced_at?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export type JobStatus = 'open' | 'on-hold' | 'filled' | 'cancelled';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'temp' | 'temp-to-perm';

export interface Placement {
  id: string;
  ats_id?: string;
  ats_platform?: ATSPlatform;
  candidate_id?: string;
  job_order_id?: string;
  client_company: string;
  job_title: string;
  candidate_name: string;
  start_date?: string;
  salary?: number;
  fee_type?: 'percentage' | 'flat';
  fee_percentage?: number;
  fee_flat?: number;
  fee_total?: number;
  fee_status: FeeStatus;
  fee_paid_date?: string;
  placement_type?: PlacementType;
  contract_end_date?: string;
  guarantee_period_days?: number;
  guarantee_expires?: string;
  notes?: string;
  agent_id?: string;
  commission_split?: CommissionSplit[];
  last_synced_at?: string;
  created_at?: string;
  updated_at?: string;
}

export type FeeStatus = 'pending' | 'invoiced' | 'partial' | 'paid';
export type PlacementType = 'permanent' | 'contract' | 'temp';

export interface CommissionSplit {
  agent_id: string;
  agent_name: string;
  percentage: number;
  amount?: number;
}

export interface CandidateSubmission {
  id: string;
  candidate_id: string;
  job_order_id: string;
  stage: SubmissionStage;
  submitted_at?: string;
  submitted_by?: string;
  client_feedback?: string;
  internal_notes?: string;
  rejection_reason?: string;
  interview_dates?: InterviewDate[];
  offer_details?: OfferDetails;
  ats_application_id?: string;
  last_synced_at?: string;
  updated_at?: string;
  // Joined data
  candidate?: Candidate;
  job_order?: JobOrder;
}

export type SubmissionStage = 
  | 'submitted'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected';

export interface InterviewDate {
  date: string;
  time?: string;
  type: 'phone' | 'video' | 'onsite';
  interviewer?: string;
  notes?: string;
}

export interface OfferDetails {
  salary: number;
  start_date: string;
  title?: string;
  bonus?: number;
  equity?: string;
  benefits?: string[];
  expiration_date?: string;
}

// ATS Adapter Interface - Platform Agnostic
export interface ATSAdapter {
  platform: ATSPlatform;
  
  // Candidates
  createCandidate(data: Omit<Candidate, 'id'>): Promise<{ success: boolean; id?: string; error?: string }>;
  updateCandidate(id: string, data: Partial<Candidate>): Promise<{ success: boolean; error?: string }>;
  syncCandidateToATS(candidate: Candidate): Promise<{ success: boolean; error?: string }>;
  
  // Jobs
  createJob(data: Omit<JobOrder, 'id'>): Promise<{ success: boolean; id?: string; error?: string }>;
  syncJobToATS(job: JobOrder): Promise<{ success: boolean; error?: string }>;
  
  // Submissions
  submitCandidateToJob(candidateId: string, jobId: string): Promise<{ success: boolean; error?: string }>;
  
  // Placements
  createPlacement(data: Omit<Placement, 'id'>): Promise<{ success: boolean; id?: string; error?: string }>;
  
  // Sync
  getSyncStatus(): Promise<SyncStatus>;
}

export interface SyncStatus {
  platform: ATSPlatform;
  last_sync?: string;
  candidates_synced: number;
  jobs_synced: number;
  pending_syncs: number;
}

// Filters for queries
export interface CandidateFilters {
  status?: CandidateStatus[];
  source?: string;
  skills?: string[];
  location?: string;
  search?: string;
}

export interface JobFilters {
  status?: JobStatus[];
  client_company?: string;
  employment_type?: EmploymentType[];
  priority?: string[];
  assigned_agent?: string;
  search?: string;
}

export interface PlacementFilters {
  fee_status?: FeeStatus[];
  placement_type?: PlacementType[];
  agent_id?: string;
  date_range?: {
    start: string;
    end: string;
  };
}
