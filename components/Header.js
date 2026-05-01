import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ShoppingBag, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ cartCount = 0, transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const prevCartCount = useRef(cartCount);
  const { user, setShowAuth, setAuthMode, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (cartCount !== prevCartCount.current) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
      prevCartCount.current = cartCount;
    }
  }, [cartCount]);

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Collection' },
    { href: '/offers', label: 'Offers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header style={{ transition: 'all 0.4s ease' }} className={`${
        transparent && !scrolled
          ? 'bg-transparent backdrop-blur-sm absolute top-0 left-0 right-0 z-50'
          : 'bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-royal-gold/20'
      } ${scrolled ? 'shadow-xl' : ''}`}>
      <div className={`max-w-7xl mx-auto px-4 transition-all duration-400 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-maroon to-deep-maroon rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl"
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'rotate(10deg) scale(1.12)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
              >
                <span className="text-white font-bold text-lg sm:text-xl">S</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-royal-gold rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                  <Sparkles className="w-2 h-2 text-text-dark" />
                </div>
              </div>
            </div>
            <div>
              <div className={`text-lg sm:text-xl font-bold transition-all duration-300 group-hover:tracking-wide ${
                transparent && !scrolled ? 'text-white drop-shadow-lg' : 'text-primary-maroon'
              }`}>Saksham Fashion Zone</div>
              <div className={`text-xs font-medium hidden sm:block drop-shadow transition-all duration-300 ${
                transparent && !scrolled ? 'text-white/90' : 'text-royal-gold'
              }`}>Where Elegance Meets Tradition</div>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setActiveLink(href)}
                onMouseLeave={() => setActiveLink('')}
                className={`nav-link group relative overflow-hidden ${
                  transparent && !scrolled
                    ? 'text-white hover:text-white/80'
                    : 'text-text-dark hover:text-primary-maroon'
                }`}
              >
                <span
                  className="relative z-10 inline-block transition-transform duration-200"
                  style={{ transform: activeLink === href ? 'translateY(-2px)' : 'translateY(0)' }}
                >
                  {label}
                </span>
                <div className={`nav-underline ${transparent && !scrolled ? 'bg-white' : 'bg-primary-maroon'}`}></div>
                <span
                  className="absolute bottom-0 left-1/2 w-1 h-1 bg-royal-gold rounded-full transition-all duration-300"
                  style={{
                    opacity: activeLink === href ? 1 : 0,
                    transform: activeLink === href ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)'
                  }}
                />
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className={`relative p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                transparent && !scrolled ? 'text-white hover:bg-white/10' : 'text-primary-maroon hover:bg-primary-maroon/10'
              } ${cartBounce ? 'animate-bounce' : ''}`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${cartBounce ? 'scale-125' : 'scale-100'}`}>
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <User className={`w-5 h-5 ${transparent ? 'text-white' : 'text-primary-maroon'}`} />
                  <span className={`text-sm font-medium ${transparent ? 'text-white' : 'text-text-dark'}`}>{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className={`p-2 rounded-lg transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'text-primary-maroon hover:bg-primary-maroon/10'}`}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 font-medium hover:scale-105 ${
                    transparent && !scrolled ? 'text-white hover:bg-white/10' : 'text-primary-maroon hover:bg-primary-maroon/10'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="relative overflow-hidden bg-primary-maroon text-white px-4 py-2 rounded-lg hover:bg-deep-maroon transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg group"
                >
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                </button>
              </div>
            )}
            
            <a href="tel:9588253490" className="call-btn group">
              <Phone className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              <span>Call Now</span>
              <div className="call-pulse"></div>
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'text-primary-maroon hover:bg-primary-maroon/10'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsMenuOpen(false)}>
            <div className="bg-white w-80 h-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-maroon to-deep-maroon rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary-maroon">Saksham</div>
                      <div className="text-xs text-royal-gold">Fashion Zone</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <nav className="p-6">
                <div className="space-y-6">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-primary-maroon/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary-maroon text-sm font-bold">H</span>
                    </div>
                    <span className="text-gray-800 font-medium">Home</span>
                  </Link>
                  
                  <Link 
                    href="/products" 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-primary-maroon/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary-maroon text-sm font-bold">C</span>
                    </div>
                    <span className="text-gray-800 font-medium">Collection</span>
                  </Link>
                  
                  <Link 
                    href="/offers" 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-primary-maroon/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary-maroon text-sm font-bold">O</span>
                    </div>
                    <span className="text-gray-800 font-medium">Offers</span>
                  </Link>
                  
                  <Link 
                    href="/about" 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-primary-maroon/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary-maroon text-sm font-bold">A</span>
                    </div>
                    <span className="text-gray-800 font-medium">About</span>
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-primary-maroon/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary-maroon text-sm font-bold">C</span>
                    </div>
                    <span className="text-gray-800 font-medium">Contact</span>
                  </Link>
                  
                  <Link 
                    href="/cart" 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-primary-maroon/10 rounded-lg flex items-center justify-center relative">
                      <ShoppingBag className="w-4 h-4 text-primary-maroon" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">Cart ({cartCount})</span>
                  </Link>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a 
                    href="tel:9588253490" 
                    className="flex items-center justify-center space-x-3 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">Call Now: 9588253490</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;