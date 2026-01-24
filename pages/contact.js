import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Contact = () => {
  const { getCartCount } = useCart();
  
  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={getCartCount()} />

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-3">Visit Our Store</h1>
          <p className="text-base sm:text-lg text-gray-600">Experience elegance in person</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="card p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-maroon mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Store Address</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Merta Road, Sadar Bazar<br />
                    Near Namdev Vashtra Bhandar<br />
                    Rajasthan, India
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-maroon mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Contact Numbers</h3>
                  <div className="space-y-1 text-sm sm:text-base">
                    <p>Saksham: <a href="tel:9588253490" className="text-primary-maroon hover:underline font-medium">9588253490</a></p>
                    <p>Praveen: <a href="tel:9252064591" className="text-primary-maroon hover:underline font-medium">9252064591</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-maroon mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Store Hours</h3>
                  <div className="space-y-1 text-gray-600 text-sm sm:text-base">
                    <p>Mon-Sat: 10:00 AM - 8:00 PM</p>
                    <p>Sunday: 11:00 AM - 7:00 PM</p>
                    <p className="text-primary-maroon font-semibold">Inauguration: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://wa.me/919588253490?text=Hi! I'm interested in your collection"
                className="btn-primary flex-1 flex items-center justify-center text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>
              <button className="btn-gold flex-1 text-sm sm:text-base">
                Get Directions
              </button>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Store Location</h3>
            <div className="bg-gray-200 h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5234567890123!2d74.6234567890123!3d26.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMerta%20Road%2C%20Sadar%20Bazar%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Saksham Fashion Zone Location"
              ></iframe>
            </div>
            <div className="mt-3 text-center">
              <a 
                href="https://maps.google.com/?q=Merta+Road+Sadar+Bazar+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-maroon hover:underline text-sm"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;