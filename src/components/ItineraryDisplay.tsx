
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';

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
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  destination,
  startDate,
  endDate,
  travelStyle,
  itinerary,
  onDownload,
  onEmail,
  onNewItinerary
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-georgia-red mb-2">Your Georgia Adventure</h2>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <p className="text-lg">
              <span className="font-medium">Destination:</span> {destination}
            </p>
            <p>
              <span className="font-medium">Dates:</span> {format(startDate, 'MMM dd, yyyy')} to {format(endDate, 'MMM dd, yyyy')}
            </p>
            <p>
              <span className="font-medium">Travel Style:</span> {travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1)}
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={onDownload}>Download PDF</Button>
            <Button variant="outline" onClick={onEmail}>Email Itinerary</Button>
            <Button variant="outline" onClick={onNewItinerary}>New Itinerary</Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {itinerary.map((day) => (
          <Card key={day.day} className="itinerary-card overflow-hidden">
            <CardHeader className="bg-georgia-blue/10">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-georgia-blue">Day {day.day}: {day.title}</CardTitle>
                  <CardDescription>{day.date}</CardDescription>
                </div>
                <div className="bg-georgia-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                  {day.day}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-medium text-lg mb-3">Activities:</h4>
              <ul className="space-y-2">
                {day.activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-georgia-red/20 mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
              
              {day.meals && (
                <>
                  <Separator className="my-4" />
                  <h4 className="font-medium text-lg mb-3">Meals:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.meals.breakfast && (
                      <div>
                        <p className="font-medium text-georgia-red">Breakfast</p>
                        <p>{day.meals.breakfast}</p>
                      </div>
                    )}
                    {day.meals.lunch && (
                      <div>
                        <p className="font-medium text-georgia-red">Lunch</p>
                        <p>{day.meals.lunch}</p>
                      </div>
                    )}
                    {day.meals.dinner && (
                      <div>
                        <p className="font-medium text-georgia-red">Dinner</p>
                        <p>{day.meals.dinner}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {day.accommodation && (
                <>
                  <Separator className="my-4" />
                  <h4 className="font-medium text-lg mb-1">Accommodation:</h4>
                  <p>{day.accommodation}</p>
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
