import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Calendar, MapPin, Users } from "lucide-react";
import { getSavedItineraries, deleteItinerary, SavedItinerary } from "@/services/itineraries";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SavedItineraries = () => {
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedItineraries();
  }, []);

  const loadSavedItineraries = async () => {
    setLoading(true);
    const itineraries = await getSavedItineraries();
    setSavedItineraries(itineraries);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const success = await deleteItinerary(id);
    if (success) {
      loadSavedItineraries();
      toast.success("Itinerary deleted successfully!");
    } else {
      toast.error("Failed to delete itinerary.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (savedItineraries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Saved Itineraries</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No saved itineraries yet.</p>
          <Link to="/create">
            <Button>Create Your First Itinerary</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Saved Itineraries</h1>
        <Link to="/create">
          <Button>Create New Itinerary</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItineraries.map((itinerary) => (
          <Card key={itinerary.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{itinerary.destination}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(itinerary.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(itinerary.start_date).toLocaleDateString()} - {new Date(itinerary.end_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{itinerary.destination}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Users className="h-4 w-4" />
                <span>{itinerary.travel_style}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {itinerary.activities?.map((activity: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {activity}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Link to={`/itinerary/${itinerary.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                <span className="text-xs text-muted-foreground">
                  Created: {new Date(itinerary.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedItineraries;