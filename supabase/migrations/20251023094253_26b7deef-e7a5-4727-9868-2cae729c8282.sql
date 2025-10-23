-- Create a sanitized view that only exposes safe data
CREATE VIEW public_signatures AS
SELECT 
  id,
  signature_data,
  signed_at,
  name,
  (location->>'country') as country
FROM signatures;

-- Drop the overly permissive policy
DROP POLICY "Anyone can view signatures" ON signatures;

-- Restrict direct table access to signatures
CREATE POLICY "No direct public access to signatures"
ON signatures
FOR SELECT
USING (false);

-- Grant access to the sanitized view
GRANT SELECT ON public_signatures TO anon, authenticated;