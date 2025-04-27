
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TravelForm from '@/components/TravelForm';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import { useToast } from '@/components/ui/use-toast';
import { generateItinerary, ItineraryDay } from '@/services/openai';
import { format, addDays, differenceInDays } from 'date-fns';

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 5));
  const [travelStyle, setTravelStyle] = useState('mid-range');
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const { toast } = useToast();
  const location = useLocation();

  // Extract destination from URL query params if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlDestination = params.get('destination');
    if (urlDestination) {
      setDestination(urlDestination);
    }
  }, [location.search]);

  const handleFormSubmit = async (formData: {
    destination: string;
    startDate: Date;
    endDate: Date;
    travelStyle: string;
    activities: string;
  }) => {
    try {
      setIsLoading(true);
      setDestination(formData.destination);
      setStartDate(formData.startDate);
      setEndDate(formData.endDate);
      setTravelStyle(formData.travelStyle);

      // Validate dates
      if (differenceInDays(formData.endDate, formData.startDate) < 0) {
        toast({
          title: "Invalid dates",
          description: "End date cannot be before start date",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Generate itinerary
      const generatedItinerary = await generateItinerary({
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        travelStyle: formData.travelStyle,
        activities: formData.activities
      });

      setItinerary(generatedItinerary);
      
      // Scroll to itinerary results
      setTimeout(() => {
        window.scrollTo({
          top: 350,
          behavior: 'smooth'
        });
      }, 100);
      
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your itinerary is being prepared as a PDF.",
    });
    // PDF generation would be implemented here in a real application
  };

  const handleEmailItinerary = () => {
    toast({
      title: "Email feature",
      description: "This feature will be available soon!",
    });
    // Email functionality would be implemented here in a real application
  };

  const handleNewItinerary = () => {
    setItinerary(null);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Form Section */}
        <section className="georgia-gradient py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center">Plan Your Georgian Adventure</h1>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <TravelForm 
                    onSubmit={handleFormSubmit} 
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        {itinerary && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <ItineraryDisplay 
                destination={destination}
                startDate={startDate!}
                endDate={endDate!}
                travelStyle={travelStyle}
                itinerary={itinerary}
                onDownload={handleDownload}
                onEmail={handleEmailItinerary}
                onNewItinerary={handleNewItinerary}
              />
            </div>
          </section>
        )}
        
        {/* Tips Section */}
        <section className="py-12 bg-georgia-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Georgia Travel Tips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2 text-georgia-blue">Best Time to Visit</h3>
                  <p className="text-gray-700">
                    May to June and September to October offer the most pleasant weather for exploring Georgia.
                    Summer (July-August) can be hot in Tbilisi but perfect for mountain regions.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2 text-georgia-blue">Getting Around</h3>
                  <p className="text-gray-700">
                    Marshrutkas (minibuses) are the main form of public transportation between cities.
                    Within cities, taxis are affordable but remember to agree on the price beforehand.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2 text-georgia-blue">Must-Try Foods</h3>
                  <p className="text-gray-700">
                    Don't miss khachapuri (cheese bread), khinkali (dumplings), churchkhela (walnut candy),
                    and mtsvadi (Georgian barbecue).
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2 text-georgia-blue">Cultural Etiquette</h3>
                  <p className="text-gray-700">
                    Georgians are known for their hospitality. If invited to a supra (feast), be prepared for
                    lots of toasts! It's polite to bring a small gift when visiting someone's home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Create;
