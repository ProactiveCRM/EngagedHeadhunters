-- Target markets lookup table
CREATE TABLE IF NOT EXISTS target_markets (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Niches lookup table
CREATE TABLE IF NOT EXISTS niches (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Directory listings table
CREATE TABLE IF NOT EXISTS directory_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_market TEXT REFERENCES target_markets(id) NOT NULL,
  niche TEXT REFERENCES niches(id) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  listing_title TEXT,
  listing_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(profile_id, target_market, niche)
);

-- Enable RLS
ALTER TABLE target_markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE niches ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_listings ENABLE ROW LEVEL SECURITY;

-- Target markets: everyone can read, only admins can modify
CREATE POLICY "Anyone can view target markets"
ON target_markets FOR SELECT
USING (true);

CREATE POLICY "Admins can manage target markets"
ON target_markets FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Niches: everyone can read, only admins can modify
CREATE POLICY "Anyone can view niches"
ON niches FOR SELECT
USING (true);

CREATE POLICY "Admins can manage niches"
ON niches FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Directory listings: public can see visible ones, agents can manage their own, admins can manage all
CREATE POLICY "Anyone can view visible listings"
ON directory_listings FOR SELECT
USING (is_visible = true);

CREATE POLICY "Agents can view their own listings"
ON directory_listings FOR SELECT
USING (profile_id = auth.uid());

CREATE POLICY "Agents can create their own listings"
ON directory_listings FOR INSERT
WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Agents can update their own listings"
ON directory_listings FOR UPDATE
USING (profile_id = auth.uid());

CREATE POLICY "Agents can delete their own listings"
ON directory_listings FOR DELETE
USING (profile_id = auth.uid());

CREATE POLICY "Admins can manage all listings"
ON directory_listings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_directory_listings_updated_at
BEFORE UPDATE ON directory_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed target markets
INSERT INTO target_markets (id, display_name, description, display_order) VALUES
  ('employers', 'Employers', 'Companies hiring talent', 1),
  ('candidates', 'Candidates', 'Job seekers and passive talent', 2),
  ('recruiters', 'Recruiters', 'Recruiting professionals and agencies', 3)
ON CONFLICT (id) DO NOTHING;

-- Seed niches
INSERT INTO niches (id, display_name, icon, description, display_order) VALUES
  ('healthcare', 'Healthcare', 'Heart', 'Healthcare and medical industry recruiting', 1),
  ('technology', 'Technology', 'Cpu', 'Technology and IT recruiting', 2),
  ('finance', 'Finance', 'DollarSign', 'Finance and accounting recruiting', 3),
  ('manufacturing', 'Manufacturing', 'Factory', 'Manufacturing and industrial recruiting', 4),
  ('sales', 'Sales', 'TrendingUp', 'Sales and business development recruiting', 5),
  ('executive', 'Executive', 'Briefcase', 'C-suite and executive search', 6)
ON CONFLICT (id) DO NOTHING;