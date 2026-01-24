// Storage utility to manage localStorage efficiently
export const StorageManager = {
  // Check available storage space
  getStorageInfo: () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return {
      used: total,
      usedMB: (total / 1024 / 1024).toFixed(2),
      // Most browsers allow 5-10MB for localStorage
      limit: 5 * 1024 * 1024, // 5MB estimate
      available: (5 * 1024 * 1024) - total
    };
  },

  // Safely set item with error handling
  safeSetItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return { success: true };
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        return { 
          success: false, 
          error: 'Storage quota exceeded',
          suggestion: 'Consider reducing data size or clearing old data'
        };
      }
      return { success: false, error: error.message };
    }
  },

  // Compress product data by removing large fields
  compressProducts: (products) => {
    return products.map(product => ({
      ...product,
      // Remove or compress large fields
      mainImages: product.mainImages?.slice(0, 1) || [], // Keep only first image
      variants: product.variants?.map(variant => ({
        ...variant,
        images: variant.images?.slice(0, 1) || [] // Keep only first variant image
      })) || [],
      description: product.description?.substring(0, 100) || '', // Truncate description
      features: product.features?.slice(0, 3) || [] // Keep only first 3 features
    }));
  },

  // Clean up old or unnecessary data
  cleanup: () => {
    const keysToCheck = [
      'user-activity',
      'admin-orders',
      'cart-items'
    ];
    
    keysToCheck.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 100) {
            // Keep only recent 50 items
            const recent = parsed.slice(-50);
            localStorage.setItem(key, JSON.stringify(recent));
          }
        } catch (e) {
          // Invalid JSON, remove it
          localStorage.removeItem(key);
        }
      }
    });
  },

  // Get storage usage by key
  getKeyUsage: () => {
    const usage = {};
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const size = localStorage[key].length + key.length;
        usage[key] = {
          size,
          sizeMB: (size / 1024 / 1024).toFixed(3)
        };
      }
    }
    return usage;
  }
};

export default StorageManager;