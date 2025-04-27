
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from '../_shared/cors.ts';

interface PlacePredictionsRequest {
  input: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json() as PlacePredictionsRequest;
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error('Missing Google Maps API key');
    }

    // Make sure we're only querying for cities in Georgia (country)
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:ge&types=(cities)&language=en&key=${GOOGLE_MAPS_API_KEY}`;
    
    console.log(`Fetching Google Places API: ${url.replace(GOOGLE_MAPS_API_KEY, 'API_KEY_REDACTED')}`);
    
    const response = await fetch(url);
    const data = await response.json();

    console.log(`Google Places API response status: ${data.status}`);
    if (data.status !== 'OK' && data.error_message) {
      console.error(`Google Places API error: ${data.error_message}`);
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
