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
  const [catBgIndex, setCatBgIndex] = useState(0);
  const [tick, setTick] = useState(false);

  const catBgGradients = [
    'linear-gradient(135deg, #f8f0ff 0%, #e8d5f5 50%, #f0e6ff 100%)',
    'linear-gradient(135deg, #fff0f5 0%, #ffd6e7 50%, #ffe8f0 100%)',
    'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 50%, #e6ffed 100%)',
    'linear-gradient(135deg, #fffbf0 0%, #fef3c7 50%, #fff8e1 100%)',
    'linear-gradient(135deg, #f0f4ff 0%, #dbeafe 50%, #e8f0ff 100%)',
  ];

  const catBg = catBgGradients[catBgIndex];

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

  useEffect(() => {
    const catTimer = setInterval(() => {
      setCatBgIndex(i => (i + 1) % 5);
    }, 2500);
    return () => clearInterval(catTimer);
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
      name: "Royal Banarasi Silk Saree",
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.26.jpeg",
      originalPrice: 12999,
      flashPrice: 7799,
      timeLeft: "2h 30m",
      sold: 45,
      total: 100,
      savings: 5200
    },
    {
      id: 2,
      name: "Embroidered Silk Blouse",
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.29 (2).jpeg",
      originalPrice: 4999,
      flashPrice: 2999,
      timeLeft: "1h 45m",
      sold: 78,
      total: 150,
      savings: 2000
    },
    {
      id: 3,
      name: "Bridal Lehenga Set",
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.28.jpeg",
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
                
                <div className="relative overflow-hidden h-64">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/8B0000/FFFFFF?text=' + encodeURIComponent(deal.name); }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
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
      <section className="py-20 relative overflow-hidden" style={{ background: catBg, transition: 'background 1.5s ease-in-out' }}>
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
              <div
                key={index}
                className="group cursor-pointer"
                style={{ animation: `fadeUp 0.5s ease both`, animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{ transition: 'transform 0.35s cubic-bezier(.4,2,.6,1), box-shadow 0.35s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = ''; }}
                >
                  <div className={`h-64 bg-gradient-to-br ${category.color} flex items-center justify-center text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    {/* Shimmer sweep on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    {/* Rotating ring */}
                    <div
                      className="absolute inset-0 rounded-2xl border-4 border-white/0 group-hover:border-white/30 transition-all duration-500"
                      style={{ transform: 'scale(0.95)', transition: 'all 0.4s ease' }}
                    ></div>
                    <div className="relative z-10 text-center p-6">
                      <div
                        className="inline-block badge bg-white/20 text-white mb-4 group-hover:bg-white/40 transition-colors duration-300"
                      >
                        {category.badge}
                      </div>
                      <h3
                        className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300 inline-block"
                      >
                        {category.category}
                      </h3>
                      <div
                        className="text-5xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                      >
                        {category.discount}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-bold group-hover:bg-yellow-300 group-hover:scale-110 transition-all duration-300 inline-block"
                      >
                        {category.discount}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-6 group-hover:bg-gray-50 transition-colors duration-300">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Original:</span>
                        <span className="text-sm line-through text-gray-500">{category.originalPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Today's Price:</span>
                        <span className="text-xl font-bold text-primary-maroon group-hover:scale-105 transition-transform duration-300 inline-block">{category.discountedPrice}</span>
                      </div>
                    </div>

                    <Link
                      href="/products"
                      className="btn-primary w-full mt-6 text-center block relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Shop Now →</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & CTA */}
      <section className="py-12 sm:py-16 relative overflow-hidden" style={{ animation: 'ctaBg 6s ease-in-out infinite' }}>
        {/* Floating orbs */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-30 float-animation" style={{ background: 'linear-gradient(135deg,#f093fb,#f5576c)', animationDelay: '0s' }} />
        <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-25 float-animation" style={{ background: 'linear-gradient(135deg,#4facfe,#00f2fe)', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-36 h-36 rounded-full blur-2xl opacity-20 float-animation" style={{ background: 'linear-gradient(135deg,#43e97b,#38f9d7)', animationDelay: '4s' }} />

        {/* Sparkle dots */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full animate-ping"
            style={{
              background: ['#8B0000','#D69E2E','#38A169','#3182CE','#805AD5','#f7971e'][i % 6],
              top: `${8 + i * 7.5}%`, left: `${5 + i * 8}%`,
              animationDelay: `${i * 0.35}s`, animationDuration: '2.5s', opacity: 0.55
            }}
          />
        ))}

        {/* Floating stars */}
        {[...Array(6)].map((_, i) => (
          <div key={`s-${i}`} className="absolute opacity-30 pointer-events-none select-none"
            style={{ top: `${10 + i * 15}%`, right: `${6 + i * 14}%`, animation: 'float 4s ease-in-out infinite', animationDelay: `${i * 0.6}s`, fontSize: ['16px','20px','14px'][i % 3] }}
          >✨</div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
            style={{ animation: 'ctaHeading 0.8s ease both', background: 'linear-gradient(90deg,#8B0000,#D69E2E,#8B0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%', animationName: 'ctaHeading, shimmerText', animationDuration: '0.8s, 3s', animationTimingFunction: 'ease, linear', animationFillMode: 'both, none', animationIterationCount: '1, infinite' }}
          >
            Don't Miss Out on These Amazing Deals!
          </h2>

          <p
            className="text-lg sm:text-xl text-gray-700 font-medium mb-8 sm:mb-10 max-w-3xl mx-auto"
            style={{ animation: 'fadeUp 0.9s ease both', animationDelay: '0.2s' }}
          >
            Visit our store today and be part of our{' '}
            <span style={{ background: 'linear-gradient(90deg,#8B0000,#D69E2E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>grand inauguration celebration</span>
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-10"
            style={{ animation: 'fadeUp 0.9s ease both', animationDelay: '0.35s' }}
          >
            <Link
              href="/contact"
              className="relative overflow-hidden group px-10 py-4 rounded-xl font-bold text-lg sm:text-xl text-white transition-all duration-300"
              style={{ background: 'linear-gradient(135deg,#8B0000,#5C0000)', boxShadow: '0 6px 20px rgba(139,0,0,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(139,0,0,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,0,0,0.4)'; }}
            >
              <span className="relative z-10">🏪 Visit Store Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
            </Link>
            <a
              href="tel:9588253490"
              className="relative overflow-hidden group px-10 py-4 rounded-xl font-bold text-lg sm:text-xl transition-all duration-300"
              style={{ background: 'white', color: '#1a1a1a', border: '2px solid #1a1a1a', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#f7971e,#ffd200)'; e.currentTarget.style.border = '2px solid transparent'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(255,210,0,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.border = '2px solid #1a1a1a'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'; }}
            >
              <span className="relative z-10">📞 Call: 9588253490</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
            </a>
          </div>

          <div
            className="bg-white/60 backdrop-blur-md rounded-2xl p-5 sm:p-7 max-w-4xl mx-auto border border-white/80 shadow-xl"
            style={{ animation: 'fadeUp 0.9s ease both', animationDelay: '0.5s' }}
          >
            <h3
              className="text-lg sm:text-xl font-bold mb-5 text-gray-900"
              style={{ background: 'linear-gradient(90deg,#8B0000,#D69E2E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              ⚠️ Important Terms:
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-left">
              {[
                { text: 'All offers valid only on 1st February 2024', color: '#E53E3E' },
                { text: 'Combo offers auto-applied when conditions met', color: '#D69E2E' },
                { text: 'Flash deals subject to stock availability', color: '#38A169' },
                { text: 'Free delivery within city limits', color: '#3182CE' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 cursor-default"
                  style={{ animation: 'fadeUp 0.5s ease both', animationDelay: `${0.55 + i * 0.1}s` }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${item.color}15`; e.currentTarget.style.transform = 'translateX(6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.transform = ''; }}
                >
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                  <span className="text-gray-800 font-medium text-sm sm:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes ctaBg {
            0%   { background: linear-gradient(135deg,#fef9f0,#fff8e1,#fffef7); }
            20%  { background: linear-gradient(135deg,#f0fff4,#e6ffed,#f5fff8); }
            40%  { background: linear-gradient(135deg,#f0f4ff,#e8f0ff,#f5f8ff); }
            60%  { background: linear-gradient(135deg,#fff0f5,#ffe4f0,#fff5fb); }
            80%  { background: linear-gradient(135deg,#fdf0ff,#f5e6ff,#faf0ff); }
            100% { background: linear-gradient(135deg,#fef9f0,#fff8e1,#fffef7); }
          }
          @keyframes ctaHeading {
            from { opacity:0; transform:translateY(-25px) scale(0.95); }
            to   { opacity:1; transform:translateY(0) scale(1); }
          }
        `}</style>
      </section>
      
      <Footer />
    </div>
  );
};

export default InaugurationSpecial;