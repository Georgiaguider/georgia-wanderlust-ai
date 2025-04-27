
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-georgia-red">
            <Link to="/">Georgia Wanderlust AI</Link>
          </h1>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/create">Plan Your Trip</Link>
          </Button>
        </nav>
        <Button variant="outline" className="md:hidden">Menu</Button>
      </div>
    </header>
  );
};

export default Header;
