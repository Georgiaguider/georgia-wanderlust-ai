-- First, let's create a profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profile policies - users can only access their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update itineraries table to make user_id NOT NULL and add proper constraints
ALTER TABLE public.itineraries 
ALTER COLUMN user_id SET NOT NULL;

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can create itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Anyone can delete itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Anyone can update their itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Anyone can view itineraries" ON public.itineraries;

-- Create secure user-specific policies
CREATE POLICY "Users can view their own itineraries" 
ON public.itineraries 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own itineraries" 
ON public.itineraries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries" 
ON public.itineraries 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own itineraries" 
ON public.itineraries 
FOR DELETE 
USING (auth.uid() = user_id);