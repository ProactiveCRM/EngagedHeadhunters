-- Create a function to calculate prospect score based on data completeness, company attributes, and engagement
CREATE OR REPLACE FUNCTION public.calculate_prospect_score(prospect_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  p prospects%ROWTYPE;
  base_score integer := 0;
  data_completeness_score integer := 0;
  company_quality_score integer := 0;
  engagement_score integer := 0;
  enrichment_score integer := 0;
  reminder_count integer := 0;
  activity_count integer := 0;
BEGIN
  -- Fetch the prospect
  SELECT * INTO p FROM prospects WHERE id = prospect_id;
  
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  -- DATA COMPLETENESS (max 30 points)
  -- Company data
  IF p.company_name IS NOT NULL AND p.company_name != '' THEN
    data_completeness_score := data_completeness_score + 5;
  END IF;
  IF p.company_domain IS NOT NULL AND p.company_domain != '' THEN
    data_completeness_score := data_completeness_score + 5;
  END IF;
  IF p.company_industry IS NOT NULL AND p.company_industry != '' THEN
    data_completeness_score := data_completeness_score + 3;
  END IF;
  IF p.company_location IS NOT NULL AND p.company_location != '' THEN
    data_completeness_score := data_completeness_score + 2;
  END IF;
  
  -- Contact data
  IF p.contact_name IS NOT NULL AND p.contact_name != '' THEN
    data_completeness_score := data_completeness_score + 5;
  END IF;
  IF p.contact_email IS NOT NULL AND p.contact_email != '' THEN
    data_completeness_score := data_completeness_score + 5;
  END IF;
  IF p.contact_phone IS NOT NULL AND p.contact_phone != '' THEN
    data_completeness_score := data_completeness_score + 3;
  END IF;
  IF p.contact_linkedin IS NOT NULL AND p.contact_linkedin != '' THEN
    data_completeness_score := data_completeness_score + 2;
  END IF;
  
  -- COMPANY QUALITY (max 25 points)
  IF p.company_size IS NOT NULL THEN
    CASE 
      WHEN p.company_size ILIKE '%enterprise%' OR p.company_size ILIKE '%10000%' OR p.company_size ILIKE '%5000%' THEN
        company_quality_score := 25;
      WHEN p.company_size ILIKE '%1000%' OR p.company_size ILIKE '%500%' THEN
        company_quality_score := 20;
      WHEN p.company_size ILIKE '%200%' OR p.company_size ILIKE '%100%' THEN
        company_quality_score := 15;
      WHEN p.company_size ILIKE '%50%' OR p.company_size ILIKE '%mid%' THEN
        company_quality_score := 10;
      ELSE
        company_quality_score := 5;
    END CASE;
  END IF;
  
  -- Contact title quality
  IF p.contact_title IS NOT NULL THEN
    IF p.contact_title ILIKE '%CEO%' OR p.contact_title ILIKE '%Chief%' OR p.contact_title ILIKE '%President%' OR p.contact_title ILIKE '%Owner%' THEN
      company_quality_score := company_quality_score + 10;
    ELSIF p.contact_title ILIKE '%VP%' OR p.contact_title ILIKE '%Vice President%' OR p.contact_title ILIKE '%Director%' THEN
      company_quality_score := company_quality_score + 7;
    ELSIF p.contact_title ILIKE '%Manager%' OR p.contact_title ILIKE '%Head%' OR p.contact_title ILIKE '%Lead%' THEN
      company_quality_score := company_quality_score + 4;
    ELSE
      company_quality_score := company_quality_score + 2;
    END IF;
  END IF;
  
  -- Cap company quality score
  IF company_quality_score > 25 THEN
    company_quality_score := 25;
  END IF;
  
  -- ENRICHMENT (max 20 points)
  IF p.enriched_at IS NOT NULL THEN
    enrichment_score := 10;
    -- Additional points for enrichment data quality
    IF p.enrichment_data IS NOT NULL AND jsonb_typeof(p.enrichment_data::jsonb) = 'object' THEN
      enrichment_score := enrichment_score + LEAST(10, (SELECT count(*) FROM jsonb_object_keys(p.enrichment_data::jsonb))::integer);
    END IF;
  END IF;
  
  -- ENGAGEMENT (max 25 points)
  -- Count reminders
  SELECT count(*) INTO reminder_count 
  FROM prospect_reminders 
  WHERE prospect_reminders.prospect_id = p.id;
  
  -- Count activities
  SELECT count(*) INTO activity_count 
  FROM prospect_activities 
  WHERE prospect_activities.prospect_id = p.id;
  
  engagement_score := LEAST(10, reminder_count * 2) + LEAST(10, activity_count);
  
  -- Notes boost
  IF p.notes IS NOT NULL AND length(p.notes) > 50 THEN
    engagement_score := engagement_score + 3;
  ELSIF p.notes IS NOT NULL AND length(p.notes) > 0 THEN
    engagement_score := engagement_score + 1;
  END IF;
  
  -- Tags boost
  IF p.tags IS NOT NULL AND array_length(p.tags, 1) > 0 THEN
    engagement_score := engagement_score + LEAST(3, array_length(p.tags, 1));
  END IF;
  
  -- Cap engagement score
  IF engagement_score > 25 THEN
    engagement_score := 25;
  END IF;
  
  -- Calculate total score (max 100)
  base_score := data_completeness_score + company_quality_score + enrichment_score + engagement_score;
  
  -- Ensure score is between 0 and 100
  IF base_score > 100 THEN
    base_score := 100;
  END IF;
  IF base_score < 0 THEN
    base_score := 0;
  END IF;
  
  RETURN base_score;
END;
$$;

-- Create a function to recalculate and update a prospect's score
CREATE OR REPLACE FUNCTION public.update_prospect_score(prospect_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_score integer;
BEGIN
  new_score := public.calculate_prospect_score(prospect_id);
  UPDATE prospects SET score = new_score, updated_at = now() WHERE id = prospect_id;
END;
$$;

-- Create trigger function to auto-update score on prospect changes
CREATE OR REPLACE FUNCTION public.trigger_update_prospect_score()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Use NEW for INSERT/UPDATE, OLD.id would not exist for INSERT
  NEW.score := public.calculate_prospect_score(NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger on prospects table
DROP TRIGGER IF EXISTS prospect_score_trigger ON prospects;
CREATE TRIGGER prospect_score_trigger
  BEFORE INSERT OR UPDATE ON prospects
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_prospect_score();

-- Create trigger function for related tables (reminders, activities)
CREATE OR REPLACE FUNCTION public.trigger_update_related_prospect_score()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM public.update_prospect_score(OLD.prospect_id);
    RETURN OLD;
  ELSE
    PERFORM public.update_prospect_score(NEW.prospect_id);
    RETURN NEW;
  END IF;
END;
$$;

-- Triggers for prospect_reminders
DROP TRIGGER IF EXISTS reminder_score_trigger ON prospect_reminders;
CREATE TRIGGER reminder_score_trigger
  AFTER INSERT OR UPDATE OR DELETE ON prospect_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_related_prospect_score();

-- Triggers for prospect_activities
DROP TRIGGER IF EXISTS activity_score_trigger ON prospect_activities;
CREATE TRIGGER activity_score_trigger
  AFTER INSERT OR UPDATE OR DELETE ON prospect_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_related_prospect_score();

-- Recalculate all existing prospect scores
UPDATE prospects SET score = public.calculate_prospect_score(id) WHERE score = 0 OR score IS NULL;