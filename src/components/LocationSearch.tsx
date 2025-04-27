
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

// Define the props for the component
interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

// Define types for Google Maps API
declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search for a location in Georgia...",
  label
}) => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      // If not loaded, we need the API key from the environment
      console.warn("Google Maps API is not loaded yet.");
      return;
    }

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    const displaySuggestions = (input: string) => {
      if (input === '') {
        setPredictions([]);
        setShowPredictions(false);
        return;
      }
      
      // Restrict results to Georgia the country
      autocompleteService.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: 'ge' },
          types: ['(cities)'],
        },
        (predictions: any[], status: string) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            setPredictions([]);
            setShowPredictions(false);
            return;
          }
          
          setPredictions(predictions);
          setShowPredictions(true);
        }
      );
    };

    // Debounce the input to avoid too many API calls
    let timeoutId: NodeJS.Timeout | null = null;
    
    const handleInput = (input: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        displaySuggestions(input);
      }, 300);
    };

    if (value) {
      handleInput(value);
    }

    // Clean up
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [value]);

  // Handle clicks outside the prediction list to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        predictionsRef.current && 
        !predictionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowPredictions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor="location-search" className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          ref={inputRef}
          id="location-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 w-full"
          onFocus={() => value && setPredictions.length > 0 && setShowPredictions(true)}
        />
      </div>
      
      {showPredictions && predictions.length > 0 && (
        <div 
          ref={predictionsRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {predictions.map((prediction) => (
            <div
              key={prediction.place_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                onChange(prediction.description);
                setShowPredictions(false);
              }}
            >
              <MapPin size={16} className="mr-2 text-georgia-red" />
              <div>
                <p className="text-sm">{prediction.description}</p>
                <p className="text-xs text-gray-500">{prediction.structured_formatting.secondary_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
