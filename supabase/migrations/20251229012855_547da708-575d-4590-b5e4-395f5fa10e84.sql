-- Create follow-up reminders table
CREATE TABLE public.prospect_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reminder_date TIMESTAMP WITH TIME ZONE NOT NULL,
  note TEXT,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prospect_reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage all reminders"
ON public.prospect_reminders FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Agents can manage all reminders"
ON public.prospect_reminders FOR ALL
USING (has_role(auth.uid(), 'agent'));

CREATE POLICY "Users can manage reminders for their prospects"
ON public.prospect_reminders FOR ALL
USING (
  prospect_id IN (
    SELECT id FROM public.prospects WHERE created_by = auth.uid()
  )
);

-- Add updated_at trigger
CREATE TRIGGER update_prospect_reminders_updated_at
  BEFORE UPDATE ON public.prospect_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create index for efficient queries
CREATE INDEX idx_prospect_reminders_date ON public.prospect_reminders(reminder_date);
CREATE INDEX idx_prospect_reminders_prospect ON public.prospect_reminders(prospect_id);
CREATE INDEX idx_prospect_reminders_created_by ON public.prospect_reminders(created_by);