import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Gift, Star, Sparkles, Tag, Zap, MessageCircle, Timer } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const bgGradients = [
  'linear-gradient(135deg, #8B0000 0%, #4a0000 50%, #8B0000 100%)',
  'linear-gradient(135deg, #6B0000 0%, #B8860B 50%, #6B0000 100%)',
  'linear-gradient(135deg, #4a0000 0%, #7B0000 40%, #B8860B 100%)',
  'linear-gradient(135deg, #2d0000 0%, #8B0000 50%, #DAA520 100%)',
  'linear-gradient(135deg, #8B0000 0%, #5C0000 30%, #8B4513 100%)',
];

const InaugurationSpecial = () => {
  const { getCartCount } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [bgIndex, setBgIndex] = useState(0);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2024-02-01T23:59:59').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
      setTick(t => !t);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex(i => (i + 1) % bgGradients.length);
    }, 3000);
    return () => clearInterval(bgTimer);
  }, []);

  const mainOffers = [
    {
      id: 1,
      title: "Flat 15% OFF",
      subtitle: "On All Products",
      description: "Get flat 15% discount on entire collection",
      code: "INAUG15",
      icon: <Tag className="w-10 h-10" />,
      color: "from-primary-maroon to-deep-maroon",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Extra 5% OFF",
      subtitle: "Combo Purchase",
      description: "Additional 5% off when you buy Saree + Blouse",
      code: "COMBO5",
      icon: <Gift className="w-10 h-10" />,
      color: "from-royal-gold to-accent-gold",
      textColor: "text-text-dark"
    },
    {
      id: 3,
      title: "Buy 2 Get 1",
      subtitle: "Blouse Collection",
      description: "Buy any 2 blouses and get 1 free",
      code: "B2G1",
      icon: <Sparkles className="w-10 h-10" />,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Free Delivery",
      subtitle: "No Minimum Order",
      description: "Free home delivery on all orders today",
      code: "FREEDEL",
      icon: <Zap className="w-10 h-10" />,
      color: "from-purple-500 to-indigo-600",
      textColor: "text-white"
    }
  ];

  const categoryOffers = [
    {
      category: "Silk Sarees",
      discount: "20% OFF",
      originalPrice: "₹8,000 - ₹25,000",
      discountedPrice: "₹6,400 - ₹20,000",
      badge: "Premium Collection",
      color: "from-rose-500 to-pink-600"
    },
    {
      category: "Designer Blouses",
      discount: "25% OFF",
      originalPrice: "₹2,000 - ₹8,000",
      discountedPrice: "₹1,500 - ₹6,000",
      badge: "Trending",
      color: "from-blue-500 to-cyan-600"
    },
    {
      category: "Bridal Lehengas",
      discount: "30% OFF",
      originalPrice: "₹15,000 - ₹50,000",
      discountedPrice: "₹10,500 - ₹35,000",
      badge: "Wedding Special",
      color: "from-violet-500 to-purple-600"
    },
    {
      category: "Cotton Sarees",
      discount: "15% OFF",
      originalPrice: "₹1,500 - ₹5,000",
      discountedPrice: "₹1,275 - ₹4,250",
      badge: "Everyday Wear",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const flashDeals = [
    {
      id: 1,
      name: "Banarasi Silk Saree",
      originalPrice: 12999,
      flashPrice: 7799,
      timeLeft: "2h 30m",
      sold: 45,
      total: 100,
      savings: 5200
    },
    {
      id: 2,
      name: "Embroidered Blouse Set",
      originalPrice: 4999,
      flashPrice: 2999,
      timeLeft: "1h 45m",
      sold: 78,
      total: 150,
      savings: 2000
    },
    {
      id: 3,
      name: "Designer Lehenga",
      originalPrice: 18999,
      flashPrice: 11399,
      timeLeft: "3h 15m",
      sold: 23,
      total: 50,
      savings: 7600
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/919588253490?text=Hi! I want to know about inauguration offers"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Mobile Sticky CTA */}
      <div className="mobile-cta">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">🎉 Limited Time Offers!</div>
            <div className="text-sm opacity-90">Don't miss out on these deals</div>
          </div>
          <a 
            href="https://wa.me/919588253490"
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold"
          >
            Grab Now
          </a>
        </div>
      </div>

      {/* Header */}
      <Header cartCount={getCartCount()} />

      {/* Hero Banner */}
      <section
        className="relative text-white py-12 sm:py-20 overflow-hidden"
        style={{
          background: bgGradients[bgIndex],
          transition: 'background 1.5s ease-in-out'
        }}
      >
        {/* Animated fabric texture */}
        <div className="absolute inset-0 fabric-texture opacity-20"></div>

        {/* Animated floating orbs */}
        <div className="absolute top-8 left-8 w-24 h-24 bg-royal-gold/30 rounded-full blur-2xl float-animation"></div>
        <div className="absolute top-1/2 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl float-animation" style={{animationDelay:'0.8s'}}></div>
        <div className="absolute bottom-12 right-12 w-36 h-36 bg-royal-gold/20 rounded-full blur-3xl float-animation" style={{animationDelay:'1.5s'}}></div>
        <div className="absolute top-16 right-1/4 w-12 h-12 bg-white/10 rounded-full blur-lg float-animation" style={{animationDelay:'2s'}}></div>
        <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-royal-gold/15 rounded-full blur-2xl float-animation" style={{animationDelay:'0.4s'}}></div>

        {/* Sparkle particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-royal-gold rounded-full animate-ping"
            style={{
              top: `${10 + i * 11}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: '2s',
              opacity: 0.6
            }}
          />
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Badge with shimmer */}
          <div
            className="inline-flex items-center badge badge-gold mb-6 text-sm sm:text-base px-5 py-2 gold-shimmer"
            style={{ animation: 'badgePop 0.6s cubic-bezier(.4,2,.6,1)' }}
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            1st February 2024 - Inauguration Day Only
          </div>

          {/* Heading with letter animation */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span
              className="block"
              style={{ animation: 'slideDown 0.7s ease both' }}
            >
              Grand Opening
            </span>
            <span
              className="block text-royal-gold"
              style={{
                animation: 'slideDown 0.9s ease both',
                textShadow: '0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3)'
              }}
            >
              Offers ✨
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ animation: 'fadeUp 1s ease both', animationDelay: '0.3s' }}
          >
            Celebrate with us and enjoy{' '}
            <span className="text-royal-gold font-bold" style={{ textShadow: '0 0 15px rgba(255,215,0,0.5)' }}>
              exclusive discounts
            </span>{' '}
            available only today!
          </p>

          {/* Countdown Timer */}
          <div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-8 max-w-lg mx-auto mb-10 border border-royal-gold/40 shadow-2xl"
            style={{ animation: 'fadeUp 1s ease both', animationDelay: '0.5s' }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-5 text-royal-gold tracking-widest uppercase">⏳ Offers End In</h3>
            <div className="flex justify-center gap-4 sm:gap-8">
              {[{val: timeLeft.hours, label:'Hours'}, {val: timeLeft.minutes, label:'Minutes'}, {val: timeLeft.seconds, label:'Seconds'}].map(({val, label}, i) => (
                <div key={label} className="text-center">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 border-2 border-royal-gold/50 rounded-xl flex items-center justify-center mb-2 shadow-lg"
                    style={{
                      transform: tick && label === 'Seconds' ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.15s ease',
                      boxShadow: '0 0 15px rgba(255,215,0,0.2)'
                    }}
                  >
                    <span className="text-2xl sm:text-3xl font-bold font-playfair">
                      {String(val).padStart(2,'0')}
                    </span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-royal-gold/80">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="text-lg sm:text-xl font-bold text-royal-gold"
            style={{
              animation: 'pulse 1.5s ease-in-out infinite',
              textShadow: '0 0 20px rgba(255,215,0,0.5)'
            }}
          >
            🔥 Limited Time Only - Don't Miss Out!
          </div>
        </div>

        <style>{`
          @keyframes slideDown { from { opacity:0; transform:translateY(-30px) } to { opacity:1; transform:translateY(0) } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
          @keyframes badgePop { from { opacity:0; transform:scale(0.5) } to { opacity:1; transform:scale(1) } }
        `}</style>
      </section>

      {/* Main Offers Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-dark mb-4 sm:mb-6">
              Inauguration Special Offers
            </h2>
            <div className="luxury-divider"></div>
            <p className="text-base sm:text-lg text-gray-600">
              Exclusive deals crafted just for our grand opening
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {mainOffers.map((offer) => (
              <div key={offer.id} className="offer-card group">
                <div className={`bg-gradient-to-br ${offer.color} rounded-2xl p-4 sm:p-6 text-center shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden`}>
                  <div className={`${offer.textColor} mb-4 flex justify-center`}>
                    {offer.icon}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${offer.textColor} mb-2`}>
                    {offer.title}
                  </h3>
                  <p className={`text-base sm:text-lg ${offer.textColor} mb-3 opacity-90`}>
                    {offer.subtitle}
                  </p>
                  <p className={`text-xs sm:text-sm ${offer.textColor} mb-4 opacity-80`}>
                    {offer.description}
                  </p>
                  <div className={`bg-white/20 backdrop-blur-sm rounded-xl p-3 ${offer.textColor}`}>
                    <div className="text-xs font-bold uppercase tracking-wider">Use Code:</div>
                    <div className="text-lg sm:text-xl font-bold">{offer.code}</div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-20 bg-gradient-to-br from-soft-beige to-ivory-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              ⚡ Flash Deals - Limited Stock
            </h2>
            <div className="luxury-divider"></div>
            <p className="text-xl text-gray-600">
              Grab these exclusive deals before they're gone!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {flashDeals.map((deal) => (
              <div key={deal.id} className="product-card">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1 animate-pulse">
                    <Timer className="w-4 h-4" />
                    {deal.timeLeft}
                  </div>
                </div>
                
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-medium silk-flow">
                  {deal.name}
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-text-dark">{deal.name}</h3>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-primary-maroon">
                      ₹{deal.flashPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{deal.originalPrice.toLocaleString()}
                    </span>
                    <span className="badge badge-offer">
                      {Math.round(((deal.originalPrice - deal.flashPrice) / deal.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  
                  <div className="text-green-600 font-bold text-lg">
                    You Save ₹{deal.savings.toLocaleString()}
                  </div>
                  
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>Sold: {deal.sold}/{deal.total}</span>
                      <span>{Math.round((deal.sold / deal.total) * 100)}% claimed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-primary-maroon to-deep-maroon h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                        style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn-primary flex-1">
                      Grab Deal Now
                    </button>
                    <a 
                      href={`https://wa.me/919588253490?text=Hi! I want the flash deal for ${deal.name}`}
                      className="btn-gold px-4 flex items-center justify-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Offers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Category-wise Special Discounts
            </h2>
            <div className="luxury-divider"></div>
            <p className="text-xl text-gray-600">
              Tailored offers for every style and occasion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryOffers.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className={`h-64 bg-gradient-to-br ${category.color} flex items-center justify-center text-white relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center p-6">
                      <div className="badge bg-white/20 text-white mb-4">{category.badge}</div>
                      <h3 className="text-2xl font-bold mb-2">{category.category}</h3>
                      <div className="text-4xl font-bold mb-2">{category.discount}</div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                        {category.discount}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Original:</span>
                        <span className="text-sm line-through text-gray-500">{category.originalPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Today's Price:</span>
                        <span className="text-xl font-bold text-primary-maroon">{category.discountedPrice}</span>
                      </div>
                    </div>
                    
                    <button className="btn-primary w-full mt-6 group-hover:scale-105 transition-transform">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-royal-gold to-accent-gold">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-dark mb-6 sm:mb-8">
            Don't Miss Out on These Amazing Deals!
          </h2>
          <p className="text-lg sm:text-xl text-text-dark mb-8 sm:mb-12 max-w-3xl mx-auto">
            Visit our store today and be part of our grand inauguration celebration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
            <Link href="/contact" className="btn-primary text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-5">
              Visit Store Now
            </Link>
            <a 
              href="tel:9588253490"
              className="bg-white text-text-dark border-2 border-text-dark hover:bg-text-dark hover:text-white transition-all text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-5 rounded-xl font-bold"
            >
              Call: 9588253490
            </a>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-lg sm:text-xl font-bold text-text-dark mb-4 sm:mb-6">Important Terms:</h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-text-dark text-left text-sm sm:text-base">
              <div className="flex items-start gap-2 sm:gap-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>All offers valid only on 1st February 2024</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>Combo offers auto-applied when conditions met</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>Flash deals subject to stock availability</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>Free delivery within city limits</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default InaugurationSpecial;