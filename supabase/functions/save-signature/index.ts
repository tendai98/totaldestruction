import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { signatureData, name } = await req.json();

    if (!signatureData || !Array.isArray(signatureData)) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP address
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log('Client IP:', clientIp);

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

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save signature to database
    const { data, error } = await supabase
      .from('signatures')
      .insert({
        signature_data: signatureData,
        name: name || null,
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
