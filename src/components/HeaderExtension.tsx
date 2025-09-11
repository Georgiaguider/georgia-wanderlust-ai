
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const HeaderExtension = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Only show saved itineraries link for authenticated users
  if (!user) {
    return null;
  }
  
  return (
    <Link 
      to="/saved-itineraries" 
      className={`flex items-center gap-2 hover:text-georgia-red transition-colors ${
        location.pathname === '/saved-itineraries' ? 'text-georgia-red' : ''
      } md:ml-6 no-print`}
    >
      <Bookmark size={16} />
      Saved Itineraries
    </Link>
  );
};

export default HeaderExtension;
