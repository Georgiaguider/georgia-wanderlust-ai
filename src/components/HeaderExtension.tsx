
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const HeaderExtension = () => {
  const location = useLocation();
  
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
