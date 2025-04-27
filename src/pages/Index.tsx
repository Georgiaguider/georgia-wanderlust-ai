
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Calendar, Star, ArrowRight, Check } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="hero-gradient">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1 bg-georgia-red/10 text-georgia-red text-sm font-medium rounded-full">
                  AI-Powered Travel Planning
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-georgia-dark font-playfair">
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
                    <Link to="/create" className="flex items-center gap-2">
                      Plan Your Trip
                      <ArrowRight size={18} />
                    </Link>
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
              
              <div className="rounded-2xl overflow-hidden shadow-xl hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1584626177287-b69c2f42b12a?auto=format&q=75&fit=crop&w=1200&h=800" 
                  alt="Tbilisi, Georgia" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      className="inline-block h-8 w-8 rounded-full border-2 border-white"
                      src={`https://randomuser.me/api/portraits/men/${30 + i}.jpg`}
                      alt=""
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">500+</span> itineraries created this week
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="#FFC107" color="#FFC107" />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-900">4.9</span> star rating
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-playfair">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create your perfect Georgian adventure in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="w-14 h-14 bg-georgia-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">1</div>
                <div className="h-20 flex items-center justify-center mb-6">
                  <MapPin size={48} className="text-georgia-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Choose Your Destination</h3>
                <p className="text-gray-600">
                  Select any city or region in Georgia you'd like to explore.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="w-14 h-14 bg-georgia-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">2</div>
                <div className="h-20 flex items-center justify-center mb-6">
                  <Calendar size={48} className="text-georgia-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Set Your Preferences</h3>
                <p className="text-gray-600">
                  Tell us your travel dates, style, and activity preferences.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="w-14 h-14 bg-georgia-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">3</div>
                <div className="h-20 flex items-center justify-center mb-6">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-georgia-red">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Your Itinerary</h3>
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
                <Link to="/create" className="flex items-center gap-2">
                  Create Your Itinerary Now
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Destinations Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-playfair">Popular Destinations</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore these amazing Georgian locations with our AI-powered itineraries
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  className="group relative rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.03] duration-300 card-hover h-64"
                >
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-white font-playfair">{destination.name}</h3>
                      <span className="inline-flex items-center mt-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Plan your trip <ArrowRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6 font-playfair">Why Use Georgia Guider</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-georgia-red/10 flex items-center justify-center text-georgia-red">
                        <Check size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                        <p className="text-gray-600">
                          Our AI is trained on insights from local Georgian travel experts to provide authentic recommendations.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-georgia-red/10 flex items-center justify-center text-georgia-red">
                        <Check size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
                        <p className="text-gray-600">
                          Get itineraries tailored to your travel style, interests, and budget—not generic tours.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-georgia-red/10 flex items-center justify-center text-georgia-red">
                        <Check size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Save Time & Stress</h3>
                        <p className="text-gray-600">
                          Skip hours of research and planning. Get your comprehensive itinerary in seconds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-xl hidden lg:block">
                  <img 
                    src="https://images.unsplash.com/photo-1572883760610-59469206f589?auto=format&q=75&fit=crop&w=800&h=600" 
                    alt="Georgian feast" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-georgia-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 font-playfair">Ready for your Georgian Adventure?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Create your personalized travel itinerary now and start exploring the hidden gems of Georgia.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-georgia-blue hover:bg-gray-100"
              asChild
            >
              <Link to="/create">Plan Your Trip Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
