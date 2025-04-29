
export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: string[];
  meals?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  accommodation?: string;
}

interface ItineraryRequest {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelStyle: string;
  activities?: string;
}

// Calculate the number of days between two dates
const getDaysBetween = (start: Date, end: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay)) + 1;
};

// Format a date as MMM DD, YYYY
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Fallback data generator for when OpenAI API is unavailable
const generateFallbackItinerary = (destination: string, startDate: Date, endDate: Date, numberOfDays: number, travelStyle: string): ItineraryDay[] => {
  const result = [];
  
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const dateFormatted = formatDate(currentDate);
    
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
        dinner: "Dinner at a traditional restaurant"
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

export const generateItinerary = async (request: ItineraryRequest): Promise<ItineraryDay[]> => {
  try {
    const { destination, startDate, endDate, travelStyle, activities } = request;
    const numberOfDays = getDaysBetween(startDate, endDate);
    
    console.log("Generating itinerary for:", { destination, startDate, endDate, travelStyle, activities, numberOfDays });
    
    // Try to directly use OpenAI API
    try {
      const prompt = `
Create a detailed ${numberOfDays}-day itinerary for a ${travelStyle} trip to ${destination} from ${formatDate(startDate)} to ${formatDate(endDate)}.
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
  }
]

Each day should be authentic to local culture and include specific location names, restaurants, and attractions. For a ${travelStyle} travel style, adjust the accommodation and activity recommendations accordingly.
`;

      // Use fetch API to directly call OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: In a real application, you'd use an environment variable for this
          // We're directly using the API key here for demonstration only
          'Authorization': 'Bearer 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'
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
        console.error(`OpenAI API error: ${response.status}`);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("OpenAI response:", data);
      
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
        return itinerary;
      } catch (parseError) {
        console.error("Failed to parse OpenAI response:", parseError);
        throw parseError;
      }
    } catch (openaiError) {
      console.error("Error calling OpenAI directly:", openaiError);
      
      // Fall back to Supabase Edge Function
      console.log("Falling back to Supabase Edge Function");
      const response = await fetch('https://kjiceckxywowbefmccrw.supabase.co/functions/v1/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaWNlY2t4eXdvd2JlZm1jY3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDY4ODUsImV4cCI6MjA2MTMyMjg4NX0.4xqF7YEevLidBbbxhVs2VhfuHekwhlXxZIuJOCSRB3U'
        },
        body: JSON.stringify({
          destination,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          numberOfDays,
          travelStyle,
          activities
        }),
      });

      if (!response.ok) {
        console.error(`Edge Function error: ${response.status}`);
        // If edge function also fails, use fallback data
        return generateFallbackItinerary(destination, startDate, endDate, numberOfDays, travelStyle);
      }
      
      const data = await response.json();
      return data.itinerary;
    }
  } catch (error) {
    console.error("Error generating itinerary:", error);
    // As a last resort, use our fallback data
    const numberOfDays = getDaysBetween(request.startDate, request.endDate);
    return generateFallbackItinerary(
      request.destination, 
      request.startDate, 
      request.endDate, 
      numberOfDays, 
      request.travelStyle
    );
  }
};
