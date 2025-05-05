
import React, { useState, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from './Logo';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  children?: ReactNode;
}

const destinations = [
  { name: "Tbilisi", route: "/create?destination=Tbilisi" },
  { name: "Batumi", route: "/create?destination=Batumi" },
  { name: "Kazbegi", route: "/create?destination=Kazbegi" },
  { name: "Kakheti", route: "/create?destination=Kakheti" },
  { name: "Svaneti", route: "/create?destination=Svaneti" },
  { name: "Kutaisi", route: "/create?destination=Kutaisi" },
];

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                    {destinations.map((destination) => (
                      <li key={destination.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={destination.route}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">
                              {destination.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Create an itinerary for {destination.name}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button variant="outline" className="bg-georgia-red text-white hover:bg-georgia-red/90 ml-2" asChild>
            <Link to="/create">Plan Your Trip</Link>
          </Button>
          
          {children}
        </div>
        
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
            
            <div className="py-2">
              <h3 className="text-sm font-medium mb-2 text-gray-500">Popular Destinations</h3>
              <div className="grid grid-cols-2 gap-2">
                {destinations.map((destination) => (
                  <Button key={destination.name} variant="ghost" size="sm" asChild onClick={toggleMenu}>
                    <Link to={destination.route}>{destination.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
            
            <Button variant="ghost" asChild onClick={toggleMenu}>
              <Link to="/about">About Us</Link>
            </Button>
            
            <Button 
              variant="default" 
              className="bg-georgia-red hover:bg-georgia-red/90 text-white" 
              asChild 
              onClick={toggleMenu}
            >
              <Link to="/create">Plan Your Trip</Link>
            </Button>
            
            {children && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {children}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
