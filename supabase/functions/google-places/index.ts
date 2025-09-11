
import { corsHeaders } from '../_shared/cors.ts';

interface PlacePredictionsRequest {
  input: string;
}

console.log('Google Places function started');

Deno.serve(async (req) => {
  console.log(`Request method: ${req.method}`);
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json() as PlacePredictionsRequest;
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Missing Google Maps API key');
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: 'Missing API key configuration',
          predictions: [] 
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Use correct parameters and enable all types of places for better results
    // Note: Removing the type restriction to get more results
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:ge&language=en&key=${GOOGLE_MAPS_API_KEY}`;
    
    console.log(`Fetching Google Places API: ${url.replace(GOOGLE_MAPS_API_KEY, 'API_KEY_REDACTED')}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google API returned status ${response.status}`);
    }
    
    const data = await response.json();

    console.log(`Google Places API response status: ${data.status}`);
    
    if (data.status !== 'OK' && data.error_message) {
      console.error(`Google Places API error: ${data.error_message}`);
      
      // Check for specific API key issues
      if (data.error_message.includes('API project is not authorized') || 
          data.error_message.includes('API key')) {
        return new Response(
          JSON.stringify({ 
            status: data.status, 
            error_message: 'Google Maps API key needs to be configured with Places API access', 
            api_error: data.error_message,
            predictions: [] 
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
    }
    
    // Return empty predictions array if status is not OK to prevent frontend errors
    if (data.status !== 'OK') {
      return new Response(
        JSON.stringify({ 
          status: data.status, 
          error_message: data.error_message || 'No results found', 
          predictions: [] 
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: error.message,
        predictions: [] 
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
