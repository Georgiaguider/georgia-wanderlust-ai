
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderExtension from '@/components/HeaderExtension';

const Affiliate = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderExtension />
      </Header>
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold font-playfair text-georgia-red mb-8">Affiliate Policy</h1>
          
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-600 mb-6">Last Updated: May 4, 2025</p>
            
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Affiliate Disclosure</h2>
                  <p className="text-gray-700">
                    Georgia Guider ("we," "our," or "us") may participate in affiliate marketing programs, which means we may receive commissions on purchases made through our links to retailer sites. This disclosure is made in accordance with the Federal Trade Commission's 16 CFR, Part 255: "Guides Concerning the Use of Endorsements and Testimonials in Advertising."
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Affiliate Relationships</h2>
                  <p className="text-gray-700">
                    We currently have affiliate relationships with the following companies:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Local Georgian hotels and accommodations</li>
                    <li>Tour operators in Georgia</li>
                    <li>Transportation services</li>
                    <li>Travel insurance providers</li>
                    <li>Online travel agencies</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    This list may be updated from time to time as we establish new relationships or end existing ones.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. How Affiliate Links Work</h2>
                  <p className="text-gray-700">
                    When you click on an affiliate link on our website:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>You will be directed to the affiliate partner's website</li>
                    <li>A tracking cookie may be placed on your device to attribute any purchase to our referral</li>
                    <li>If you make a purchase, we may receive a commission at no additional cost to you</li>
                    <li>In some cases, we may receive compensation for simply referring you to the partner site, regardless of whether you make a purchase</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Our Commitment to You</h2>
                  <p className="text-gray-700">
                    Despite our affiliate relationships, we are committed to providing you with honest, unbiased information about travel in Georgia. Our recommendations are based on genuine evaluations of quality, value, and suitability for our users.
                  </p>
                  <p className="text-gray-700 mt-2">
                    We promise that:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>We will only recommend services and products that we believe are of good quality and value</li>
                    <li>Our content and recommendations are not influenced by our affiliate partnerships</li>
                    <li>We will clearly disclose our affiliate relationships where applicable</li>
                    <li>We will not recommend a product or service solely because it offers an affiliate commission</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Identification of Affiliate Links</h2>
                  <p className="text-gray-700">
                    We strive to identify affiliate links on our website through one or more of the following methods:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Disclosure statements near the affiliate links</li>
                    <li>A general disclosure at the beginning or end of content containing affiliate links</li>
                    <li>Visual indicators next to affiliate links</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Third-Party Services</h2>
                  <p className="text-gray-700">
                    While we may recommend third-party services through our affiliate links, we cannot be held responsible for your experiences with these services. We encourage you to:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Research any service or product thoroughly before making a purchase</li>
                    <li>Read the terms and conditions of any service you're considering</li>
                    <li>Check reviews from multiple sources</li>
                    <li>Verify that the service meets your specific requirements</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Data Collection by Affiliates</h2>
                  <p className="text-gray-700">
                    Please be aware that once you click an affiliate link and visit a partner website, your data collection and privacy will be governed by that website's privacy policy, not ours. We encourage you to review the privacy policies of any website you visit.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
                  <p className="text-gray-700">
                    We may update our Affiliate Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this policy periodically for any changes.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about our affiliate relationships or this policy, please contact us at <a href="mailto:affiliates@georgiaguider.com" className="text-georgia-blue hover:underline">affiliates@georgiaguider.com</a>.
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

export default Affiliate;
