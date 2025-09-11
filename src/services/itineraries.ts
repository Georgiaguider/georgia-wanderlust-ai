import { supabase } from "@/integrations/supabase/client";
import { ItineraryDay } from "@/services/openai";

export interface SavedItinerary {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  travel_style: string;
  activities: string[];
  number_of_days: number;
  itinerary_data: ItineraryDay[];
  is_fallback: boolean;
  created_at: string;
  updated_at: string;
}

export const saveItinerary = async (
  destination: string,
  startDate: Date,
  endDate: Date,
  travelStyle: string,
  activities: string[],
  numberOfDays: number,
  itineraryData: ItineraryDay[],
  isFallback: boolean = false
): Promise<SavedItinerary | null> => {
  try {
    const { data, error } = await supabase
      .from('itineraries')
      .insert({
        destination,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        travel_style: travelStyle,
        activities,
        number_of_days: numberOfDays,
        itinerary_data: itineraryData as any,
        is_fallback: isFallback
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving itinerary:', error);
      return null;
    }

    return {
      ...data,
      itinerary_data: (data.itinerary_data as unknown) as ItineraryDay[]
    };
  } catch (error) {
    console.error('Error saving itinerary:', error);
    return null;
  }
};

export const getSavedItineraries = async (): Promise<SavedItinerary[]> => {
  try {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching itineraries:', error);
      return [];
    }

    return (data || []).map(item => ({
      ...item,
      itinerary_data: (item.itinerary_data as unknown) as ItineraryDay[]
    }));
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    return [];
  }
};

export const deleteItinerary = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('itineraries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting itinerary:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    return false;
  }
};

export const getItineraryById = async (id: string): Promise<SavedItinerary | null> => {
  try {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching itinerary:', error);
      return null;
    }

    return {
      ...data,
      itinerary_data: (data.itinerary_data as unknown) as ItineraryDay[]
    };
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    return null;
  }
};