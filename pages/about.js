import React from 'react';
import { Heart, Award, Users, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const About = () => {
  const { getCartCount } = useCart();
  
  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={getCartCount()} />

      <section className="py-8 sm:py-12 bg-gradient-to-r from-primary-maroon to-deep-maroon text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Our Story</h1>
          <p className="text-base sm:text-lg max-w-3xl mx-auto">
            Where Elegance Meets Tradition - Bringing you the finest collection of Indian ethnic wear
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-dark mb-3 sm:mb-4">
                A Legacy of Excellence
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                Saksham Fashion Zone was born from a passion for preserving and celebrating 
                the rich heritage of Indian textiles. Founded by Saksham Tolambia and 
                Praveen Kumar Tolambia, our journey began with a simple vision: to make 
                authentic, high-quality ethnic wear accessible to every woman.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                From handpicked Banarasi silks to contemporary designer pieces, every 
                item in our collection tells a story of craftsmanship, tradition, and 
                timeless elegance.
              </p>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-maroon mb-1 sm:mb-2">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-maroon mb-1 sm:mb-2">200+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Unique Designs</div>
                </div>
              </div>
            </div>
            
            <div className="bg-soft-beige rounded-lg p-4 sm:p-6">
              <blockquote className="text-base sm:text-lg italic text-text-dark text-center">
                "Fashion is not just about clothing; it's about expressing your 
                inner beauty and celebrating your heritage with pride."
              </blockquote>
              <div className="text-center mt-3 sm:mt-4">
                <div className="font-semibold text-primary-maroon">- Saksham & Praveen</div>
                <div className="text-xs sm:text-sm text-gray-600">Founders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-soft-beige">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-text-dark mb-6 sm:mb-8">
            Why Choose Us
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-maroon rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Authentic Quality</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Handpicked fabrics and authentic designs sourced directly from artisans
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-maroon rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Expert Curation</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Every piece is carefully selected by our fashion experts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-maroon rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Personal Service</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Dedicated styling assistance and personalized recommendations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-maroon rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Customer First</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Your satisfaction is our priority with easy returns and exchanges
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;