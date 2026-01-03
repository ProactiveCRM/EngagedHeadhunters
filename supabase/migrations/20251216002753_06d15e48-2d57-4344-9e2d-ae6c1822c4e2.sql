-- Create subscribers table for newsletter
CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  source_page text,
  is_active boolean DEFAULT true,
  unsubscribed_at timestamptz,
  ghl_contact_id text
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Public can subscribe (insert only)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Admins can view subscribers
CREATE POLICY "Admins can view subscribers"
ON public.subscribers
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update subscribers
CREATE POLICY "Admins can update subscribers"
ON public.subscribers
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index on email for fast lookups
CREATE INDEX idx_subscribers_email ON public.subscribers(email);