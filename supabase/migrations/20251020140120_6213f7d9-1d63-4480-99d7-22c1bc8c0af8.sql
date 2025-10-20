-- Create signatures table
CREATE TABLE public.signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  signature_data JSONB NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert signatures (public petition)
CREATE POLICY "Anyone can sign the petition"
ON public.signatures
FOR INSERT
TO public
WITH CHECK (true);

-- Allow anyone to view signatures (public display)
CREATE POLICY "Anyone can view signatures"
ON public.signatures
FOR SELECT
TO public
USING (true);

-- Create index for faster queries
CREATE INDEX idx_signatures_signed_at ON public.signatures(signed_at DESC);