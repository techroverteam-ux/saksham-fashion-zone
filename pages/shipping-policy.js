import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const ShippingPolicy = () => {
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={getCartCount()} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-dark mb-6">Shipping Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: February 1, 2024</p>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-text-dark mb-3">Delivery Areas</h2>
            <p>We currently provide delivery services within Rajasthan and nearby areas. For specific location availability, please contact us.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-text-dark mb-3">Shipping Charges</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free delivery within city limits</li>
              <li>Nominal charges may apply for distant locations</li>
              <li>Special inauguration offer: Free delivery on all orders</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-text-dark mb-3">Delivery Time</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Same day delivery within city (subject to availability)</li>
              <li>1-2 business days for nearby areas</li>
              <li>2-5 business days for distant locations</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-text-dark mb-3">Order Processing</h2>
            <p>Orders are processed within 24 hours of confirmation. You will receive a call to confirm your order details and delivery address.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-text-dark mb-3">Delivery Process</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Our team will call before delivery</li>
              <li>Cash on delivery available</li>
              <li>Please ensure someone is available to receive the order</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-text-dark mb-3">Contact for Delivery</h2>
            <div className="mt-2">
              <p>Phone: 9588253490, 9252064591</p>
              <p>WhatsApp: 9588253490</p>
              <p>Store: Merta Road, Sadar Bazar, Rajasthan</p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;