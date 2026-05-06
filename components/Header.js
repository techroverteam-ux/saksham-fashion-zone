import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ShoppingBag, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ cartCount = 0, transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [headerBgIndex, setHeaderBgIndex] = useState(0);
  const prevCartCount = useRef(cartCount);
  const { user, setShowAuth, setAuthMode, logout } = useAuth();

  const headerBgs = [
    'rgba(255,255,255,0.97)',
    'rgba(255,248,240,0.97)',
    'rgba(255,240,248,0.97)',
    'rgba(240,248,255,0.97)',
    'rgba(248,255,240,0.97)',
  ];

  const navColors = [
    { hover: '#E53E3E', glow: 'rgba(229,62,62,0.3)' },
    { hover: '#D69E2E', glow: 'rgba(214,158,46,0.3)' },
    { hover: '#38A169', glow: 'rgba(56,161,105,0.3)' },
    { hover: '#3182CE', glow: 'rgba(49,130,206,0.3)' },
    { hover: '#805AD5', glow: 'rgba(128,90,213,0.3)' },
  ];

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

  useEffect(() => {
    if (!transparent || scrolled) {
      const t = setInterval(() => setHeaderBgIndex(i => (i + 1) % headerBgs.length), 3000);
      return () => clearInterval(t);
    }
  }, [transparent, scrolled]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Collection' },
    { href: '/offers', label: 'Offers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const headerStyle = (!transparent || scrolled)
    ? { background: headerBgs[headerBgIndex], transition: 'background 1.5s ease, all 0.4s ease', backdropFilter: 'blur(12px)' }
    : { transition: 'all 0.4s ease' };

  return (
    <header
      style={headerStyle}
      className={`${
        transparent && !scrolled
          ? 'bg-transparent backdrop-blur-sm absolute top-0 left-0 right-0 z-50'
          : 'shadow-lg sticky top-0 z-50 border-b border-royal-gold/20'
      } ${scrolled ? 'shadow-xl' : ''}`}
    >
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
                transparent && !scrolled ? 'drop-shadow-lg' : ''
              }`}>
                {['S','a','k','s','h','a','m',' ','F','a','s','h','i','o','n',' ','Z','o','n','e'].map((char, i) => (
                  <span
                    key={i}
                    style={{
                      display: char === ' ' ? 'inline' : 'inline-block',
                      animation: char !== ' ' ? `letterColor 4s ease-in-out infinite` : 'none',
                      animationDelay: `${i * 0.15}s`,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
              <div className={`text-xs font-medium hidden sm:block drop-shadow transition-all duration-300 ${
                transparent && !scrolled ? 'text-white/90' : 'text-royal-gold'
              }`}>Where Elegance Meets Tradition</div>
            </div>
          </Link>

          <style>{`
            @keyframes letterColor {
              0%   { color: #8B0000; }
              20%  { color: #FFD700; }
              40%  { color: #E53E3E; }
              60%  { color: #D69E2E; }
              80%  { color: #805AD5; }
              100% { color: #8B0000; }
            }
          `}</style>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(({ href, label }, idx) => (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setActiveLink(href)}
                onMouseLeave={() => setActiveLink('')}
                className="nav-link group relative overflow-hidden"
                style={{
                  color: activeLink === href ? navColors[idx].hover : (transparent && !scrolled ? '#fff' : '#2D3748'),
                  textShadow: activeLink === href ? `0 0 12px ${navColors[idx].glow}, 0 0 24px ${navColors[idx].glow}` : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <span
                  className="relative z-10 inline-block"
                  style={{
                    transform: activeLink === href ? 'translateY(-3px) scale(1.08)' : 'translateY(0) scale(1)',
                    transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)'
                  }}
                >
                  {label}
                </span>
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                  style={{
                    width: activeLink === href ? '100%' : '0%',
                    background: activeLink === href ? `linear-gradient(90deg, ${navColors[idx].hover}, ${navColors[idx].glow})` : 'transparent',
                    boxShadow: activeLink === href ? `0 0 8px ${navColors[idx].glow}` : 'none'
                  }}
                />
                <span
                  className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    opacity: activeLink === href ? 1 : 0,
                    transform: activeLink === href ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)',
                    background: navColors[idx].hover,
                    boxShadow: activeLink === href ? `0 0 10px ${navColors[idx].glow}` : 'none'
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
                  className={`px-3 py-2 rounded-lg font-medium relative overflow-hidden group/login transition-all duration-300 hover:scale-105 ${
                    transparent && !scrolled ? 'text-white hover:bg-white/10' : 'text-primary-maroon'
                  }`}
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#667eea,#764ba2)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(102,126,234,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/login:translate-x-full transition-transform duration-500"></span>
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="relative overflow-hidden px-4 py-2 rounded-lg font-medium group/signup transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#f093fb,#f5576c)', color: '#fff', boxShadow: '0 4px 15px rgba(245,87,108,0.4)', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#4facfe,#00f2fe)'; e.currentTarget.style.boxShadow = '0 6px 25px rgba(79,172,254,0.6)'; e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#f093fb,#f5576c)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(245,87,108,0.4)'; e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
                >
                  <span className="relative z-10">Sign Up ✨</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/signup:translate-x-full transition-transform duration-500"></span>
                </button>
              </div>
            )}
            
            <a
              href="tel:9588253490"
              className="call-btn group relative overflow-hidden"
              style={{ transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#f7971e,#ffd200)'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,210,0,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
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