
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

export const generateItinerary = async (request: ItineraryRequest): Promise<ItineraryDay[]> => {
  try {
    const { destination, startDate, endDate, travelStyle, activities } = request;
    const numberOfDays = getDaysBetween(startDate, endDate);
    
    // In a real implementation, we would fetch from the OpenAI API here
    // For now, we'll call our Supabase Edge Function
    console.log("Generating itinerary for:", { destination, startDate, endDate, travelStyle, activities, numberOfDays });
    
    const response = await fetch('/api/generate-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
};
