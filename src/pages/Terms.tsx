
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderExtension from '@/components/HeaderExtension';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderExtension />
      </Header>
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold font-playfair text-georgia-red mb-8">Terms and Conditions</h1>
          
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-600 mb-6">Last Updated: May 4, 2025</p>
            
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p className="text-gray-700">
                    Welcome to Georgia Guider ("we," "our," or "us"). These Terms and Conditions govern your use of the Georgia Guider website and services, including our itinerary creation tool and all content and functionalities accessible through the website (collectively, the "Service").
                  </p>
                  <p className="text-gray-700 mt-2">
                    By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Use of the Service</h2>
                  <p className="text-gray-700">
                    Georgia Guider provides an AI-powered travel planning tool designed to help users create personalized itineraries for travel in Georgia. Use of the Service is subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>You must use the Service in compliance with all applicable laws and regulations.</li>
                    <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                    <li>You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission from Georgia Guider.</li>
                    <li>You are responsible for maintaining the security of any account or information generated through the Service.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. User-Generated Content</h2>
                  <p className="text-gray-700">
                    The Service may allow you to create and save travel itineraries. By creating content through the Service, you grant Georgia Guider a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, and display such content in connection with the Service.
                  </p>
                  <p className="text-gray-700 mt-2">
                    You represent and warrant that your content does not violate any third party's intellectual property rights, privacy rights, or other legal rights.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Intellectual Property</h2>
                  <p className="text-gray-700">
                    The Service and its original content, features, and functionality are owned by Georgia Guider and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
                  <p className="text-gray-700">
                    In no event shall Georgia Guider, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Your access to or use of or inability to access or use the Service;</li>
                    <li>Any conduct or content of any third party on the Service;</li>
                    <li>Any content obtained from the Service; and</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Data Storage</h2>
                  <p className="text-gray-700">
                    The Service uses local storage in your browser to save your itineraries. This means:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Your data is stored on your device, not on our servers.</li>
                    <li>If you clear your browser data or use a different browser/device, your saved itineraries will not be accessible.</li>
                    <li>We are not responsible for any data loss resulting from your browser settings or actions.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Accuracy of Information</h2>
                  <p className="text-gray-700">
                    While we strive to provide accurate travel recommendations and information, Georgia Guider does not warrant that information provided through the Service is accurate, complete, or up-to-date. Any reliance you place on such information is strictly at your own risk.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
                  <p className="text-gray-700">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about these Terms, please contact us at <a href="mailto:info@georgiaguider.com" className="text-georgia-blue hover:underline">info@georgiaguider.com</a>.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
