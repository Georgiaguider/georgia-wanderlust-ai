
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="georgia-gradient">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-georgia-red/10 text-georgia-red text-sm font-medium rounded-full">
                  AI-Powered Travel Planning
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-georgia-dark">
                  Discover the Magic of Georgia
                </h1>
                <p className="text-xl text-gray-700 max-w-lg">
                  Create personalized travel itineraries for your Georgian adventure in seconds with our AI travel planner.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-georgia-red hover:bg-georgia-red/90 text-white"
                    asChild
                  >
                    <Link to="/create">Plan Your Trip</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild
                  >
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1584626177287-b69c2f42b12a?auto=format&q=75&fit=crop&w=1200&h=800" 
                  alt="Tbilisi, Georgia" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI travel planner makes it easy to create the perfect Georgian itinerary in just three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-georgia-light p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-georgia-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Destination</h3>
                <p className="text-gray-600">
                  Select a city or region in Georgia you'd like to explore.
                </p>
              </div>
              
              <div className="bg-georgia-light p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-georgia-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Add Your Preferences</h3>
                <p className="text-gray-600">
                  Tell us your travel dates, style, and activity preferences.
                </p>
              </div>
              
              <div className="bg-georgia-light p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-georgia-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Get Your Itinerary</h3>
                <p className="text-gray-600">
                  Receive a personalized day-by-day plan for your perfect Georgian journey.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-georgia-red hover:bg-georgia-red/90 text-white"
                asChild
              >
                <Link to="/create">Create Your Itinerary Now</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Destinations Section */}
        <section className="py-16 georgia-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore these amazing Georgian locations with our AI-powered itineraries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Tbilisi", image: "https://images.unsplash.com/photo-1565611642362-859fd5b6512e?auto=format&q=75&fit=crop&w=600&h=400" },
                { name: "Batumi", image: "https://images.unsplash.com/photo-1589308454676-3812caa47595?auto=format&q=75&fit=crop&w=600&h=400" },
                { name: "Kazbegi", image: "https://images.unsplash.com/photo-1559060680-7da200181f0c?auto=format&q=75&fit=crop&w=600&h=400" },
                { name: "Kakheti", image: "https://images.unsplash.com/photo-1583850432742-a44482570a9f?auto=format&q=75&fit=crop&w=600&h=400" },
                { name: "Svaneti", image: "https://images.unsplash.com/photo-1563284223-333497724b54?auto=format&q=75&fit=crop&w=600&h=400" },
                { name: "Kutaisi", image: "https://images.unsplash.com/photo-1591474170743-e95577e899b7?auto=format&q=75&fit=crop&w=600&h=400" },
              ].map((destination) => (
                <Link
                  to={`/create?destination=${destination.name}`}
                  key={destination.name}
                  className="group relative rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                >
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-2xl font-semibold text-white">{destination.name}</h3>
                      <span className="inline-block mt-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Plan your trip →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-georgia-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for your Georgian Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create your personalized travel itinerary now and start exploring the hidden gems of Georgia.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-georgia-blue hover:bg-georgia-cream"
              asChild
            >
              <Link to="/create">Plan My Trip Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
