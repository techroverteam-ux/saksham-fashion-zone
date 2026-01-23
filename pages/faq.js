import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const FAQ = () => {
  const { getCartCount } = useCart();

  const faqs = [
    {
      question: "What are your store hours?",
      answer: "We are open Monday-Saturday: 10:00 AM - 8:00 PM, Sunday: 11:00 AM - 7:00 PM. On inauguration day, we're open 9:00 AM - 9:00 PM."
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes, we provide free home delivery within city limits. For distant locations, nominal charges may apply."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash on delivery, UPI payments, and digital wallets. Payment can be made at the time of delivery."
    },
    {
      question: "Can I return or exchange items?",
      answer: "Yes, you can return items within 7 days of delivery if they are in original condition with tags attached."
    },
    {
      question: "Do you offer combo discounts?",
      answer: "Yes! When you buy any saree with a matching blouse, you get an extra 5% discount automatically applied."
    },
    {
      question: "How can I place an order?",
      answer: "You can visit our store, call us at 9588253490, or message us on WhatsApp to place your order."
    },
    {
      question: "Do you have custom tailoring services?",
      answer: "Yes, we offer custom tailoring and alterations. Please visit our store for measurements and consultation."
    },
    {
      question: "What fabrics do you specialize in?",
      answer: "We specialize in pure silk sarees, Banarasi silk, cotton sarees, georgette, and designer blouses with premium fabrics."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={getCartCount()} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-dark mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to common questions about our products and services.</p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="card p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-text-dark mb-3">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-soft-beige rounded-lg">
          <h3 className="text-xl font-semibold text-text-dark mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-4">We're here to help! Contact us for any additional questions.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:9588253490" className="btn-primary flex items-center justify-center">
              Call: 9588253490
            </a>
            <a 
              href="https://wa.me/919588253490?text=Hi! I have a question"
              className="btn-gold flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;