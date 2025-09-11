
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
    
    // Use Supabase Edge Function
    console.log("Using Supabase Edge Function for itinerary generation");
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase.functions.invoke('generate-itinerary', {
      body: {
        destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfDays,
        travelStyle,
        activities
      }
    });

    if (error) {
      console.error('Edge Function error:', error);
      // If edge function fails, use fallback data
      return generateFallbackItinerary(destination, startDate, endDate, numberOfDays, travelStyle);
    }
    
    return data.itinerary;
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
