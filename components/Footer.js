import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageCircle, Sparkles } from 'lucide-react';

const footerBgs = [
  'linear-gradient(135deg, #fef9f0 0%, #fff8e1 50%, #fffef7 100%)',
  'linear-gradient(135deg, #f0fff4 0%, #e6ffed 50%, #f5fff8 100%)',
  'linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 50%, #f5f8ff 100%)',
  'linear-gradient(135deg, #fff0f5 0%, #ffe4f0 50%, #fff5fb 100%)',
  'linear-gradient(135deg, #fdf0ff 0%, #f5e6ff 50%, #faf0ff 100%)',
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Collection' },
  { href: '/offers', label: 'Offers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/cart', label: 'Cart' },
];

const policies = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/terms-conditions', label: 'Terms & Conditions' },
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/faq', label: 'FAQ' },
];

const Footer = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [hoveredLink, setHoveredLink] = useState('');

  useEffect(() => {
    const t = setInterval(() => setBgIndex(i => (i + 1) % footerBgs.length), 3000);
    return () => clearInterval(t);
  }, []);

  const sparklePositions = [
    { top: '8%', left: '5%' }, { top: '15%', left: '20%' }, { top: '5%', left: '40%' },
    { top: '20%', left: '60%' }, { top: '10%', left: '80%' }, { top: '30%', left: '90%' },
    { top: '60%', left: '8%' }, { top: '75%', left: '25%' }, { top: '50%', left: '50%' },
    { top: '70%', left: '70%' }, { top: '85%', left: '88%' }, { top: '45%', left: '95%' },
  ];

  const sparkleColors = ['#FFD700','#E53E3E','#38A169','#3182CE','#805AD5','#f093fb','#f7971e','#4facfe','#FFD700','#E53E3E','#38A169','#805AD5'];

  return (
    <footer
      className="relative overflow-hidden py-10 sm:py-14"
      style={{ background: footerBgs[bgIndex], transition: 'background 1.5s ease-in-out' }}
    >
      {/* Floating orbs */}
      <div className="absolute top-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-20 float-animation" style={{ background: 'linear-gradient(135deg,#FFD700,#f7971e)', animationDelay: '0s' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 float-animation" style={{ background: 'linear-gradient(135deg,#8B0000,#f093fb)', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full blur-2xl opacity-10 float-animation" style={{ background: 'linear-gradient(135deg,#4facfe,#38A169)', animationDelay: '4s' }} />

      {/* Sparkle dots */}
      {sparklePositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-ping"
          style={{
            top: pos.top, left: pos.left,
            background: sparkleColors[i],
            animationDelay: `${i * 0.35}s`,
            animationDuration: '2.5s',
            opacity: 0.5
          }}
        />
      ))}

      {/* Floating ✨ stars */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute opacity-30 select-none pointer-events-none"
          style={{
            top: `${10 + i * 11}%`,
            right: `${3 + i * 12}%`,
            animation: 'float 4s ease-in-out infinite',
            animationDelay: `${i * 0.5}s`,
            fontSize: ['14px','18px','12px','16px'][i % 4]
          }}
        >✨</div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div style={{ animation: 'footerFadeIn 0.6s ease both' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-maroon to-deep-maroon rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">S</span>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-royal-gold rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                    <Sparkles className="w-1.5 h-1.5 text-text-dark" />
                  </div>
                </div>
              </div>
              <h3
                className="text-lg sm:text-xl font-bold"
                style={{ background: 'linear-gradient(90deg,#8B0000,#D69E2E,#8B0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%', animation: 'shimmerText 3s linear infinite' }}
              >
                Saksham Fashion Zone
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-2 font-semibold" style={{ animation: 'footerFadeIn 0.8s ease both' }}>
              Where Elegance Meets Tradition
            </p>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Premium sarees, blouses, and traditional Indian wear with authentic fabrics.
            </p>
            <div className="flex space-x-3">
              <a href="https://wa.me/919588253490" className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
              <a href="tel:9588253490" className="bg-primary-maroon p-2 rounded-full hover:bg-deep-maroon transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Phone className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ animation: 'footerFadeIn 0.7s ease both', animationDelay: '0.1s' }}>
            <h4 className="text-base sm:text-lg font-bold mb-4 text-gray-900 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-maroon to-royal-gold rounded-full" />
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {quickLinks.map(({ href, label }, i) => (
                <li key={href} style={{ animation: `footerFadeIn 0.5s ease both`, animationDelay: `${0.15 + i * 0.07}s` }}>
                  <Link
                    href={href}
                    className="text-gray-700 font-medium flex items-center gap-2 group transition-all duration-300"
                    onMouseEnter={() => setHoveredLink(label)}
                    onMouseLeave={() => setHoveredLink('')}
                    style={{ color: hoveredLink === label ? '#8B0000' : '', transform: hoveredLink === label ? 'translateX(6px)' : '', transition: 'all 0.25s ease' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-primary-maroon transition-all duration-300"
                      style={{ transform: hoveredLink === label ? 'scale(1.8)' : 'scale(1)', background: hoveredLink === label ? '#FFD700' : '#8B0000' }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div style={{ animation: 'footerFadeIn 0.7s ease both', animationDelay: '0.2s' }}>
            <h4 className="text-base sm:text-lg font-bold mb-4 text-gray-900 relative inline-block">
              Policies
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {policies.map(({ href, label }, i) => (
                <li key={href} style={{ animation: `footerFadeIn 0.5s ease both`, animationDelay: `${0.2 + i * 0.07}s` }}>
                  <Link
                    href={href}
                    className="text-gray-700 font-medium flex items-center gap-2 transition-all duration-300"
                    onMouseEnter={e => { e.currentTarget.style.color = '#3182CE'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.transform = ''; }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Info */}
          <div style={{ animation: 'footerFadeIn 0.7s ease both', animationDelay: '0.3s' }}>
            <h4 className="text-base sm:text-lg font-bold mb-4 text-gray-900 relative inline-block">
              Store Info
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
            </h4>
            <div className="space-y-3 text-sm sm:text-base">
              {[
                { icon: <MapPin className="w-4 h-4 flex-shrink-0 text-primary-maroon mt-0.5" />, text: 'Merta Road, Sadar Bazar, Rajasthan', color: '#8B0000' },
                { icon: <Phone className="w-4 h-4 flex-shrink-0 text-green-600" />, text: '9588253490, 9252064591', color: '#276749' },
                { icon: <Clock className="w-4 h-4 flex-shrink-0 text-blue-600" />, text: 'Mon-Sat: 10AM-8PM', color: '#2B6CB0' },
              ].map((item, i) => (
                <p
                  key={i}
                  className="flex items-start gap-2 text-gray-700 font-medium transition-all duration-300 cursor-default"
                  style={{ animation: `footerFadeIn 0.5s ease both`, animationDelay: `${0.3 + i * 0.1}s` }}
                  onMouseEnter={e => { e.currentTarget.style.color = item.color; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.transform = ''; }}
                >
                  {item.icon}
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-300 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base gap-2">
            <p className="text-gray-600 font-medium text-center sm:text-left">
              &copy; 2024 <span className="text-primary-maroon font-bold">Saksham Fashion Zone</span>. All rights reserved.
            </p>
            <p className="text-gray-600 text-center sm:text-right">
              Developed by{' '}
              <a href="https://techrover.co.in" target="_blank" rel="noopener noreferrer"
                className="font-bold transition-all duration-300"
                style={{ background: 'linear-gradient(90deg,#3182CE,#805AD5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                TechRover
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes footerFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerText {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
