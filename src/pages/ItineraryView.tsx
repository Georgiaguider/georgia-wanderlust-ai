import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import { getItineraryById, SavedItinerary } from "@/services/itineraries";
import { generateItineraryPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

const ItineraryView = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<SavedItinerary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItinerary = async () => {
      if (id) {
        const savedItinerary = await getItineraryById(id);
        setItinerary(savedItinerary);
      }
      setLoading(false);
    };
    loadItinerary();
  }, [id]);

  const handleDownloadPDF = () => {
    if (!itinerary) return;
    
    try {
      generateItineraryPDF({
        destination: itinerary.destination,
        startDate: new Date(itinerary.start_date),
        endDate: new Date(itinerary.end_date),
        travelStyle: itinerary.travel_style,
        itinerary: itinerary.itinerary_data,
      });
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
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

  if (!itinerary) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Itinerary not found</h2>
          <p className="text-muted-foreground mb-4">The itinerary you're looking for doesn't exist.</p>
          <Link to="/saved-itineraries">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Saved Itineraries
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/saved-itineraries">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Saved Itineraries
          </Button>
        </Link>
        <Button onClick={handleDownloadPDF}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <ItineraryDisplay 
        destination={itinerary.destination}
        startDate={new Date(itinerary.start_date)}
        endDate={new Date(itinerary.end_date)}
        travelStyle={itinerary.travel_style}
        itinerary={itinerary.itinerary_data}
        onDownload={handleDownloadPDF}
        onEmail={() => {}}
        onNewItinerary={() => {}}
      />
    </div>
  );
};

export default ItineraryView;