-- Create itineraries table for storing travel plans
CREATE TABLE public.itineraries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- Optional for now, can be used later with auth
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  travel_style TEXT NOT NULL,
  activities TEXT[] DEFAULT '{}',
  number_of_days INTEGER NOT NULL,
  itinerary_data JSONB NOT NULL, -- Store the full itinerary as JSON
  is_fallback BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (can be restricted later with auth)
CREATE POLICY "Anyone can view itineraries" 
ON public.itineraries 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create itineraries" 
ON public.itineraries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their itineraries" 
ON public.itineraries 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete itineraries" 
ON public.itineraries 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_itineraries_updated_at
BEFORE UPDATE ON public.itineraries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_itineraries_destination ON public.itineraries(destination);
CREATE INDEX idx_itineraries_created_at ON public.itineraries(created_at DESC);