-- Add required_skills column to job_orders for skill matching
ALTER TABLE job_orders 
ADD COLUMN IF NOT EXISTS required_skills TEXT[] DEFAULT '{}';