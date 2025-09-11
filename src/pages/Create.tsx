import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TravelForm from '@/components/TravelForm';
import { useToast } from '@/components/ui/use-toast';
import { generateItinerary, ItineraryDay } from '@/services/openai';
import { saveItinerary } from '@/services/itineraries';
import { format, addDays, differenceInDays } from 'date-fns';
import HeaderExtension from '@/components/HeaderExtension';

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 5));
  const [travelStyle, setTravelStyle] = useState('mid-range');
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef<HTMLElement>(null);

  // Extract destination from URL query params if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlDestination = params.get('destination');
    if (urlDestination) {
      setDestination(urlDestination);
      
      // Scroll to form when destination is set from URL
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }, 100);
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

      // Save itinerary to database
      const numberOfDays = differenceInDays(formData.endDate, formData.startDate) + 1;
      const savedItinerary = await saveItinerary(
        formData.destination,
        formData.startDate,
        formData.endDate,
        formData.travelStyle,
        formData.activities ? [formData.activities] : [],
        numberOfDays,
        generatedItinerary,
        false
      );

      if (!savedItinerary) {
        throw new Error('Failed to save itinerary');
      }

      // Navigate immediately to the itinerary view page
      navigate(`/itinerary/${savedItinerary.id}`);
      
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderExtension />
      </Header>
      
      <main className="flex-grow">
        {/* Form Section */}
        <section ref={formRef} className="modern-gradient py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-2 text-center font-playfair animate-fade-in">Plan Your Georgian Adventure</h1>
              <p className="text-center text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>Create your personalized travel itinerary in seconds</p>
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="p-8">
                  <TravelForm 
                    onSubmit={handleFormSubmit} 
                    isLoading={isLoading}
                    initialDestination={destination}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tips Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center font-playfair">Georgia Travel Tips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md card-hover">
                  <h3 className="text-xl font-semibold mb-4 text-georgia-blue">Best Time to Visit</h3>
                  <p className="text-gray-700">
                    May to June and September to October offer the most pleasant weather for exploring Georgia.
                    Summer (July-August) can be hot in Tbilisi but perfect for mountain regions like Kazbegi and Svaneti.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md card-hover">
                  <h3 className="text-xl font-semibold mb-4 text-georgia-blue">Getting Around</h3>
                  <p className="text-gray-700">
                    Marshrutkas (minibuses) are the main form of public transportation between cities.
                    Within cities, taxis and ride-sharing apps are affordable and convenient.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md card-hover">
                  <h3 className="text-xl font-semibold mb-4 text-georgia-blue">Must-Try Foods</h3>
                  <p className="text-gray-700">
                    Don't miss khachapuri (cheese bread), khinkali (dumplings), churchkhela (walnut candy),
                    and mtsvadi (Georgian barbecue). Georgia also has one of the world's oldest winemaking traditions.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md card-hover">
                  <h3 className="text-xl font-semibold mb-4 text-georgia-blue">Cultural Etiquette</h3>
                  <p className="text-gray-700">
                    Georgians are known for their warm hospitality. If invited to a supra (feast), prepare for
                    lots of toasts led by the tamada (toastmaster). Bring a small gift when visiting someone's home.
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
