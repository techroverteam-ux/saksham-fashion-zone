import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { FileText, ShoppingBag, CreditCard, Truck, AlertTriangle, Phone } from 'lucide-react';

const TermsConditions = () => {
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={getCartCount()} />
      
      <div className="bg-gradient-to-r from-primary-maroon to-deep-maroon text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-royal-gold" />
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl opacity-90">Please read these terms carefully</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-sm text-gray-500 mb-8 text-center">
            Last updated: February 1, 2024
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-primary-maroon pl-6">
              <h2 className="text-2xl font-bold text-text-dark mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Saksham Fashion Zone services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </div>
            
            <div className="bg-royal-gold/10 border border-royal-gold/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <ShoppingBag className="w-6 h-6 text-primary-maroon mr-3" />
                <h2 className="text-2xl font-bold text-primary-maroon">Product Information</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide accurate product descriptions and images. However, slight variations in color and texture may occur due to photography and screen settings. All products are subject to availability.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-primary-maroon/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary-maroon mr-3" />
                  <h3 className="text-xl font-bold text-text-dark">Pricing & Payment</h3>
                </div>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-maroon rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>All prices are in Indian Rupees (INR)</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-maroon rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>We accept cash on delivery and digital payments</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-maroon rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Prices are subject to change without notice</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-royal-gold/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Truck className="w-6 h-6 text-royal-gold mr-3" />
                  <h3 className="text-xl font-bold text-text-dark">Delivery</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We provide free delivery within city limits. Delivery times may vary based on location and product availability. We'll contact you to confirm delivery details.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-red-800">Limitation of Liability</h2>
              </div>
              <p className="text-red-700 leading-relaxed">
                Saksham Fashion Zone shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-primary-maroon to-deep-maroon rounded-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 mr-3" />
                <h2 className="text-2xl font-bold">Contact Information</h2>
              </div>
              <p className="mb-4 opacity-90">For any questions about these terms, please contact us:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-1">Phone Numbers</div>
                  <div>9588253490, 9252064591</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-1">Store Address</div>
                  <div>Merta Road, Sadar Bazar, Near Namdev Vashtra Bhandar, Rajasthan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsConditions;