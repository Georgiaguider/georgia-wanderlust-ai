
import { jsPDF } from 'jspdf';
import { ItineraryDay } from '@/services/openai';
import { format } from 'date-fns';

interface PDFGenerationOptions {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelStyle: string;
  itinerary: ItineraryDay[];
}

export const generateItineraryPDF = ({
  destination,
  startDate,
  endDate,
  travelStyle,
  itinerary,
}: PDFGenerationOptions): void => {
  // Create a new jsPDF instance
  const doc = new jsPDF();
  
  // Set up document properties
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPos = margin;
  const lineHeight = 7;
  
  // Add title and dates
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  
  // Center the title
  const title = `${destination} Itinerary`;
  const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
  doc.text(title, (pageWidth - titleWidth) / 2, yPos);
  yPos += lineHeight * 2;
  
  // Add dates and travel style
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${format(startDate, 'MMM dd, yyyy')} to ${format(endDate, 'MMM dd, yyyy')}`, margin, yPos);
  yPos += lineHeight;
  
  doc.text(`Travel Style: ${travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1)}`, margin, yPos);
  yPos += lineHeight * 2;
  
  // Add each day's itinerary
  itinerary.forEach((day, index) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }
    
    // Add day header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${day.title}`, margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(`${day.date}`, margin, yPos);
    yPos += lineHeight * 1.5;
    
    // Add activities
    doc.setFont('helvetica', 'bold');
    doc.text('Activities:', margin, yPos);
    yPos += lineHeight;
    
    doc.setFont('helvetica', 'normal');
    day.activities.forEach((activity, actIndex) => {
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.text(`${actIndex + 1}. ${activity}`, margin + 5, yPos);
      yPos += lineHeight;
    });
    
    yPos += lineHeight / 2;
    
    // Add meals if available
    if (day.meals) {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text('Meals:', margin, yPos);
      yPos += lineHeight;
      
      doc.setFont('helvetica', 'normal');
      if (day.meals.breakfast) {
        doc.text(`Breakfast: ${day.meals.breakfast}`, margin + 5, yPos);
        yPos += lineHeight;
      }
      if (day.meals.lunch) {
        doc.text(`Lunch: ${day.meals.lunch}`, margin + 5, yPos);
        yPos += lineHeight;
      }
      if (day.meals.dinner) {
        doc.text(`Dinner: ${day.meals.dinner}`, margin + 5, yPos);
        yPos += lineHeight;
      }
      
      yPos += lineHeight / 2;
    }
    
    // Add accommodation if available
    if (day.accommodation) {
      // Check if we need a new page
      if (yPos > 260) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text('Accommodation:', margin, yPos);
      yPos += lineHeight;
      
      doc.setFont('helvetica', 'normal');
      doc.text(day.accommodation, margin + 5, yPos);
      yPos += lineHeight;
    }
    
    yPos += lineHeight * 1.5;
  });
  
  // Add footer with generation date
  const generationDate = format(new Date(), 'MMM dd, yyyy');
  doc.setFontSize(10);
  doc.text(`Generated on ${generationDate}`, margin, doc.internal.pageSize.getHeight() - margin);
  
  // Save the PDF
  doc.save(`${destination.toLowerCase().replace(/\s+/g, '-')}-itinerary.pdf`);
};
