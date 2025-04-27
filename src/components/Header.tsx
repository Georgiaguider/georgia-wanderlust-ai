
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-georgia-red">
            <Link to="/">Georgia Explorer</Link>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button variant="outline" className="bg-georgia-red text-white hover:bg-georgia-red/90" asChild>
            <Link to="/create">Plan Your Trip</Link>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button variant="ghost" className="md:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <nav className="flex flex-col space-y-2 container mx-auto px-4">
            <Button variant="ghost" asChild onClick={toggleMenu}>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild onClick={toggleMenu}>
              <Link to="/about">About</Link>
            </Button>
            <Button 
              variant="default" 
              className="bg-georgia-red hover:bg-georgia-red/90 text-white" 
              asChild 
              onClick={toggleMenu}
            >
              <Link to="/create">Plan Your Trip</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
