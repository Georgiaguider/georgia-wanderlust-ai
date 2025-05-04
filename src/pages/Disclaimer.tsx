
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderExtension from '@/components/HeaderExtension';

const Disclaimer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderExtension />
      </Header>
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold font-playfair text-georgia-red mb-8">Disclaimer</h1>
          
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-600 mb-6">Last Updated: May 4, 2025</p>
            
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Information Accuracy</h2>
                  <p className="text-gray-700">
                    Georgia Guider aims to provide accurate and up-to-date information regarding travel in Georgia. However, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Any reliance you place on such information is therefore strictly at your own risk. Travel conditions, attractions, accommodations, transportation, and other aspects of travel can change without notice. We strongly recommend verifying all information directly with venues, accommodations, and other service providers before finalizing your travel plans.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. AI-Generated Content</h2>
                  <p className="text-gray-700">
                    The itineraries and travel suggestions provided by Georgia Guider are generated using artificial intelligence technology. While we strive to provide high-quality recommendations, AI-generated content may:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Contain inaccuracies or outdated information</li>
                    <li>Not account for seasonal changes, temporary closures, or special events</li>
                    <li>Not be optimized for individual needs such as accessibility requirements</li>
                    <li>Not reflect sudden changes in local conditions, political situations, or health advisories</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    Users should exercise their judgment and conduct additional research when planning their trips based on our suggestions.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. Travel Risks and Insurance</h2>
                  <p className="text-gray-700">
                    Travel involves inherent risks. Georgia Guider is not responsible for any injuries, damages, losses, or other negative outcomes that may result from following our suggested itineraries or travel advice. We strongly recommend:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Purchasing comprehensive travel insurance</li>
                    <li>Consulting official travel advisories from your country's government</li>
                    <li>Following local laws, customs, and regulations</li>
                    <li>Taking all necessary safety precautions during your travels</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. External Links</h2>
                  <p className="text-gray-700">
                    Our website may contain links to external websites that are not provided or maintained by Georgia Guider. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Local Storage Limitations</h2>
                  <p className="text-gray-700">
                    Georgia Guider uses browser local storage to save your itineraries. We are not responsible for any data loss resulting from:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Clearing of browser data</li>
                    <li>Browser or device settings that restrict local storage</li>
                    <li>Using multiple devices or browsers</li>
                    <li>Technical limitations of your browser or device</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    We recommend downloading or printing important itineraries to ensure you have access to them during your travels.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Service Interruptions</h2>
                  <p className="text-gray-700">
                    Georgia Guider does not guarantee that our website will be available at all times. Access to our website may be suspended, restricted, or interrupted at any time without prior notice.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
                  <p className="text-gray-700">
                    To the fullest extent permitted by applicable law, Georgia Guider shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use our website or services.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Changes to This Disclaimer</h2>
                  <p className="text-gray-700">
                    We may update our Disclaimer from time to time. We will notify you of any changes by posting the new Disclaimer on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Disclaimer periodically for any changes.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about this Disclaimer, please contact us at <a href="mailto:info@georgiaguider.com" className="text-georgia-blue hover:underline">info@georgiaguider.com</a>.
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

export default Disclaimer;
