
import { corsHeaders } from '../_shared/cors.ts';

interface PlacePredictionsRequest {
  input: string;
}

console.log('Google Places function loaded');

Deno.serve(async (req) => {
  console.log(`Google Places: ${req.method} request received`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Google Places: CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Google Places: Processing request');
    const { input } = await req.json() as PlacePredictionsRequest;
    console.log('Google Places: Input received:', input);
    
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Places: Missing Google Maps API key');
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: 'Missing API key configuration',
          predictions: [] 
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Google Places: API key found, making request to Google');
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:ge&language=en&key=${GOOGLE_MAPS_API_KEY}`;
    
    console.log('Google Places: Fetching from Google API');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Google Places: Google API returned error status:', response.status);
      throw new Error(`Google API returned status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Google Places: Google API response status:', data.status);
    console.log('Google Places: Number of predictions:', data.predictions?.length || 0);
    
    if (data.status !== 'OK' && data.error_message) {
      console.error(`Google Places: Google API error: ${data.error_message}`);
      
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

    console.log('Google Places: Returning successful response');
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Google Places: Error occurred:', error.message);
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
