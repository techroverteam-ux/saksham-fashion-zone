import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ShoppingBag, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setShowAuth, setAuthMode, logout } = useAuth();

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-royal-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-maroon to-deep-maroon rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">S</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-royal-gold rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-text-dark" />
                </div>
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-primary-maroon">Saksham Fashion Zone</div>
              <div className="text-xs text-royal-gold font-medium hidden sm:block">Where Elegance Meets Tradition</div>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link group">
              <span>Home</span>
              <div className="nav-underline"></div>
            </Link>
            <Link href="/products" className="nav-link group">
              <span>Collection</span>
              <div className="nav-underline"></div>
            </Link>
            <Link href="/offers" className="nav-link group">
              <span>Offers</span>
              <div className="nav-underline"></div>
            </Link>
            <Link href="/about" className="nav-link group">
              <span>About</span>
              <div className="nav-underline"></div>
            </Link>
            <Link href="/contact" className="nav-link group">
              <span>Contact</span>
              <div className="nav-underline"></div>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-primary-maroon hover:bg-primary-maroon/10 rounded-lg transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary-maroon" />
                  <span className="text-sm font-medium text-text-dark">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-primary-maroon hover:bg-primary-maroon/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="text-primary-maroon hover:bg-primary-maroon/10 px-3 py-2 rounded-lg transition-colors font-medium"
                >
                  Login
                </button>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="bg-primary-maroon text-white px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors font-medium"
                >
                  Sign Up
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
              className="md:hidden p-2 text-primary-maroon hover:bg-primary-maroon/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-text-dark hover:text-primary-maroon transition-colors font-medium">Home</Link>
              <Link href="/products" className="text-text-dark hover:text-primary-maroon transition-colors font-medium">Collection</Link>
              <Link href="/offers" className="text-text-dark hover:text-primary-maroon transition-colors font-medium">Offers</Link>
              <Link href="/about" className="text-text-dark hover:text-primary-maroon transition-colors font-medium">About</Link>
              <Link href="/contact" className="text-text-dark hover:text-primary-maroon transition-colors font-medium">Contact</Link>
              <Link href="/cart" className="text-text-dark hover:text-primary-maroon transition-colors font-medium">Cart ({cartCount})</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;