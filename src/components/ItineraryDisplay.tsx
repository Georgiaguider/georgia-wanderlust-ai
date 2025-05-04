
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Mail, RefreshCw, Bookmark, Heart, Printer } from "lucide-react";
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { saveItinerary, toggleFavoriteItinerary } from '@/utils/localStorage';

interface ItineraryDay {
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

interface ItineraryDisplayProps {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelStyle: string;
  itinerary: ItineraryDay[];
  onDownload: () => void;
  onEmail: () => void;
  onNewItinerary: () => void;
  id?: string;
  isFavorite?: boolean;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  destination,
  startDate,
  endDate,
  travelStyle,
  itinerary,
  onDownload,
  onEmail,
  onNewItinerary,
  id,
  isFavorite = false
}) => {
  const { toast } = useToast();
  const [favorite, setFavorite] = React.useState(isFavorite);

  const handleSave = () => {
    try {
      const savedId = saveItinerary({
        destination,
        startDate,
        endDate,
        travelStyle,
        itinerary,
      });
      
      toast({
        title: "Itinerary saved",
        description: "Your itinerary has been saved and can be accessed later.",
      });
      
      return savedId;
    } catch (error) {
      console.error("Failed to save itinerary:", error);
      toast({
        title: "Save failed",
        description: "Could not save your itinerary. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleToggleFavorite = () => {
    let itineraryId = id;
    
    // If we don't have an ID, save the itinerary first
    if (!itineraryId) {
      itineraryId = handleSave();
      if (!itineraryId) return;
    }
    
    const isFav = toggleFavoriteItinerary(itineraryId);
    setFavorite(isFav);
    
    toast({
      title: isFav ? "Added to favorites" : "Removed from favorites",
      description: isFav 
        ? "This itinerary has been added to your favorites." 
        : "This itinerary has been removed from your favorites."
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold font-playfair text-georgia-red mb-2">Your Georgia Adventure</h2>
            <div className="space-y-1">
              <p className="text-lg flex items-center gap-2">
                <span className="font-medium">Destination:</span> {destination}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="font-medium">Dates:</span> {format(startDate, 'MMM dd, yyyy')} to {format(endDate, 'MMM dd, yyyy')}
              </p>
              <p>
                <Badge variant="outline" className="capitalize font-normal">
                  {travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1)} Travel
                </Badge>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={handleSave} 
              className="flex items-center gap-2"
            >
              <Bookmark size={16} />
              Save
            </Button>
            <Button 
              variant="outline" 
              onClick={handleToggleFavorite} 
              className={`flex items-center gap-2 ${favorite ? 'text-red-500' : ''}`}
            >
              <Heart size={16} fill={favorite ? "currentColor" : "none"} />
              {favorite ? 'Favorited' : 'Favorite'}
            </Button>
            <Button variant="outline" onClick={onDownload} className="flex items-center gap-2">
              <Download size={16} />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2 no-print">
              <Printer size={16} />
              Print
            </Button>
            <Button variant="outline" onClick={onEmail} className="flex items-center gap-2 no-print">
              <Mail size={16} />
              Email
            </Button>
            <Button variant="outline" onClick={onNewItinerary} className="flex items-center gap-2 no-print">
              <RefreshCw size={16} />
              New Itinerary
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {itinerary.map((day) => (
          <Card key={day.day} className="itinerary-card overflow-hidden border border-gray-100">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-georgia-blue font-playfair">{day.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Calendar size={14} />
                    Day {day.day} • {day.date}
                  </CardDescription>
                </div>
                <div className="bg-georgia-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                  {day.day}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-medium text-lg mb-4">Activities:</h4>
              <ul className="space-y-3">
                {day.activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-5 h-5 rounded-full bg-georgia-red/10 flex-shrink-0 flex items-center justify-center text-xs text-georgia-red font-bold mr-3 mt-0.5">{index + 1}</span>
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
              
              {day.meals && (
                <>
                  <Separator className="my-6" />
                  <h4 className="font-medium text-lg mb-4">Meals:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.meals.breakfast && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-georgia-red mb-1">Breakfast</p>
                        <p className="text-gray-700">{day.meals.breakfast}</p>
                      </div>
                    )}
                    {day.meals.lunch && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-georgia-red mb-1">Lunch</p>
                        <p className="text-gray-700">{day.meals.lunch}</p>
                      </div>
                    )}
                    {day.meals.dinner && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-georgia-red mb-1">Dinner</p>
                        <p className="text-gray-700">{day.meals.dinner}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {day.accommodation && (
                <>
                  <Separator className="my-6" />
                  <h4 className="font-medium text-lg mb-2">Accommodation:</h4>
                  <p className="bg-gray-50 rounded-lg p-4 text-gray-700">{day.accommodation}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
