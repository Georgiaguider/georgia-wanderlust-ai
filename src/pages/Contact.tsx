
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import HeaderExtension from '@/components/HeaderExtension';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderExtension />
      </Header>
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold font-playfair text-georgia-red mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} required />
                  </div>
                  <Button type="submit" className="bg-georgia-red hover:bg-georgia-red/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Our Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Email</h3>
                      <a href="mailto:info@georgiaguider.com" className="text-georgia-blue hover:underline">
                        info@georgiaguider.com
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Office Location</h3>
                      <address className="not-italic">
                        10 Rustaveli Avenue<br />
                        Tbilisi, 0108<br />
                        Georgia
                      </address>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Hours of Operation</h3>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM (GMT+4)</p>
                      <p>Weekends: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">FAQ</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">How do I save an itinerary?</h3>
                      <p className="text-gray-600">You can save any generated itinerary by clicking the "Save" button on the itinerary page.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Can I modify a saved itinerary?</h3>
                      <p className="text-gray-600">Currently, you can view and favorite saved itineraries, but editing functionality will be available soon.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">How long do saved itineraries last?</h3>
                      <p className="text-gray-600">Your saved itineraries will remain in your browser's storage until you clear your browser data.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
