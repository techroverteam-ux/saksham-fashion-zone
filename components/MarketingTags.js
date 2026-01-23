import React from 'react';
import { Crown, Sparkles, Zap, Gift, Star, Flame, Trophy, Heart } from 'lucide-react';

const MarketingTags = ({ badges, className = "" }) => {
  const getTagConfig = (badge) => {
    const configs = {
      'Bestseller': {
        icon: Crown,
        style: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse',
        glow: 'shadow-yellow-400/50'
      },
      'New Arrival': {
        icon: Sparkles,
        style: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
        glow: 'shadow-green-400/50'
      },
      'Limited Edition': {
        icon: Zap,
        style: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-bounce',
        glow: 'shadow-purple-400/50'
      },
      'Inauguration Special': {
        icon: Gift,
        style: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg',
        glow: 'shadow-red-400/50'
      },
      'Hot Deal': {
        icon: Flame,
        style: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse',
        glow: 'shadow-orange-400/50'
      },
      'Premium': {
        icon: Trophy,
        style: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg',
        glow: 'shadow-indigo-400/50'
      },
      'Customer Favorite': {
        icon: Heart,
        style: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg',
        glow: 'shadow-pink-400/50'
      }
    };
    
    return configs[badge] || {
      icon: Star,
      style: 'bg-gradient-to-r from-primary-maroon to-deep-maroon text-white shadow-lg',
      glow: 'shadow-primary-maroon/50'
    };
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {badges?.map((badge, index) => {
        const config = getTagConfig(badge);
        const Icon = config.icon;
        
        return (
          <div
            key={index}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold transform transition-all duration-300 hover:scale-110 ${config.style} ${config.glow}`}
          >
            <Icon className="w-3 h-3" />
            <span>{badge}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MarketingTags;