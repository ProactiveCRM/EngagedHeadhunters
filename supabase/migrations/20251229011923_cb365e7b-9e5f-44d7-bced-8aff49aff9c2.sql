-- Create email templates table for outreach
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_shared BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Policies for email templates
CREATE POLICY "Users can view their own templates"
ON public.email_templates FOR SELECT
USING (created_by = auth.uid() OR is_shared = true);

CREATE POLICY "Users can create their own templates"
ON public.email_templates FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own templates"
ON public.email_templates FOR UPDATE
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own templates"
ON public.email_templates FOR DELETE
USING (created_by = auth.uid());

CREATE POLICY "Agents can manage all templates"
ON public.email_templates FOR ALL
USING (has_role(auth.uid(), 'agent'));

CREATE POLICY "Admins can manage all templates"
ON public.email_templates FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create prospect activity log table
CREATE TABLE public.prospect_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prospect_activities ENABLE ROW LEVEL SECURITY;

-- Policies for activity log
CREATE POLICY "Agents can view all activities"
ON public.prospect_activities FOR SELECT
USING (has_role(auth.uid(), 'agent'));

CREATE POLICY "Agents can create activities"
ON public.prospect_activities FOR INSERT
WITH CHECK (has_role(auth.uid(), 'agent'));

CREATE POLICY "Admins can manage all activities"
ON public.prospect_activities FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view activities for their prospects"
ON public.prospect_activities FOR SELECT
USING (
  prospect_id IN (
    SELECT id FROM public.prospects WHERE created_by = auth.uid()
  )
);

CREATE POLICY "Users can create activities for their prospects"
ON public.prospect_activities FOR INSERT
WITH CHECK (
  user_id = auth.uid() AND
  prospect_id IN (
    SELECT id FROM public.prospects WHERE created_by = auth.uid()
  )
);

-- Add trigger for updated_at on email_templates
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster activity lookups
CREATE INDEX idx_prospect_activities_prospect_id ON public.prospect_activities(prospect_id);
CREATE INDEX idx_prospect_activities_created_at ON public.prospect_activities(created_at DESC);