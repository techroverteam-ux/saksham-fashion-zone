import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Shield, Lock, Eye, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={getCartCount()} />
      
      <div className="bg-gradient-to-r from-primary-maroon to-deep-maroon text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-royal-gold" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Your privacy is important to us</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-sm text-gray-500 mb-8 text-center">
            Last updated: February 1, 2024
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-primary-maroon pl-6">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-primary-maroon mr-3" />
                <h2 className="text-2xl font-bold text-text-dark">Information We Collect</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, phone number, and delivery address.
              </p>
            </div>
            
            <div className="border-l-4 border-royal-gold pl-6">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-royal-gold mr-3" />
                <h2 className="text-2xl font-bold text-text-dark">How We Use Your Information</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Process and fulfill your orders</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Communicate with you about your purchases</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Provide customer support</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Send promotional communications (with your consent)</span>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h2 className="text-2xl font-bold text-text-dark mb-4">Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. Your data is secure with us.
              </p>
            </div>
            
            <div className="bg-soft-beige rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-primary-maroon mr-3" />
                <h2 className="text-2xl font-bold text-text-dark">Contact Us</h2>
              </div>
              <p className="text-gray-700 mb-4">If you have questions about this Privacy Policy, please contact us:</p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Phone:</strong> 9588253490, 9252064591</p>
                <p><strong>Address:</strong> Merta Road, Sadar Bazar, Rajasthan</p>
                <p><strong>Email:</strong> info@sakshamfashionzone.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;