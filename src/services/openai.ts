
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
    
    console.log("Generating itinerary for:", { destination, startDate, endDate, travelStyle, activities, numberOfDays });
    
    // Call the Supabase Edge Function
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
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.fallback) {
      console.log("Using fallback itinerary data due to API limitations");
    }
    
    return data.itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
};
