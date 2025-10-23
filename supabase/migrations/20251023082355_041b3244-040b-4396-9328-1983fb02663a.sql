-- Add name, location, and IP address fields to signatures table
ALTER TABLE public.signatures 
ADD COLUMN name TEXT,
ADD COLUMN location JSONB,
ADD COLUMN ip_address TEXT;