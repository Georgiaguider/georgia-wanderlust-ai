
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderExtension from '@/components/HeaderExtension';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderExtension />
      </Header>
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold font-playfair text-georgia-red mb-8">Privacy Policy</h1>
          
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-600 mb-6">Last Updated: May 4, 2025</p>
            
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p className="text-gray-700">
                    Georgia Guider ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
                  </p>
                  <p className="text-gray-700 mt-2">
                    By using our Service, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                  <h3 className="font-medium text-gray-800 mt-4 mb-2">2.1 Browser Local Storage Data</h3>
                  <p className="text-gray-700">
                    When you use our itinerary creation tool, we store your created itineraries in your browser's local storage. This information includes:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Travel destinations within Georgia</li>
                    <li>Travel dates</li>
                    <li>Travel preferences and styles</li>
                    <li>Generated itinerary content</li>
                  </ul>
                  
                  <h3 className="font-medium text-gray-800 mt-4 mb-2">2.2 Usage Data</h3>
                  <p className="text-gray-700">
                    We may also collect usage data such as:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Pages of our Service that you visit</li>
                    <li>Time and date of your visit</li>
                    <li>Time spent on those pages</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                  <p className="text-gray-700">
                    We use the collected data for various purposes:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>To provide and maintain our Service</li>
                    <li>To allow you to create and save travel itineraries</li>
                    <li>To improve your user experience</li>
                    <li>To monitor the usage of our Service</li>
                    <li>To detect, prevent, and address technical issues</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Local Storage Data</h2>
                  <p className="text-gray-700">
                    Your itineraries are stored in your browser's local storage on your device, not on our servers. This means:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>We do not have access to these itineraries unless you explicitly share them with us.</li>
                    <li>Your data remains on your device and is accessible only through the browser you used to create it.</li>
                    <li>If you clear your browser data or use a different device/browser, you will not have access to previously saved itineraries.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Analytics</h2>
                  <p className="text-gray-700">
                    We may use third-party service providers to monitor and analyze the use of our Service. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Security of Data</h2>
                  <p className="text-gray-700">
                    The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Your Data Protection Rights</h2>
                  <p className="text-gray-700">
                    Depending on your location, you may have certain data protection rights. You can:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    <li>Access your stored itineraries through the "Saved Itineraries" page</li>
                    <li>Delete individual itineraries from your local storage</li>
                    <li>Clear all saved data by clearing your browser's local storage</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
                  <p className="text-gray-700">
                    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete this from our servers immediately.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p className="text-gray-700 mt-2">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@georgiaguider.com" className="text-georgia-blue hover:underline">privacy@georgiaguider.com</a>.
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

export default Privacy;
