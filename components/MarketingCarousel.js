import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag, Sparkles, Crown, Gift, Zap } from 'lucide-react';

const MarketingCarousel = ({ products, title, type = 'featured' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 2)) % Math.max(1, products.length - 2));
  };

  const getCarouselStyle = () => {
    switch (type) {
      case 'trending':
        return 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200';
      case 'bestseller':
        return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
      case 'new':
        return 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200';
      default:
        return 'bg-gradient-to-br from-royal-gold/10 to-accent-gold/10 border-royal-gold/20';
    }
  };

  const getTagIcon = (badge) => {
    switch (badge) {
      case 'Bestseller': return <Crown className="w-3 h-3" />;
      case 'New Arrival': return <Sparkles className="w-3 h-3" />;
      case 'Limited Edition': return <Zap className="w-3 h-3" />;
      case 'Inauguration Special': return <Gift className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const getTagStyle = (badge) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse';
      case 'New Arrival':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg';
      case 'Limited Edition':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-bounce';
      case 'Inauguration Special':
        return 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg glow-maroon';
      default:
        return 'bg-gradient-to-r from-primary-maroon to-deep-maroon text-white shadow-lg';
    }
  };

  return (
    <div className={`rounded-3xl p-6 border-2 ${getCarouselStyle()} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="fabric-texture w-full h-full"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">{title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-maroon to-royal-gold rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full transition-all ${isAutoPlaying ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {isAutoPlaying ? '⏸️' : '▶️'}
          </button>
          <button
            onClick={prevSlide}
            className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-primary-maroon" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-primary-maroon" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="w-1/3 flex-shrink-0 px-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                hoveredProduct === product.id ? 'transform -translate-y-4 shadow-2xl scale-105' : ''
              }`}>
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                    {product.name}
                  </div>
                  
                  {/* Enhanced Tags */}
                  <div className="absolute top-3 left-3 space-y-1">
                    {product.badges?.map((badge, badgeIndex) => (
                      <div
                        key={badgeIndex}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getTagStyle(badge)} transform transition-all duration-300 hover:scale-110`}
                      >
                        {getTagIcon(badge)}
                        <span>{badge}</span>
                      </div>
                    ))}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex gap-2">
                      <button className="bg-white text-primary-maroon p-2 rounded-full hover:bg-primary-maroon hover:text-white transition-all">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="bg-primary-maroon text-white px-4 py-2 rounded-full hover:bg-deep-maroon transition-all">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-text-dark mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating || 4.5}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews || 120} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-primary-maroon">
                      ₹{product.discountedPrice?.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice?.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-xs text-green-600 font-semibold mb-3">
                    Save ₹{((product.originalPrice || 0) - (product.discountedPrice || 0)).toLocaleString()}
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <span>Fabric: {product.fabric}</span>
                    <span>Stock: {product.stock || 'Available'}</span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-primary-maroon to-deep-maroon text-white py-2 rounded-lg font-medium hover:from-deep-maroon hover:to-primary-maroon transition-all duration-300 transform hover:scale-105">
                    Quick Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.max(1, products.length - 2) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-maroon scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Marketing CTA */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-royal-gold to-accent-gold text-text-dark px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Sparkles className="w-4 h-4" />
          <span>View All {title}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default MarketingCarousel;