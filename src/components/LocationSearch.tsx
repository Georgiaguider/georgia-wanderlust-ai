
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define the props for the component
interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

interface Prediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search for a location in Georgia...",
  label
}) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const fetchPredictions = async (input: string) => {
      if (input === '') {
        setPredictions([]);
        setShowPredictions(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('google-places', {
          body: { input }
        });

        if (error) {
          console.error('Error fetching predictions:', error);
          return;
        }

        if (data.predictions) {
          setPredictions(data.predictions);
          setShowPredictions(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleInput = (input: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        fetchPredictions(input);
      }, 300);
    };

    if (value) {
      handleInput(value);
    }

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
          onFocus={() => value && predictions.length > 0 && setShowPredictions(true)}
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
