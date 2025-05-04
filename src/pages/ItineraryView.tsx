import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import { ItineraryDay } from '@/services/openai';
import { useToast } from '@/components/ui/use-toast';
import { generateItineraryPDF } from '@/utils/pdfGenerator';
import { getSavedItineraries } from '@/utils/localStorage';
import HeaderExtension from '@/components/HeaderExtension';

const ItineraryView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Extract data from location state
  const {
    destination = '',
    startDate,
    endDate,
    travelStyle = '',
    itinerary = [],
    id,
  } = location.state || {};
  
  // Check if this itinerary is favorited
  useEffect(() => {
    if (id) {
      const saved = getSavedItineraries();
      if (saved[id]) {
        setIsFavorite(saved[id].isFavorite);
      }
    }
  }, [id]);
  
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
  
  // Handle email functionality
  const handleEmail = async () => {
    try {
      // For now, just show a toast message
      toast({
        title: "Email feature",
        description: "This feature will be available soon!",
      });
    } catch (error) {
      toast({
        title: "Email failed",
        description: "Unable to email the itinerary.",
        variant: "destructive",
      });
    }
  };
  
  // Handle new itinerary
  const handleNewItinerary = () => {
    navigate('/create');
  };

  if (!itinerary?.length) {
    return null; // Avoid rendering until redirect happens
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderExtension />
      </Header>
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ItineraryDisplay
            destination={destination}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
            travelStyle={travelStyle}
            itinerary={itinerary}
            onDownload={handleDownload}
            onEmail={handleEmail}
            onNewItinerary={handleNewItinerary}
            id={id}
            isFavorite={isFavorite}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItineraryView;
