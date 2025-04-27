
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
    
    // TODO: In a real app, this would be an API call to OpenAI
    // For now we'll create a mock response that simulates what OpenAI would return
    
    console.log("Generating itinerary for:", { destination, startDate, endDate, travelStyle, activities, numberOfDays });
    
    // Mock response - in production this would come from OpenAI API
    const itinerary: ItineraryDay[] = Array.from({ length: numberOfDays }, (_, i) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      let dayActivities: string[] = [];
      let accommodation = '';
      let dayTitle = '';
      
      // Different templates based on destination
      if (destination.toLowerCase().includes('tbilisi')) {
        switch (i % 5) {
          case 0:
            dayTitle = "Old Tbilisi Exploration";
            dayActivities = [
              "Morning walk through the narrow streets of Old Tbilisi",
              "Visit the Narikala Fortress for panoramic views",
              "Explore the historic sulfur baths in Abanotubani district",
              "Dinner at a traditional Georgian restaurant with folk music"
            ];
            accommodation = "Stay at a boutique hotel in the historic district";
            break;
          case 1:
            dayTitle = "Cultural Day";
            dayActivities = [
              "Visit the Georgian National Museum",
              "Explore the Holy Trinity Cathedral (Sameba)",
              "Stroll down Rustaveli Avenue and visit the Parliament building",
              "Evening wine tasting of Georgian wines"
            ];
            accommodation = "Same accommodation in Tbilisi";
            break;
          case 2:
            dayTitle = "Day Trip to Mtskheta";
            dayActivities = [
              "Morning trip to Mtskheta, the ancient capital of Georgia",
              "Visit the Jvari Monastery overlooking the confluence of rivers",
              "Explore the Svetitskhoveli Cathedral, a UNESCO World Heritage site",
              "Return to Tbilisi for an evening at the Gabriadze Puppet Theater"
            ];
            accommodation = "Same accommodation in Tbilisi";
            break;
          case 3:
            dayTitle = "Kakheti Wine Region";
            dayActivities = [
              "Full-day trip to Kakheti wine region",
              "Visit several family wineries and taste organic wines",
              "Explore Sighnaghi, the 'City of Love'",
              "Traditional Georgian supra (feast) with local wine makers"
            ];
            accommodation = "Same accommodation in Tbilisi";
            break;
          case 4:
            dayTitle = "Modern Tbilisi & Leisure";
            dayActivities = [
              "Visit the Chronicles of Georgia monument",
              "Ride the aerial tramway to Mtatsminda Park",
              "Shopping for souvenirs at the Dry Bridge Market",
              "Farewell dinner at a modern Georgian fusion restaurant"
            ];
            accommodation = "Same accommodation in Tbilisi";
            break;
        }
      } else if (destination.toLowerCase().includes('batumi')) {
        switch (i % 4) {
          case 0:
            dayTitle = "Batumi Boulevard & Old Town";
            dayActivities = [
              "Morning stroll along the 7km Batumi Boulevard",
              "Visit the Alphabet Tower and the moving statue of Ali and Nino",
              "Explore Europe Square and the Old Town area",
              "Evening at the dancing fountains"
            ];
            accommodation = "Stay at a sea-view hotel in Batumi";
            break;
          case 1:
            dayTitle = "Botanical Gardens & Beach Day";
            dayActivities = [
              "Visit the Batumi Botanical Gardens",
              "Relax at one of Batumi's pebble beaches",
              "Try water activities like jet skiing or parasailing",
              "Dinner at a seafood restaurant on the promenade"
            ];
            accommodation = "Same accommodation in Batumi";
            break;
          case 2:
            dayTitle = "Day Trip to Mountainous Adjara";
            dayActivities = [
              "Full-day trip to the mountains of Adjara",
              "Visit the Makhuntseti waterfall",
              "Experience rural Georgian life and cuisine",
              "Optional visit to a mountain lake"
            ];
            accommodation = "Same accommodation in Batumi";
            break;
          case 3:
            dayTitle = "Modern Batumi & Leisure";
            dayActivities = [
              "Visit Piazza Square and the Astronomical Clock",
              "Try your luck at one of Batumi's casinos",
              "Shopping at Batumi Mall or local markets",
              "Farewell dinner with Adjarian khachapuri"
            ];
            accommodation = "Same accommodation in Batumi";
            break;
        }
      } else {
        // Generic Georgia itinerary for other destinations
        switch (i % 3) {
          case 0:
            dayTitle = "Local Exploration Day";
            dayActivities = [
              "Morning walking tour of the main sights",
              "Visit local historical sites and museums",
              "Try traditional Georgian cuisine for lunch",
              "Evening folk performance or cultural event"
            ];
            accommodation = `Accommodation in ${destination}`;
            break;
          case 1:
            dayTitle = "Nature & Adventure Day";
            dayActivities = [
              "Hiking in the nearby natural attractions",
              "Visit to local viewpoints and photo spots",
              "Picnic lunch with Georgian specialties",
              "Optional wine tasting or cooking class"
            ];
            accommodation = `Same accommodation in ${destination}`;
            break;
          case 2:
            dayTitle = "Day Trip & Cultural Immersion";
            dayActivities = [
              "Day trip to a nearby village or attraction",
              "Learn about local crafts or traditions",
              "Meet with locals and share stories",
              "Farewell dinner with traditional Georgian music"
            ];
            accommodation = `Same accommodation in ${destination}`;
            break;
        }
      }
      
      // Adjust for travel style
      if (travelStyle === 'luxury') {
        accommodation = accommodation.replace('hotel', 'luxury hotel or resort');
        if (dayActivities.some(activity => activity.includes('dinner'))) {
          dayActivities = dayActivities.map(activity => 
            activity.includes('dinner') ? activity.replace('dinner', 'gourmet dinner') : activity
          );
        }
      } else if (travelStyle === 'budget') {
        accommodation = accommodation.replace('hotel', 'guesthouse or hostel');
      }
      
      // Add activities preferences if provided
      if (activities && i === Math.floor(numberOfDays / 2)) {
        dayActivities.push(`Special activity based on your preferences: ${activities}`);
      }
      
      return {
        day: i + 1,
        date: formatDate(currentDate),
        title: dayTitle,
        activities: dayActivities,
        meals: {
          breakfast: "Traditional Georgian breakfast with khachapuri and fresh herbs",
          lunch: "Local dishes at a family-owned restaurant",
          dinner: "Regional specialties and Georgian wine"
        },
        accommodation
      };
    });
    
    // Add a delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
};
