
import { ItineraryDay } from '@/services/openai';

interface SavedItinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelStyle: string;
  itinerary: ItineraryDay[];
  createdAt: string;
  isFavorite: boolean;
}

export type SavedItineraries = {
  [id: string]: SavedItinerary;
};

const ITINERARIES_STORAGE_KEY = 'georgia-travel-itineraries';

// Retrieve all saved itineraries
export const getSavedItineraries = (): SavedItineraries => {
  const stored = localStorage.getItem(ITINERARIES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

// Save an itinerary to local storage
export const saveItinerary = (data: {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelStyle: string;
  itinerary: ItineraryDay[];
}): string => {
  const itineraries = getSavedItineraries();
  const id = generateId();
  
  const newItinerary: SavedItinerary = {
    id,
    destination: data.destination,
    startDate: data.startDate.toISOString(),
    endDate: data.endDate.toISOString(),
    travelStyle: data.travelStyle,
    itinerary: data.itinerary,
    createdAt: new Date().toISOString(),
    isFavorite: false
  };
  
  itineraries[id] = newItinerary;
  localStorage.setItem(ITINERARIES_STORAGE_KEY, JSON.stringify(itineraries));
  
  return id;
};

// Toggle favorite status for an itinerary
export const toggleFavoriteItinerary = (id: string): boolean => {
  const itineraries = getSavedItineraries();
  if (itineraries[id]) {
    itineraries[id].isFavorite = !itineraries[id].isFavorite;
    localStorage.setItem(ITINERARIES_STORAGE_KEY, JSON.stringify(itineraries));
    return itineraries[id].isFavorite;
  }
  return false;
};

// Delete an itinerary
export const deleteItinerary = (id: string): boolean => {
  const itineraries = getSavedItineraries();
  if (itineraries[id]) {
    delete itineraries[id];
    localStorage.setItem(ITINERARIES_STORAGE_KEY, JSON.stringify(itineraries));
    return true;
  }
  return false;
};

// Generate a simple ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

