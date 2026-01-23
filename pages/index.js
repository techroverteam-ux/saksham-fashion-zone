import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Phone, Star, Gift, Clock, Menu, X, Shield, Award, Heart, MessageCircle, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import { HeroSkeleton, CollectionsSkeleton, ProductsSkeleton, ErrorBoundary } from '../components/LoadingComponents';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import UniqueCarousel from '../components/UniqueCarousel';
import MarketingTags from '../components/MarketingTags';
import MarketingBanner from '../components/MarketingBanner';
import UserAuth from '../components/UserAuth';

const HomePage = () => {
  const { getCartCount, addToCart } = useCart();
  const { user, setShowAuth, setAuthMode } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showUserAuth, setShowUserAuth] = useState(false);
  const [userAuthMode, setUserAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isInaugurationOver, setIsInaugurationOver] = useState(false);

  const handleAuthClick = (mode) => {
    setUserAuthMode(mode);
    setShowUserAuth(true);
  };
  
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setShowUserAuth(false);
  };
  
  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('current-user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2024-02-01T23:59:59').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setIsInaugurationOver(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const trustBadges = [
    { icon: <Shield className="w-8 h-8 text-primary-maroon" />, title: "100% Authentic", desc: "Genuine fabrics & designs" },
    { icon: <Award className="w-8 h-8 text-primary-maroon" />, title: "Premium Quality", desc: "Handpicked collections" },
    { icon: <Heart className="w-8 h-8 text-primary-maroon" />, title: "Fair Pricing", desc: "Best value guaranteed" }
  ];

  const featuredCategories = [
    {
      title: "Wedding Elegance",
      subtitle: "Bridal Perfection",
      description: "Exquisite sarees for your special day",
      image: "/images/wedding-category.jpg",
      color: "from-rose-500 to-pink-600"
    },
    {
      title: "Festive Royalty", 
      subtitle: "Celebration Ready",
      description: "Traditional wear for festivals",
      image: "/images/festive-category.jpg",
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Everyday Grace",
      subtitle: "Daily Elegance", 
      description: "Comfortable yet stylish options",
      image: "/images/casual-category.jpg",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Royal Banarasi Silk Saree",
      originalPrice: 12999,
      discountedPrice: 9749,
      image: "/images/saree-1.jpg",
      badges: ["Inauguration Special", "Bestseller"],
      fabric: "Pure Silk",
      occasion: "Wedding",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: "Designer Embroidered Blouse",
      originalPrice: 3999,
      discountedPrice: 2999,
      image: "/images/blouse-1.jpg", 
      badges: ["New Arrival", "Hot Deal"],
      fabric: "Silk Blend",
      occasion: "Party",
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: "Bridal Lehenga Set",
      originalPrice: 25999,
      discountedPrice: 18199,
      image: "/images/lehenga-1.jpg",
      badges: ["Limited Edition", "Premium"], 
      fabric: "Heavy Silk",
      occasion: "Bridal",
      rating: 4.9,
      reviews: 234
    },
    {
      id: 4,
      name: "Festive Cotton Saree",
      originalPrice: 4999,
      discountedPrice: 3499,
      image: "/images/saree-2.jpg",
      badges: ["Customer Favorite"],
      fabric: "Cotton",
      occasion: "Festival",
      rating: 4.7,
      reviews: 145
    },
    {
      id: 5,
      name: "Party Wear Blouse",
      originalPrice: 2999,
      discountedPrice: 2199,
      image: "/images/blouse-2.jpg",
      badges: ["New Arrival"],
      fabric: "Georgette",
      occasion: "Party",
      rating: 4.5,
      reviews: 98
    }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative">
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919588253490?text=Hi! I'm interested in your saree collection"
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
              <div className="font-semibold">Grand Inauguration Offers!</div>
              <div className="text-sm opacity-90">Up to 25% OFF + Combo Deals</div>
            </div>
            <a 
              href="https://wa.me/919588253490"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold"
            >
              Chat Now
            </a>
          </div>
        </div>

        {/* Marketing Banner */}
        <MarketingBanner />

        {/* Header */}
        <Header cartCount={getCartCount()} />

        {loading ? (
          <>
            <HeroSkeleton />
            <CollectionsSkeleton />
            <ProductsSkeleton />
          </>
        ) : (
          <>

      {/* Hero Banner */}
      <section className="relative h-screen bg-gradient-to-br from-primary-maroon via-deep-maroon to-primary-maroon text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 fabric-texture opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center w-full max-w-6xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              <span className="text-green-100 font-semibold text-sm sm:text-base">We're Open! Grand Inauguration Complete</span>
            </div>
            
            {/* Main Content */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="block text-royal-gold shimmer">Saksham</span>
              <span className="block">Fashion Zone</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 text-royal-gold font-light">
              Where Elegance Meets Tradition
            </p>
            
            <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto px-4">
              Experience the finest collection of Sarees & Blouses with authentic craftsmanship
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
              <Link href="/products" className="hero-btn-primary group w-full sm:w-auto">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform" />
                <span>Explore Collection</span>
                <div className="btn-shine"></div>
              </Link>
              <Link href="/contact" className="hero-btn-secondary group w-full sm:w-auto">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:bounce transition-transform" />
                <span>Visit Store</span>
                <div className="btn-shine"></div>
              </Link>
            </div>
            
            {/* Offer Banner */}
            <div className="inline-flex items-center bg-royal-gold/20 backdrop-blur-md rounded-full px-4 sm:px-8 py-3 sm:py-4 border border-royal-gold/30 mx-4">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-royal-gold animate-pulse" />
              <span className="text-sm sm:text-lg font-semibold text-center">
                Special Offer: Buy Saree + Blouse & Get Extra 5% OFF
              </span>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-royal-gold/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-royal-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-soft-beige/50 via-white to-soft-beige/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="trust-badge text-center">
                <div className="mb-4">{badge.icon}</div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">{badge.title}</h3>
                <p className="text-gray-600">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-4">
              Our Collections
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-maroon to-royal-gold mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our extensive range of traditional and contemporary wear
            </p>
          </div>
          
          {/* Main Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group cursor-pointer" onClick={() => currentUser ? null : handleAuthClick('register')}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="h-64 bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center p-6">
                    <h3 className="text-2xl font-bold mb-2">Sarees</h3>
                    <p className="text-white/90 mb-4">Traditional & Designer</p>
                    <div className="text-sm opacity-80">
                      Banarasi • Silk • Cotton • Georgette
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer" onClick={() => currentUser ? null : handleAuthClick('register')}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="h-64 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center p-6">
                    <h3 className="text-2xl font-bold mb-2">Blouses</h3>
                    <p className="text-white/90 mb-4">Designer & Traditional</p>
                    <div className="text-sm opacity-80">
                      Embroidered • Silk • Cotton • Party Wear
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer" onClick={() => currentUser ? null : handleAuthClick('register')}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="h-64 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center p-6">
                    <h3 className="text-2xl font-bold mb-2">Lehengas</h3>
                    <p className="text-white/90 mb-4">Bridal & Party</p>
                    <div className="text-sm opacity-80">
                      Heavy Silk • Designer • Bridal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sub Categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Banarasi Sarees', count: '50+' },
              { name: 'Silk Blouses', count: '30+' },
              { name: 'Cotton Sarees', count: '40+' },
              { name: 'Party Wear', count: '25+' },
              { name: 'Bridal Collection', count: '20+' },
              { name: 'Festive Wear', count: '35+' },
              { name: 'Casual Wear', count: '45+' },
              { name: 'Designer Pieces', count: '15+' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-soft-beige rounded-xl p-4 text-center hover:bg-primary-maroon/10 transition-colors cursor-pointer"
                onClick={() => currentUser ? null : handleAuthClick('register')}
              >
                <h4 className="font-semibold text-text-dark mb-1">{item.name}</h4>
                <p className="text-sm text-primary-maroon font-medium">{item.count} Items</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="bg-royal-gold/10 border border-royal-gold/30 rounded-xl p-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-primary-maroon mb-2">
                {currentUser ? `Welcome, ${currentUser.name}!` : 'Sign Up to Explore'}
              </h3>
              <p className="text-gray-600 mb-4">
                {currentUser ? 'Browse our full collection' : 'Create an account to browse our full collection'}
              </p>
              {currentUser ? (
                <Link href="/products" className="bg-primary-maroon text-white px-6 py-3 rounded-lg font-semibold hover:bg-deep-maroon transition-colors">
                  Browse Products
                </Link>
              ) : (
                <button 
                  onClick={() => handleAuthClick('register')}
                  className="bg-primary-maroon text-white px-6 py-3 rounded-lg font-semibold hover:bg-deep-maroon transition-colors"
                >
                  Sign Up Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Carousels */}
      <section className="py-16 bg-gradient-to-br from-soft-beige/30 to-ivory-white">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <UniqueCarousel products={featuredProducts} title="✨ Trending Now" />
          
          <div className="grid md:grid-cols-2 gap-8">
            <UniqueCarousel 
              products={featuredProducts.filter(p => p.badges?.includes('Bestseller'))} 
              title="🏆 Bestsellers" 
            />
            <UniqueCarousel 
              products={featuredProducts.filter(p => p.badges?.includes('New Arrival'))} 
              title="🆕 New Arrivals" 
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Handpicked for You
            </h2>
            <div className="luxury-divider"></div>
            <p className="text-xl text-gray-600">
              Curated pieces that define elegance and tradition
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="relative">
                  <div className="h-80 bg-gray-200 silk-flow flex items-center justify-center text-gray-500">
                    Product Image
                  </div>
                  
                  {/* Enhanced Badges */}
                  <div className="absolute top-4 left-4">
                    <MarketingTags badges={product.badges} />
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold glow-maroon">
                      {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="space-y-3">
                      <button className="btn-gold w-full">Quick View</button>
                      <button className="btn-primary w-full">Add to Cart</button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-text-dark group-hover:text-primary-maroon transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-royal-gold text-royal-gold" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Fabric: {product.fabric}</span>
                    <span>Occasion: {product.occasion}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary-maroon">
                      ₹{product.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="text-green-600 font-semibold">
                    You Save ₹{(product.originalPrice - product.discountedPrice).toLocaleString()}
                  </div>
                  
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      discountedPrice: product.discountedPrice,
                      originalPrice: product.originalPrice,
                      fabric: product.fabric,
                      occasion: product.occasion,
                      category: product.name.includes('Saree') ? 'Sarees' : 'Blouses'
                    })}
                    className="btn-primary w-full"
                  >
                    Add to Package
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" className="btn-gold text-lg px-8 py-4">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Combo Packages */}
      <section className="py-20 bg-gradient-to-br from-royal-gold/10 to-accent-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Special Combo Packages
            </h2>
            <div className="luxury-divider"></div>
            <p className="text-xl text-gray-600">
              Mix & Match for Maximum Savings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="combo-card">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-maroon mb-4">
                  Saree + Blouse Combo
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose any saree with matching blouse and save more
                </p>
                <div className="text-4xl font-bold text-primary-maroon mb-6">
                  Extra 5% OFF
                </div>
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Saree Price:</span>
                    <span>₹8,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blouse Price:</span>
                    <span>₹3,000</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Combo Discount:</span>
                    <span>-₹550</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold text-primary-maroon">
                    <span>Total:</span>
                    <span>₹10,450</span>
                  </div>
                </div>
                <Link href="/products" className="btn-primary w-full">
                  Explore Combos
                </Link>
              </div>
            </div>
            
            <div className="combo-card">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-maroon mb-4">
                  Bridal Special Package
                </h3>
                <p className="text-gray-600 mb-6">
                  Complete bridal collection with accessories
                </p>
                <div className="text-4xl font-bold text-primary-maroon mb-6">
                  Up to 25% OFF
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div>Premium Bridal Saree</div>
                  <div>Designer Blouse</div>
                  <div>Matching Accessories</div>
                  <div>Free Styling Consultation</div>
                </div>
                <Link href="/products" className="btn-primary w-full">
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">
                Visit Our Store
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-primary-maroon mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Store Address</h3>
                    <p className="text-gray-600 text-lg">
                      Merta Road, Sadar Bazar<br />
                      Near Namdev Vashtra Bhandar<br />
                      Rajasthan, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-8 h-8 text-primary-maroon mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Contact Numbers</h3>
                    <div className="space-y-1 text-lg">
                      <p>Saksham Tolambia: <a href="tel:9588253490" className="text-primary-maroon hover:underline font-semibold">9588253490</a></p>
                      <p>Praveen Kumar: <a href="tel:9252064591" className="text-primary-maroon hover:underline font-semibold">9252064591</a></p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-primary-maroon mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Store Hours</h3>
                    <div className="text-gray-600 text-lg space-y-1">
                      <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                      <p>Sunday: 11:00 AM - 7:00 PM</p>
                      <p className="text-primary-maroon font-semibold">Inauguration Day: 9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary flex-1 text-center">
                  Get Directions
                </Link>
                <a 
                  href="https://wa.me/919588253490?text=Hi! I'd like to know more about your collection"
                  className="btn-gold flex-1 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-soft-beige to-ivory-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-text-dark mb-6 text-center">
                Opening Day Specials
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft">
                  <Gift className="w-6 h-6 text-primary-maroon flex-shrink-0" />
                  <span className="font-medium">Flat 15% OFF on all items</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft">
                  <Gift className="w-6 h-6 text-primary-maroon flex-shrink-0" />
                  <span className="font-medium">Extra 5% on combo purchases</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft">
                  <Gift className="w-6 h-6 text-primary-maroon flex-shrink-0" />
                  <span className="font-medium">Free gift wrapping</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft">
                  <Gift className="w-6 h-6 text-primary-maroon flex-shrink-0" />
                  <span className="font-medium">Complimentary refreshments</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-maroon text-white rounded-xl text-center">
                <p className="font-semibold">Special Inauguration Gift</p>
                <p className="text-sm opacity-90">Free premium gift box with every purchase above ₹5,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Authentication Modal */}
      <UserAuth 
        isOpen={showUserAuth}
        onClose={() => setShowUserAuth(false)}
        mode={userAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-text-dark to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-royal-gold mb-4">
                Saksham Fashion Zone
              </h3>
              <p className="text-xl text-royal-gold mb-4 font-medium">
                Where Elegance Meets Tradition
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your destination for premium sarees, blouses, and traditional Indian wear. 
                We bring you the finest collection with authentic fabrics and timeless designs.
              </p>
              <div className="flex space-x-4">
                <a href="https://wa.me/919588253490" className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="tel:9588253490" className="bg-primary-maroon p-3 rounded-full hover:bg-deep-maroon transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-royal-gold">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-gray-300 hover:text-royal-gold transition-colors">Collection</Link></li>
                <li><Link href="/offers" className="text-gray-300 hover:text-royal-gold transition-colors">Special Offers</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-royal-gold transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-royal-gold transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-royal-gold">Store Info</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  Merta Road, Sadar Bazar, Near Namdev Vashtra Bhandar
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
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2024 Saksham Fashion Zone. All rights reserved.
              </p>
              <p className="text-gray-400 text-center md:text-right mt-4 md:mt-0">
                Crafted with ❤️ for Indian Fashion
              </p>
            </div>
          </div>
        </div>
      </footer>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default HomePage;