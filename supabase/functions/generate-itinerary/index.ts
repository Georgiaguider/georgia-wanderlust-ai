
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, startDate, endDate, numberOfDays, travelStyle, activities } = await req.json();

    if (!openAIApiKey) {
      throw new Error('Missing OpenAI API Key');
    }

    const prompt = `
Create a detailed ${numberOfDays}-day itinerary for a ${travelStyle} trip to ${destination}, Georgia from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}.
${activities ? `Include activities focused on: ${activities}` : ''}

Each day should include:
1. A title for the day
2. 4-6 activities
3. Meal recommendations
4. Accommodation suggestions

Format the response as a valid JSON array with the following structure for each day:
[
  {
    "day": 1,
    "date": "May 1, 2025",
    "title": "Exploring Old Tbilisi",
    "activities": [
      "Morning walking tour of Narikala Fortress",
      "Visit the sulfur baths in Abanotubani",
      "Lunch at a traditional restaurant",
      "Explore the historic churches and synagogue",
      "Evening wine tasting"
    ],
    "meals": {
      "breakfast": "Traditional Georgian breakfast at the hotel",
      "lunch": "Khinkali and khachapuri at Restaurant Name",
      "dinner": "Georgian feast at Restaurant Name"
    },
    "accommodation": "Stay at Hotel Name in City Center"
  },
  ...additional days
]

Each day should be authentic to Georgian culture and include specific location names, restaurants, and attractions. For a ${travelStyle} travel style, adjust the accommodation and activity recommendations accordingly.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a travel expert specializing in Georgia country tourism. You provide detailed, authentic travel itineraries with specific recommendations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // Extract the JSON from the response
    let itinerary;
    try {
      // Look for JSON array in the response
      const jsonMatch = generatedContent.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        itinerary = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, try parsing the entire response
        itinerary = JSON.parse(generatedContent);
      }
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      throw new Error("Failed to parse itinerary data");
    }

    return new Response(
      JSON.stringify({ 
        itinerary,
        destination, 
        startDate, 
        endDate, 
        travelStyle
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in generate-itinerary function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
