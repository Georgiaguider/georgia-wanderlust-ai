
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback data generator for when OpenAI API is unavailable
const generateFallbackItinerary = (destination: string, startDate: string, endDate: string, numberOfDays: number, travelStyle: string): any[] => {
  const result = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    
    const dateFormatted = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    let dayActivities;
    let meals;
    let accommodation;
    
    // Create different templates based on travel style
    if (travelStyle === 'luxury') {
      dayActivities = [
        "Morning spa treatment at a luxury hotel",
        "Private guided tour of local landmarks",
        "Lunch at a Michelin-starred restaurant",
        "Shopping at designer boutiques",
        "Five-course dinner with wine pairing"
      ];
      meals = {
        breakfast: "Gourmet breakfast at the hotel restaurant",
        lunch: "Fine dining experience at a top-rated restaurant",
        dinner: "Multi-course dinner at an exclusive restaurant"
      };
      accommodation = "Luxury 5-star hotel with mountain views";
    } else if (travelStyle === 'budget') {
      dayActivities = [
        "Self-guided walking tour of the city",
        "Visit to free public museums and galleries",
        "Picnic lunch in a local park",
        "Hike to a scenic viewpoint",
        "Street food dinner tour"
      ];
      meals = {
        breakfast: "Light breakfast at a local café",
        lunch: "Picnic or street food",
        dinner: "Dinner at an affordable local restaurant"
      };
      accommodation = "Budget-friendly guesthouse or hostel";
    } else {
      // Mid-range is default
      dayActivities = [
        "Guided tour of historical sites",
        "Visit to popular museums",
        "Lunch at a well-reviewed restaurant",
        "Afternoon leisure time",
        "Dinner at a traditional restaurant"
      ];
      meals = {
        breakfast: "Breakfast at the hotel",
        lunch: "Lunch at a popular local eatery",
        dinner: "Dinner at a traditional Georgian restaurant"
      };
      accommodation = "Comfortable 3-4 star hotel in a central location";
    }
    
    result.push({
      day: i + 1,
      date: dateFormatted,
      title: `Day ${i + 1} in ${destination}`,
      activities: dayActivities,
      meals: meals,
      accommodation: accommodation
    });
  }
  
  return result;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, startDate, endDate, numberOfDays, travelStyle, activities } = await req.json();

    if (!openAIApiKey) {
      console.log("OpenAI API key is missing, using fallback data");
      const fallbackItinerary = generateFallbackItinerary(destination, startDate, endDate, numberOfDays, travelStyle);
      
      return new Response(
        JSON.stringify({ 
          itinerary: fallbackItinerary,
          destination, 
          startDate, 
          endDate, 
          travelStyle,
          fallback: true
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    const prompt = `
Create a detailed ${numberOfDays}-day itinerary for a ${travelStyle} trip to ${destination} from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}.
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

Each day should be authentic to local culture and include specific location names, restaurants, and attractions. For a ${travelStyle} travel style, adjust the accommodation and activity recommendations accordingly.
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a travel expert specializing in tourism. You provide detailed, authentic travel itineraries with specific recommendations.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(`OpenAI API error: ${JSON.stringify(error)}`);
        
        // Use fallback data when OpenAI API fails
        const fallbackItinerary = generateFallbackItinerary(destination, startDate, endDate, numberOfDays, travelStyle);
        
        return new Response(
          JSON.stringify({ 
            itinerary: fallbackItinerary,
            destination, 
            startDate, 
            endDate, 
            travelStyle,
            fallback: true
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
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
        // Use fallback data when parsing fails
        itinerary = generateFallbackItinerary(destination, startDate, endDate, numberOfDays, travelStyle);
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
    } catch (apiError) {
      console.error('Error calling OpenAI API:', apiError);
      
      // Use fallback data when API call fails
      const fallbackItinerary = generateFallbackItinerary(destination, startDate, endDate, numberOfDays, travelStyle);
      
      return new Response(
        JSON.stringify({ 
          itinerary: fallbackItinerary,
          destination, 
          startDate, 
          endDate, 
          travelStyle,
          fallback: true
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }
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
