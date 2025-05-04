
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const HeaderExtension = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:block no-print">
      <Link 
        to="/saved" 
        className={`ml-6 flex items-center gap-2 hover:text-georgia-red transition-colors ${
          location.pathname === '/saved' ? 'text-georgia-red' : ''
        }`}
      >
        <Bookmark size={16} />
        Saved Itineraries
      </Link>
    </div>
  );
};

export default HeaderExtension;
