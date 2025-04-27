
import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">Georgia Explorer</h3>
            <p className="text-gray-600">
              Discover the beauty of Georgia with AI-powered travel itineraries.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-georgia-blue hover:underline">Home</Link></li>
              <li><Link to="/create" className="text-georgia-blue hover:underline">Create Itinerary</Link></li>
              <li><Link to="/about" className="text-georgia-blue hover:underline">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <p className="text-gray-600">
              Have questions? Email us at:<br />
              <a href="mailto:info@georgiaexplorer.com" className="text-georgia-blue hover:underline">
                info@georgiaexplorer.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Georgia Explorer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
