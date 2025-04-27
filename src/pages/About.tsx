
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="georgia-gradient py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Georgia Wanderlust AI</h1>
              <p className="text-lg text-gray-700">
                We're passionate about helping travelers discover the beauty and culture of Georgia
                through personalized, AI-powered travel itineraries.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p>
                  Georgia Wanderlust AI was created by a team of travel enthusiasts who fell in love with
                  the diverse landscapes, rich history, and warm hospitality of Georgia.
                </p>
                <p>
                  After numerous trips to various regions of this beautiful country, we realized that
                  many travelers struggle to plan their Georgian adventure efficiently. There's so much
                  to see and experience, from the vibrant streets of Tbilisi to the breathtaking
                  mountains of Kazbegi, the lush vineyards of Kakheti, and the sunny beaches of Batumi.
                </p>
                <p>
                  That's why we developed an AI-powered solution that helps travelers create
                  personalized itineraries based on their preferences, travel style, and interests.
                  Our goal is to make planning your Georgian journey as enjoyable as the trip itself.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Georgia */}
        <section className="py-16 georgia-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Why Visit Georgia?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-georgia-red">Rich Culture & History</h3>
                  <p>
                    Georgia boasts one of the world's oldest civilizations with a unique language,
                    alphabet, and cultural traditions that date back thousands of years.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-georgia-red">Breathtaking Landscapes</h3>
                  <p>
                    From the Greater Caucasus mountains to Black Sea beaches, Georgia offers diverse
                    landscapes that will leave you in awe.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-georgia-red">Exquisite Cuisine</h3>
                  <p>
                    Georgian cuisine is becoming world-famous for its unique flavors, fresh ingredients,
                    and the famous khachapuri and khinkali.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-georgia-red">Incredible Wine</h3>
                  <p>
                    Georgia is considered the birthplace of wine, with an 8,000-year-old winemaking
                    tradition using unique qvevri clay vessels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How We Create Itineraries */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">How We Create Your Itinerary</h2>
              <div className="prose prose-lg mx-auto">
                <p>
                  Our AI-powered system combines extensive knowledge of Georgian destinations,
                  attractions, local customs, and travel logistics to create optimized itineraries
                  tailored to your preferences.
                </p>
                <p>
                  We consider factors such as:
                </p>
                <ul>
                  <li>Your selected destinations within Georgia</li>
                  <li>Travel dates and duration</li>
                  <li>Your preferred travel style (budget, mid-range, or luxury)</li>
                  <li>Activity preferences and special interests</li>
                  <li>Seasonal considerations and local events</li>
                </ul>
                <p>
                  The result is a comprehensive day-by-day itinerary that maximizes your time in Georgia
                  while providing a balanced experience of culture, nature, cuisine, and relaxation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-georgia-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Planning Your Georgian Adventure</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create your personalized travel itinerary in seconds with our AI-powered planner.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-georgia-blue hover:bg-georgia-cream"
              asChild
            >
              <Link to="/create">Plan My Trip</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
