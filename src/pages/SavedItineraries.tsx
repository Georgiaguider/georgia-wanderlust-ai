
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getSavedItineraries, deleteItinerary, toggleFavoriteItinerary, SavedItineraries } from '@/utils/localStorage';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, Eye, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SavedItinerariesPage = () => {
  const [itineraries, setItineraries] = useState<SavedItineraries>({});
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadItineraries = () => {
      const saved = getSavedItineraries();
      setItineraries(saved);
    };
    
    loadItineraries();
    // Refresh when localStorage changes in another tab
    window.addEventListener('storage', loadItineraries);
    
    return () => {
      window.removeEventListener('storage', loadItineraries);
    };
  }, []);
  
  const handleDelete = (id: string) => {
    if (deleteItinerary(id)) {
      setItineraries(getSavedItineraries());
      toast({
        title: "Itinerary deleted",
        description: "The itinerary has been removed from your saved list."
      });
    }
  };
  
  const handleToggleFavorite = (id: string) => {
    const isFavorite = toggleFavoriteItinerary(id);
    setItineraries(getSavedItineraries());
    toast({
      title: isFavorite ? "Added to favorites" : "Removed from favorites",
      description: isFavorite 
        ? "The itinerary has been added to your favorites." 
        : "The itinerary has been removed from your favorites."
    });
  };
  
  const handleView = (id: string) => {
    const data = itineraries[id];
    navigate('/itinerary', {
      state: {
        destination: data.destination,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        travelStyle: data.travelStyle,
        itinerary: data.itinerary,
        id: data.id
      }
    });
  };
  
  const filteredItineraries = Object.entries(itineraries)
    .filter(([_, item]) => filter === 'all' || item.isFavorite)
    .sort(([_, a], [__, b]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 animate-fade-in">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold font-playfair text-georgia-red mb-6">
            Your Saved Itineraries
          </h1>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={filter === 'all' ? "default" : "outline"} 
                onClick={() => setFilter('all')}
              >
                All Itineraries
              </Button>
              <Button 
                variant={filter === 'favorites' ? "default" : "outline"} 
                onClick={() => setFilter('favorites')}
                className="flex items-center gap-2"
              >
                <Heart size={16} className="text-red-500" />
                Favorites
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/create')}
            >
              Create New Itinerary
            </Button>
          </div>
          
          {filteredItineraries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItineraries.map(([id, item]) => (
                <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-georgia-blue font-playfair truncate">{item.destination}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar size={14} />
                      {format(new Date(item.startDate), 'MMM dd')} - {format(new Date(item.endDate), 'MMM dd, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2">
                    <p className="text-sm text-gray-600 capitalize mb-2">
                      {item.travelStyle} Travel Style
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.itinerary.length} day itinerary
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 pb-4">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleToggleFavorite(id)}
                      className={item.isFavorite ? "text-red-500" : "text-gray-400"}
                    >
                      <Heart size={20} fill={item.isFavorite ? "currentColor" : "none"} />
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(id)}>
                        <Eye size={16} className="mr-1" /> View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No saved itineraries</h3>
              <p className="text-gray-500 mb-6">
                {filter === 'favorites' 
                  ? "You haven't added any itineraries to favorites yet." 
                  : "You haven't created any itineraries yet."}
              </p>
              <Button onClick={() => navigate('/create')}>Create Your First Itinerary</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedItinerariesPage;
