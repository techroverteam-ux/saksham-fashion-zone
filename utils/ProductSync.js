import productsData from '../data/products.js';

// Product synchronization utility to ensure consistency between admin and frontend
export const ProductSync = {
  // Get products from localStorage with fallback to static data
  getProducts: () => {
    try {
      const adminProducts = localStorage.getItem('admin-products');
      if (adminProducts) {
        const products = JSON.parse(adminProducts);
        return {
          products,
          filterOptions: productsData.filterOptions
        };
      }
      
      // Fallback to static data
      return productsData;
    } catch (error) {
      console.error('Error loading products:', error);
      return productsData;
    }
  },

  // Save products to localStorage and sync across keys
  saveProducts: (products) => {
    try {
      // Save to admin-products (primary storage)
      localStorage.setItem('admin-products', JSON.stringify(products));
      
      // Sync to saksham-products for consistency
      const data = {
        products,
        filterOptions: productsData.filterOptions
      };
      localStorage.setItem('saksham-products', JSON.stringify(data));
      
      // Trigger storage event for cross-tab synchronization
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'admin-products',
        newValue: JSON.stringify(products),
        storageArea: localStorage
      }));
      
      return { success: true };
    } catch (error) {
      console.error('Error saving products:', error);
      return { success: false, error: error.message };
    }
  },

  // Initialize products if none exist
  initializeProducts: () => {
    const adminProducts = localStorage.getItem('admin-products');
    if (!adminProducts) {
      ProductSync.saveProducts(productsData.products);
    }
  },

  // Get a single product by ID
  getProductById: (id) => {
    const data = ProductSync.getProducts();
    return data.products.find(p => p.id === parseInt(id));
  },

  // Add event listeners for cross-tab synchronization
  addSyncListeners: (callback) => {
    const handleStorageChange = (e) => {
      if (e.key === 'admin-products' && callback) {
        callback();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && callback) {
        callback();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Return cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  },

  // Validate product data structure
  validateProduct: (product) => {
    const required = ['id', 'name', 'category', 'discountedPrice', 'originalPrice'];
    const missing = required.filter(field => !product[field]);
    
    if (missing.length > 0) {
      return { valid: false, missing };
    }
    
    return { valid: true };
  },

  // Merge new products with existing ones
  mergeProducts: (newProducts) => {
    const existing = ProductSync.getProducts().products;
    const merged = [...existing];
    
    newProducts.forEach(newProduct => {
      const existingIndex = merged.findIndex(p => p.id === newProduct.id);
      if (existingIndex >= 0) {
        merged[existingIndex] = newProduct;
      } else {
        merged.push(newProduct);
      }
    });
    
    return merged;
  }
};

export default ProductSync;