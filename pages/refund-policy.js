import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { RotateCcw, CheckCircle, XCircle, Phone, MessageCircle } from 'lucide-react';

const RefundPolicy = () => {
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={getCartCount()} />
      
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <RotateCcw className="w-16 h-16 mx-auto mb-4 text-green-200" />
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-xl opacity-90">Easy returns for your peace of mind</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-sm text-gray-500 mb-8 text-center">
            Last updated: February 1, 2024
          </div>
          
          <div className="space-y-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
              <h2 className="text-2xl font-bold text-green-800 mb-4">7-Day Return Window</h2>
              <p className="text-green-700 leading-relaxed">
                You have 7 days from the date of delivery to return items for a full refund, provided they are in original condition with tags attached.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-green-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-text-dark">Eligible Items</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Sarees and blouses in original condition</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Items with original tags and packaging</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Unworn and unwashed items</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-red-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <XCircle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-text-dark">Non-Returnable Items</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Custom-tailored or altered items</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Items worn or damaged by customer</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Items without original tags</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Refund Process</h3>
              <p className="text-blue-700 leading-relaxed mb-4">
                Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds will be issued to the original payment method.
              </p>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Processing Time:</span>
                  <span className="text-blue-600 font-medium">5-7 Business Days</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary-maroon to-deep-maroon rounded-xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">Contact for Returns</h3>
              <p className="mb-4 opacity-90">To initiate a return, please contact us:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="tel:9588253490"
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center hover:bg-white/30 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-sm opacity-90">9588253490</div>
                  </div>
                </a>
                <a 
                  href="https://wa.me/919588253490?text=Hi! I want to return an item"
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center hover:bg-white/30 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm opacity-90">Quick Support</div>
                  </div>
                </a>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <strong>Visit our store:</strong> Merta Road, Sadar Bazar, Rajasthan
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;