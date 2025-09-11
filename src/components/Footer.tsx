
import React from 'react';
import { Link } from "react-router-dom";
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8 mt-12 no-print">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-3 inline-flex" />
            <p className="text-gray-600">
              Discover the beauty of Georgia with AI-powered travel itineraries.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-georgia-blue hover:underline">Home</Link></li>
              <li><Link to="/create" className="text-georgia-blue hover:underline">Create Itinerary</Link></li>
              <li><Link to="/saved-itineraries" className="text-georgia-blue hover:underline">Saved Itineraries</Link></li>
              <li><Link to="/about" className="text-georgia-blue hover:underline">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-georgia-blue hover:underline">Contact Us</Link></li>
              <li><Link to="/disclaimer" className="text-georgia-blue hover:underline">Disclaimer</Link></li>
              <li><Link to="/affiliate" className="text-georgia-blue hover:underline">Affiliate Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-georgia-blue hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-georgia-blue hover:underline">Privacy Policy</Link></li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-600">
                Have questions? Email us at:<br />
                <a href="mailto:info@georgiaguider.com" className="text-georgia-blue hover:underline">
                  info@georgiaguider.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Georgia Guider. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
