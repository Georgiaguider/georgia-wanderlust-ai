import { corsHeaders } from '../_shared/cors.ts';

interface PlacePredictionsRequest {
  input: string;
}

console.log('Google Places function is starting up...');

Deno.serve(async (req) => {
  console.log(`Google Places: Received ${req.method} request from ${req.headers.get('origin')}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Google Places: Handling CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Google Places: Parsing request body');
    const { input } = await req.json() as PlacePredictionsRequest;
    console.log('Google Places: Received input:', input);
    
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');
    console.log('Google Places: API key status:', GOOGLE_MAPS_API_KEY ? 'Found' : 'Not found');

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

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:ge&language=en&key=${GOOGLE_MAPS_API_KEY}`;
    
    console.log('Google Places: Making request to Google Maps API');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Google Places: Google API error status:', response.status);
      throw new Error(`Google API returned status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Google Places: Google API response status:', data.status);
    console.log('Google Places: Predictions count:', data.predictions?.length || 0);
    
    if (data.status !== 'OK' && data.error_message) {
      console.error(`Google Places: API error: ${data.error_message}`);
      
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
    console.error('Google Places: Unexpected error:', error.message);
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