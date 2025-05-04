
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="logo-icon relative overflow-hidden rounded-lg w-10 h-10 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-georgia-red via-georgia-red to-georgia-blue opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M12 3L20 9V21H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2044 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2044 9 16V21H4V9L12 3Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M16 8C16 8.79565 15.6839 9.55871 15.1213 10.1213C14.5587 10.6839 13.7956 11 13 11C12.2044 11 11.4413 10.6839 10.8787 10.1213C10.3161 9.55871 10 8.79565 10 8C10 7.20435 10.3161 6.44129 10.8787 5.87868C11.4413 5.31607 12.2044 5 13 5C13.7956 5 14.5587 5.31607 15.1213 5.87868C15.6839 6.44129 16 7.20435 16 8Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {showText && (
        <div className="logo-text font-playfair font-bold text-xl text-georgia-dark">
          <span className="text-georgia-red">Georgia</span>
          <span>Guider</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
