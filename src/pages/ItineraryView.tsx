
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ItineraryDay } from '@/services/openai';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { generateItineraryPDF } from '@/utils/pdfGenerator';
import { Download, Share } from 'lucide-react';

const ItineraryView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Extract data from location state
  const {
    destination = '',
    startDate,
    endDate,
    travelStyle = '',
    itinerary = [],
  } = location.state || {};
  
  // Redirect if no itinerary data is present
  useEffect(() => {
    if (!itinerary?.length) {
      toast({
        title: "No itinerary found",
        description: "Please create an itinerary first.",
        variant: "destructive",
      });
      navigate('/create');
    }
  }, [itinerary, navigate, toast]);
  
  // Handle PDF download
  const handleDownload = () => {
    try {
      generateItineraryPDF({
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        travelStyle,
        itinerary,
      });
      
      toast({
        title: "Download complete",
        description: "Your itinerary PDF has been downloaded.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Download failed",
        description: "Failed to generate the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle share functionality
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${destination} Travel Itinerary`,
          text: `Check out my travel itinerary for ${destination}!`,
          url: window.location.href,
        });
      } else {
        // Fallback to clipboard if Web Share API is not available
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Itinerary link copied to clipboard.",
        });
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      toast({
        title: "Sharing failed",
        description: "Unable to share the itinerary.",
        variant: "destructive",
      });
    }
  };
  
  // Format dates for display
  const formattedStartDate = startDate ? format(new Date(startDate), 'MMM dd, yyyy') : '';
  const formattedEndDate = endDate ? format(new Date(endDate), 'MMM dd, yyyy') : '';

  if (!itinerary?.length) {
    return null; // Avoid rendering until redirect happens
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Itinerary header section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold font-playfair text-georgia-red mb-3">
                  {destination} Travel Itinerary
                </h1>
                <p className="text-lg text-gray-600">
                  {formattedStartDate} to {formattedEndDate}
                </p>
                <p className="text-md text-gray-500 capitalize mt-1">
                  {travelStyle} Travel Style
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleDownload} className="flex items-center gap-2">
                  <Download size={18} />
                  Download PDF
                </Button>
                
                <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                  <Share size={18} />
                  Share Itinerary
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/create')}
                >
                  Back to Planner
                </Button>
              </div>
            </div>
          </div>
          
          {/* Detailed itinerary section */}
          <div className="space-y-6">
            {itinerary.map((day: ItineraryDay) => (
              <Card key={day.day} className="p-6 shadow-md border-0">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className="bg-georgia-blue text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    Day {day.day}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-semibold text-georgia-blue font-playfair">{day.title}</h2>
                    <p className="text-gray-500">{day.date}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Activities */}
                  <div>
                    <h3 className="text-xl font-medium mb-4">Activities</h3>
                    <ul className="space-y-3 ml-6">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-6 h-6 rounded-full bg-georgia-red/10 flex-shrink-0 flex items-center justify-center text-xs text-georgia-red font-bold mr-3 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Meals */}
                  {day.meals && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-xl font-medium mb-4">Meals</h3>
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
                      </div>
                    </>
                  )}
                  
                  {/* Accommodation */}
                  {day.accommodation && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-xl font-medium mb-2">Accommodation</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">{day.accommodation}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItineraryView;
