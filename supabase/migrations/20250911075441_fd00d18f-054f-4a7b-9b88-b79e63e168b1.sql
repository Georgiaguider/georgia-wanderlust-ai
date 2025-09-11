-- Temporarily allow anonymous access to itineraries table
-- This removes authentication requirement until proper auth is implemented

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can create their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Users can delete their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Users can update their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Users can view their own itineraries" ON public.itineraries;

-- Create temporary policies that allow anonymous access
CREATE POLICY "Allow anonymous read access to itineraries" 
ON public.itineraries 
FOR SELECT 
USING (true);

CREATE POLICY "Allow anonymous insert access to itineraries" 
ON public.itineraries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to itineraries" 
ON public.itineraries 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow anonymous delete access to itineraries" 
ON public.itineraries 
FOR DELETE 
USING (true);

-- Make user_id nullable temporarily since we're not using auth
ALTER TABLE public.itineraries ALTER COLUMN user_id DROP NOT NULL;