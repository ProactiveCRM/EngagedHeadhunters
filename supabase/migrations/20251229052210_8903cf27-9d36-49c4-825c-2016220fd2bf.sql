-- Create locations table for dynamic location pages
CREATE TABLE public.locations (
  id TEXT PRIMARY KEY, -- slug (e.g., "dallas", "houston")
  display_name TEXT NOT NULL, -- Full display name (e.g., "Dallas-Fort Worth, TX")
  region TEXT NOT NULL, -- State or region grouping (e.g., "Texas", "California")
  population TEXT, -- Metro population (e.g., "7.6M")
  description TEXT, -- Marketing description for the location
  industries TEXT[] DEFAULT '{}', -- Key industries array
  major_companies TEXT[] DEFAULT '{}', -- Major employers array
  geo_lat NUMERIC, -- Latitude for map/SEO
  geo_lng NUMERIC, -- Longitude for map/SEO
  market_type TEXT DEFAULT 'secondary', -- 'headquarters', 'primary', 'secondary'
  display_order INTEGER DEFAULT 0, -- Sort order within region
  is_active BOOLEAN DEFAULT true, -- Whether to show this location
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Anyone can view active locations (public data)
CREATE POLICY "Anyone can view active locations"
ON public.locations
FOR SELECT
USING (is_active = true);

-- Admins can manage all locations
CREATE POLICY "Admins can manage locations"
ON public.locations
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON public.locations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for region grouping
CREATE INDEX idx_locations_region ON public.locations(region);
CREATE INDEX idx_locations_active ON public.locations(is_active);