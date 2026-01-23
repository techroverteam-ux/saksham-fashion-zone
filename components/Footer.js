import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageCircle, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-text-dark to-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-maroon to-deep-maroon rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">S</span>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-royal-gold rounded-full flex items-center justify-center">
                    <Sparkles className="w-1.5 h-1.5 text-text-dark" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-royal-gold">
                Saksham Fashion Zone
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
              Where Elegance Meets Tradition. Premium sarees, blouses, and traditional Indian wear.
            </p>
            <div className="flex space-x-3">
              <a href="https://wa.me/919588253490" className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="tel:9588253490" className="bg-primary-maroon p-2 rounded-full hover:bg-deep-maroon transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-royal-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="/" className="text-gray-300 hover:text-royal-gold transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-royal-gold transition-colors">Collection</Link></li>
              <li><Link href="/offers" className="text-gray-300 hover:text-royal-gold transition-colors">Offers</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-royal-gold transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-royal-gold transition-colors">Contact</Link></li>
              <li><Link href="/cart" className="text-gray-300 hover:text-royal-gold transition-colors">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-royal-gold">Policies</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="/privacy-policy" className="text-gray-300 hover:text-royal-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="text-gray-300 hover:text-royal-gold transition-colors">Refund Policy</Link></li>
              <li><Link href="/terms-conditions" className="text-gray-300 hover:text-royal-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/shipping-policy" className="text-gray-300 hover:text-royal-gold transition-colors">Shipping Policy</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-royal-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-royal-gold">Store Info</h4>
            <div className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Merta Road, Sadar Bazar, Rajasthan
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                9588253490, 9252064591
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                Mon-Sat: 10AM-8PM
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base">
            <p className="text-gray-400 text-center sm:text-left">
              &copy; 2024 Saksham Fashion Zone. All rights reserved.
            </p>
            <p className="text-gray-400 text-center sm:text-right mt-2 sm:mt-0">
              Developed by <a href="https://techrover.co.in" target="_blank" rel="noopener noreferrer" className="text-royal-gold hover:underline">TechRover</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;