-- Add tracking columns to contact_submissions table
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS source_page text;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS inquiry_type text;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_campaign text;

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_source ON contact_submissions(source_page);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_inquiry ON contact_submissions(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at);