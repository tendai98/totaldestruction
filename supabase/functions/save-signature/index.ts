import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Validation schema
const pointSchema = z.object({
  x: z.number().min(0).max(1000),
  y: z.number().min(0).max(1000)
});

const signatureSchema = z.object({
  signatureData: z.array(
    z.array(pointSchema)
      .min(1)
      .max(1000)
  )
  .min(1, "Signature cannot be empty")
  .max(100, "Too many strokes"),
  name: z.string().trim().max(100).optional()
    .refine(val => !val || !/[<>"'`]/.test(val), {
      message: "Name contains invalid characters"
    })
});

// Rate limiting check
const checkRateLimit = async (supabase: any, clientIp: string): Promise<boolean> => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  
  const { data, error } = await supabase
    .from('signatures')
    .select('id')
    .eq('ip_address', clientIp)
    .gte('signed_at', fiveMinutesAgo);
  
  if (error) {
    console.error('Rate limit check error:', error);
    return true; // Allow on error to not block legitimate users
  }
  
  if (data && data.length >= 3) {
    return false;
  }
  return true;
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { signatureData, name } = await req.json();

    // Validate input with zod
    const validation = signatureSchema.safeParse({ signatureData, name });
    if (!validation.success) {
      console.error('Validation error:', validation.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input data',
          details: validation.error.errors 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validatedData = validation.data;

    // Get client IP address
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log('Client IP:', clientIp);

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check rate limit
    const canSubmit = await checkRateLimit(supabase, clientIp);
    if (!canSubmit) {
      console.log('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait before submitting another signature.' 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get location from IP using ipapi.co (free, no API key needed)
    let location = null;
    try {
      if (clientIp !== 'unknown') {
        const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          location = {
            country: geoData.country_name,
            city: geoData.city,
            region: geoData.region,
            country_code: geoData.country_code
          };
          console.log('Location data:', location);
        }
      }
    } catch (geoError) {
      console.error('Geolocation error:', geoError);
      // Continue without location data
    }

    // Save signature to database
    const { data, error } = await supabase
      .from('signatures')
      .insert({
        signature_data: validatedData.signatureData,
        name: validatedData.name || null,
        location: location,
        ip_address: clientIp
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save signature' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
