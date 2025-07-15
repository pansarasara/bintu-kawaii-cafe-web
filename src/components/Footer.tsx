
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, Utensils, Film, Info, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CloudDecoration = ({ position }: { position: string }) => {
  return (
    <div 
      className={`absolute ${position} w-32 h-16 bg-white rounded-full opacity-70 before:content-[''] before:absolute before:w-16 before:h-16 before:bg-white before:rounded-full before:top-[-8px] before:left-4 after:content-[''] after:absolute after:w-20 after:h-20 after:bg-white after:rounded-full after:top-[-6px] after:right-4`}
    ></div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-kawaii-lilac pt-24 pb-8 overflow-hidden">
      {/* Cloud decorations */}
      <CloudDecoration position="top-0 left-10 transform -translate-y-2/3" />
      <CloudDecoration position="top-0 right-20 transform -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-2xl md:text-3xl font-display text-purple-700 mb-3">
            Stay Cozy with Bintu!
          </h3>
          
          <p className="text-purple-600 mb-6 text-center max-w-md">
            Join our newsletter for exclusive updates, special offers, and more kawaii content!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <input 
              type="email"
              placeholder="Your email address"
              className="flex h-12 w-full rounded-full border border-kawaii-purple bg-white px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-kawaii-purple"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-display text-lg text-purple-700 mb-4">About Bintu</h4>
            <p className="text-sm text-purple-600">
              Bintu Kawaii Cafe is a whimsical, popcorn-scented wonderland where delicious treats
              meet cozy movie experiences. Our adorable binturong mascot welcomes you to a world of cute!
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-purple-700 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-purple-600 hover:text-purple-500 flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link to="/drinks" className="text-sm text-purple-600 hover:text-purple-500 flex items-center gap-2">
                  <Coffee className="h-4 w-4" /> Order Drinks
                </Link>
              </li>
              <li>
                <Link to="/food" className="text-sm text-purple-600 hover:text-purple-500 flex items-center gap-2">
                  <Utensils className="h-4 w-4" /> Order Food
                </Link>
              </li>
              <li>
                <Link to="/cinema" className="text-sm text-purple-600 hover:text-purple-500 flex items-center gap-2">
                  <Film className="h-4 w-4" /> Buy Movie Tickets
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-purple-600 hover:text-purple-500 flex items-center gap-2">
                  <Info className="h-4 w-4" /> About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-purple-700 mb-4">Visit Us</h4>
            <address className="text-sm text-purple-600 not-italic">
              <p>123 Kawaii Street</p>
              <p>Cuteville, Fantasy Land 54321</p>
              <p className="mt-2">Open: 10am - 10pm Daily</p>
            </address>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-purple-700 mb-4">Connect</h4>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-kawaii-purple/30 text-center text-sm text-purple-600">
          <p>&copy; {new Date().getFullYear()} Bintu Kawaii Cafe. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:text-purple-500">Terms</Link>
            <Link to="/privacy" className="hover:text-purple-500">Privacy</Link>
            <Link to="/cookies" className="hover:text-purple-500">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
