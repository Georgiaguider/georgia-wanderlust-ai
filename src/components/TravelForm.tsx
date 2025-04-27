
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TravelFormProps {
  onSubmit: (formData: {
    destination: string;
    startDate: Date;
    endDate: Date;
    travelStyle: string;
    activities: string;
  }) => void;
  isLoading: boolean;
}

const georgianCities = [
  "Tbilisi", 
  "Batumi", 
  "Kutaisi", 
  "Mtskheta", 
  "Borjomi", 
  "Kazbegi", 
  "Sighnaghi", 
  "Telavi", 
  "Gori", 
  "Zugdidi"
];

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 5));
  const [travelStyle, setTravelStyle] = useState('mid-range');
  const [activities, setActivities] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    if (destination.trim() !== '') {
      const filteredSuggestions = georgianCities.filter(city => 
        city.toLowerCase().includes(destination.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [destination]);

  const handleDestinationSelect = (city: string) => {
    setDestination(city);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination in Georgia.",
        variant: "destructive",
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Travel dates required",
        description: "Please select your travel dates.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      destination,
      startDate,
      endDate,
      travelStyle,
      activities
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="destination">Where in Georgia do you want to explore?</Label>
        <div className="relative">
          <Input
            id="destination"
            placeholder="e.g., Tbilisi, Batumi, Kazbegi..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full"
          />
          {showSuggestions && (
            <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions.map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDestinationSelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => (startDate && date < startDate) || date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="travel-style">Travel Style</Label>
        <Select value={travelStyle} onValueChange={setTravelStyle}>
          <SelectTrigger>
            <SelectValue placeholder="Select your travel style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="mid-range">Mid-range</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="activities">
          Preferences (Optional)
        </Label>
        <Input
          id="activities"
          placeholder="e.g., hiking, wine tasting, historical sites..."
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-georgia-red hover:bg-georgia-red/90 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Generating Your Itinerary..." : "Create My Itinerary"}
      </Button>
    </form>
  );
};

export default TravelForm;
