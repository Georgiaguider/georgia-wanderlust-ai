
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, XCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchPredictions = async (input: string) => {
      if (input.trim() === '') {
        setPredictions([]);
        setShowPredictions(false);
        setSearchError(null);
        return;
      }

      try {
        setIsLoading(true);
        setSearchError(null);
        setApiKeyError(false);
        
        console.log('Fetching predictions for:', input);
        const { data, error } = await supabase.functions.invoke('google-places', {
          body: { input }
        });

        setIsLoading(false);

        if (error) {
          console.error('Error fetching predictions:', error);
          setSearchError('Failed to load suggestions');
          toast({
            title: "Error loading suggestions",
            description: "Could not load location suggestions. Please try typing your destination.",
            variant: "destructive",
          });
          return;
        }

        // Check for API key configuration issues
        if (data.api_error && data.api_error.includes('API project is not authorized')) {
          console.error('Google Maps API key needs to be configured:', data.api_error);
          setApiKeyError(true);
          toast({
            title: "API Configuration Issue",
            description: "The Google Maps API key needs to be configured with Places API access. Please check your API settings.",
            variant: "destructive",
          });
          setPredictions([]);
          setShowPredictions(false);
          return;
        }

        if (data.predictions && Array.isArray(data.predictions)) {
          console.log('Predictions received:', data.predictions.length);
          setPredictions(data.predictions);
          setShowPredictions(data.predictions.length > 0);
        } else if (data.error_message) {
          console.error('Google Places API error:', data.error_message);
          setSearchError('API Error: ' + data.error_message);
          toast({
            title: "API Error",
            description: "There was an issue with the location service. Please try again later.",
            variant: "destructive",
          });
        } else {
          console.log('No predictions found or invalid response format', data);
          setPredictions([]);
          setShowPredictions(input.trim() !== '');
        }
      } catch (error) {
        setIsLoading(false);
        setSearchError('Error fetching suggestions');
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to fetch location suggestions. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value && value.trim().length > 1) {
      timeoutRef.current = setTimeout(() => {
        fetchPredictions(value);
      }, 300);
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, toast]);

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

  const handleClearInput = () => {
    onChange('');
    setPredictions([]);
    setShowPredictions(false);
    setSearchError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
          className="pl-10 pr-10 w-full"
          onFocus={() => value && predictions.length > 0 && setShowPredictions(true)}
        />
        {value && (
          <button
            type="button"
            onClick={handleClearInput}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        )}
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
                <p className="text-sm font-medium">{prediction.structured_formatting?.main_text || prediction.description}</p>
                {prediction.structured_formatting?.secondary_text && (
                  <p className="text-xs text-gray-500">{prediction.structured_formatting.secondary_text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showPredictions && predictions.length === 0 && !isLoading && value.trim() !== '' && !searchError && !apiKeyError && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center text-gray-500">
          No locations found in Georgia matching your search. Try another location.
        </div>
      )}
      
      {apiKeyError && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-red-200 rounded-md shadow-lg p-4 text-center text-red-500 flex items-center justify-center">
          <AlertCircle className="mr-2 h-4 w-4" />
          Google Maps API key needs proper configuration
        </div>
      )}
      
      {searchError && !isLoading && !apiKeyError && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-red-200 rounded-md shadow-lg p-4 text-center text-red-500">
          {searchError}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
