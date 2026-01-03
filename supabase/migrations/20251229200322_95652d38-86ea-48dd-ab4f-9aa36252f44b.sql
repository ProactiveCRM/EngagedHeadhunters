-- Create page_content table for editable content blocks
CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  section_id text NOT NULL,
  content_key text NOT NULL,
  content_type text NOT NULL DEFAULT 'text',
  content_value text,
  content_metadata jsonb DEFAULT '{}'::jsonb,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id),
  UNIQUE(page_slug, section_id, content_key)
);

-- Create page_seo table for SEO metadata
CREATE TABLE public.page_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL UNIQUE,
  meta_title text,
  meta_description text,
  og_title text,
  og_description text,
  og_image text,
  twitter_title text,
  twitter_description text,
  twitter_image text,
  canonical_url text,
  robots text DEFAULT 'index, follow',
  keywords text[] DEFAULT '{}'::text[],
  structured_data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Create global_settings table for site-wide settings
CREATE TABLE public.global_settings (
  id text PRIMARY KEY,
  value text,
  value_type text DEFAULT 'text',
  category text DEFAULT 'general',
  label text,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS on all tables
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;

-- page_content policies
CREATE POLICY "Anyone can view active page content"
ON public.page_content FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage all page content"
ON public.page_content FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- page_seo policies
CREATE POLICY "Anyone can view page SEO"
ON public.page_seo FOR SELECT
USING (true);

CREATE POLICY "Admins can manage page SEO"
ON public.page_seo FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- global_settings policies
CREATE POLICY "Anyone can view global settings"
ON public.global_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage global settings"
ON public.global_settings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for better query performance
CREATE INDEX idx_page_content_page_slug ON public.page_content(page_slug);
CREATE INDEX idx_page_content_section ON public.page_content(page_slug, section_id);
CREATE INDEX idx_global_settings_category ON public.global_settings(category);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER set_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_page_seo_updated_at
  BEFORE UPDATE ON public.page_seo
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_global_settings_updated_at
  BEFORE UPDATE ON public.global_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Seed initial global settings
INSERT INTO public.global_settings (id, value, value_type, category, label, description, display_order) VALUES
('company_name', 'Engaged Headhunters', 'text', 'general', 'Company Name', 'The name of your company', 1),
('company_tagline', 'Executive Search & Leadership Recruiting', 'text', 'general', 'Tagline', 'Short company tagline', 2),
('company_description', 'Executive search specialists connecting growth-focused organizations with senior leadership talent.', 'text', 'general', 'Description', 'Brief company description', 3),
('phone', '(713) 505-6060', 'text', 'contact', 'Phone Number', 'Main contact phone', 1),
('email', 'info@engagedheadhunters.com', 'text', 'contact', 'Email', 'Main contact email', 2),
('address', 'Houston, TX', 'text', 'contact', 'Address', 'Company address', 3),
('linkedin_url', 'https://linkedin.com/company/engaged-headhunters', 'url', 'social', 'LinkedIn', 'LinkedIn company page', 1),
('booking_url', 'https://api.leadconnectorhq.com/widget/booking/2hwWwU2YZZPgzJ8TkENb', 'url', 'booking', 'Default Booking URL', 'Default calendar booking URL', 1);