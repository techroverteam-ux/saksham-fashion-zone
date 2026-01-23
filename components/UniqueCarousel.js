import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import MarketingTags from './MarketingTags';

const UniqueCarousel = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || products.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (products.length - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % (products.length - 2));
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + (products.length - 2)) % (products.length - 2));

  return (
    <div className="bg-gradient-to-br from-royal-gold/10 to-accent-gold/10 rounded-3xl p-6 border border-royal-gold/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text-dark">{title}</h2>
        <div className="flex gap-2">
          <button onClick={prevSlide} className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
            <ChevronLeft className="w-5 h-5 text-primary-maroon" />
          </button>
          <button onClick={nextSlide} className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
            <ChevronRight className="w-5 h-5 text-primary-maroon" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {products.map((product) => (
            <div key={product.id} className="w-1/3 flex-shrink-0 px-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {product.name}
                  </div>
                  
                  <MarketingTags badges={product.badges} className="absolute top-3 left-3" />
                  
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="bg-white text-primary-maroon p-2 rounded-full hover:bg-primary-maroon hover:text-white transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-primary-maroon text-white px-4 py-2 rounded-full hover:bg-deep-maroon transition-all">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-primary-maroon">₹{product.discountedPrice?.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice?.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-primary-maroon text-white py-2 rounded-lg hover:bg-deep-maroon transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniqueCarousel;