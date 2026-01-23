import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Filter, Grid, List, Star, Heart, ShoppingBag, X, MessageCircle, Sparkles, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductSkeleton from '../components/ProductSkeleton';
import ReviewSystem from '../components/ReviewSystem';
import MarketingTags from '../components/MarketingTags';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.js';

const ProductListing = () => {
  const { getCartCount, addToCart } = useCart();
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [productsDataState, setProductsDataState] = useState(productsData);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 12;
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const adminProducts = localStorage.getItem('saksham-products');
      let data = adminProducts ? JSON.parse(adminProducts) : productsData;
      if (!adminProducts) localStorage.setItem('saksham-products', JSON.stringify(data));
      
      setProductsDataState(data);
      setProducts(data.products);
      setFilteredProducts(data.products);
      setDisplayedProducts(data.products.slice(0, 4));
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loadingMore) {
        return;
      }
      if (displayedProducts.length < filteredProducts.length) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedProducts.length, filteredProducts.length, loadingMore]);
  
  const loadMore = () => {
    if (displayedProducts.length < filteredProducts.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
      }, 300);
    }
  };
  
  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, currentPage * 4));
  }, [filteredProducts, currentPage]);
  const [filters, setFilters] = useState({
    categories: [],
    subCategories: [],
    collections: [],
    fabrics: [],
    occasions: [],
    colors: [],
    priceRange: null,
    comboEligible: false
  });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }
    if (filters.subCategories.length > 0) {
      filtered = filtered.filter(product => filters.subCategories.includes(product.subCategory));
    }
    if (filters.collections.length > 0) {
      filtered = filtered.filter(product => filters.collections.includes(product.collection));
    }
    if (filters.fabrics.length > 0) {
      filtered = filtered.filter(product => filters.fabrics.includes(product.fabric));
    }
    if (filters.occasions.length > 0) {
      filtered = filtered.filter(product => filters.occasions.includes(product.occasion));
    }
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => filters.colors.includes(color.name))
      );
    }
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.discountedPrice >= filters.priceRange.min && 
        product.discountedPrice <= filters.priceRange.max
      );
    }
    if (filters.comboEligible) {
      filtered = filtered.filter(product => product.comboEligible);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters, products, sortBy]);

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'priceRange') {
        newFilters.priceRange = checked ? value : null;
      } else if (filterType === 'comboEligible') {
        newFilters.comboEligible = checked;
      } else {
        if (checked) {
          newFilters[filterType] = [...prev[filterType], value];
        } else {
          newFilters[filterType] = prev[filterType].filter(item => item !== value);
        }
      }
      
      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      subCategories: [],
      collections: [],
      fabrics: [],
      occasions: [],
      colors: [],
      priceRange: null,
      comboEligible: false
    });
  };

  const hasActiveFilters = () => {
    return filters.categories.length > 0 || 
           filters.subCategories.length > 0 || 
           filters.collections.length > 0 || 
           filters.fabrics.length > 0 || 
           filters.occasions.length > 0 || 
           filters.colors.length > 0 ||
           filters.priceRange !== null || 
           filters.comboEligible;
  };

  const calculateComboDiscount = (product) => {
    if (!product.comboEligible) return product.discountedPrice;
    return Math.round(product.discountedPrice * 0.95);
  };

  const ProductCard = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(product.selectedColor);
    const [quantity, setQuantity] = useState(1);
    
    const handleQuantityChange = (newQuantity) => {
      if (newQuantity >= 1 && newQuantity <= product.stock) {
        setQuantity(newQuantity);
      }
    };
    
    const handleAddToCart = () => {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          discountedPrice: product.discountedPrice,
          originalPrice: product.originalPrice,
          fabric: product.fabric,
          occasion: product.occasion,
          category: product.category,
          selectedColor: selectedColor
        });
      }
      setQuantity(1);
    };
    
    return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative">
      <div className="absolute top-3 right-3 z-10">
        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
      </div>
      
      <div className="relative">
        <img 
          src={selectedColor.hex === '#FFFFFF' ? product.image : product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl"
          style={{filter: selectedColor.hex !== '#FFFFFF' ? `hue-rotate(${selectedColor.code === 'RED' ? '0deg' : selectedColor.code === 'BLUE' ? '240deg' : selectedColor.code === 'GREEN' ? '120deg' : '0deg'})` : 'none'}}
        />
        
        <div className="absolute top-3 left-3">
          <MarketingTags badges={product.badges} />
        </div>
        
        <div className="absolute top-3 right-3">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-text-dark line-clamp-2 flex-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        
        {/* Color Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">Color: {selectedColor.name}</span>
            <span className="text-xs text-gray-500">{product.colors.length} colors</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor.code === color.code 
                    ? 'border-primary-maroon scale-110 shadow-md' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{backgroundColor: color.hex}}
                title={color.name}
              >
                {color.hex === '#FFFFFF' && (
                  <div className="w-full h-full rounded-full border border-gray-200"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <span>Fabric: {product.fabric}</span>
          <span>Stock: {product.stock}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-maroon">
              ₹{product.discountedPrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
          
          {product.comboEligible && (
            <div className="text-xs text-green-600 font-semibold">
              Combo Price: ₹{calculateComboDiscount(product).toLocaleString()}
            </div>
          )}
          
          <div className="text-xs text-green-600 font-semibold">
            Save ₹{(product.originalPrice - product.discountedPrice).toLocaleString()}
          </div>
        </div>
        
        {/* Quantity Selector */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Quantity:</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-primary-maroon text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-deep-maroon transition-colors"
          >
            Add {quantity > 1 ? `${quantity} ` : ''}to Cart
          </button>
          <button 
            onClick={() => setSelectedProduct(product)}
            className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
            title="Quick View"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )};

  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/919588253490?text=Hi! I need help choosing products"
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
            <div className="font-semibold">Found something you like?</div>
            <div className="text-sm opacity-90">Get instant help on WhatsApp</div>
          </div>
          <a 
            href="https://wa.me/919588253490"
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold"
          >
            Chat Now
          </a>
        </div>
      </div>

      {/* Header */}
      <Header cartCount={getCartCount()} />

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <div className="filter-panel p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary-maroon" />
                  <h2 className="text-base font-semibold">Filters</h2>
                </div>
                {hasActiveFilters() && (
                  <button 
                    onClick={resetFilters}
                    className="text-xs text-primary-maroon hover:underline font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-2 text-text-dark text-sm">Category</h3>
                  <div className="space-y-1">
                    {productsDataState.filterOptions.categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer hover:text-primary-maroon transition-colors text-sm">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-primary-maroon focus:ring-primary-maroon w-3 h-3"
                          checked={filters.categories.includes(category)}
                          onChange={(e) => handleFilterChange('categories', category, e.target.checked)}
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-text-dark text-sm">Price Range</h3>
                  <div className="space-y-1">
                    {productsDataState.filterOptions.priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-2 cursor-pointer hover:text-primary-maroon transition-colors text-sm">
                        <input 
                          type="radio" 
                          name="priceRange"
                          className="border-gray-300 text-primary-maroon focus:ring-primary-maroon w-3 h-3"
                          checked={filters.priceRange?.label === range.label}
                          onChange={(e) => handleFilterChange('priceRange', range, e.target.checked)}
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-text-dark text-sm">Fabric</h3>
                  <div className="space-y-1">
                    {productsDataState.filterOptions.fabrics.map((fabric) => (
                      <label key={fabric} className="flex items-center gap-2 cursor-pointer hover:text-primary-maroon transition-colors text-sm">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-primary-maroon focus:ring-primary-maroon w-3 h-3"
                          checked={filters.fabrics.includes(fabric)}
                          onChange={(e) => handleFilterChange('fabrics', fabric, e.target.checked)}
                        />
                        <span>{fabric}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-text-dark text-sm">Colors</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {productsDataState.filterOptions.colors.map((color) => {
                      const colorData = {
                        'Red': '#DC2626', 'Blue': '#2563EB', 'Green': '#059669', 'Pink': '#DB2777',
                        'Purple': '#7C3AED', 'Orange': '#EA580C', 'Yellow': '#D97706', 'Maroon': '#7F1D1D',
                        'Navy': '#1E3A8A', 'Black': '#000000', 'White': '#FFFFFF', 'Gold': '#F59E0B'
                      };
                      return (
                        <label key={color} className="flex flex-col items-center gap-1 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="sr-only"
                            checked={filters.colors.includes(color)}
                            onChange={(e) => handleFilterChange('colors', color, e.target.checked)}
                          />
                          <div 
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              filters.colors.includes(color) 
                                ? 'border-primary-maroon scale-110 shadow-md' 
                                : 'border-gray-300 group-hover:border-gray-400'
                            }`}
                            style={{backgroundColor: colorData[color]}}
                          >
                            {color === 'White' && (
                              <div className="w-full h-full rounded-full border border-gray-200"></div>
                            )}
                          </div>
                          <span className="text-xs text-center">{color}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                
                {/* Combo Eligible Filter */}
                <div className="border-t pt-3">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary-maroon transition-colors text-sm">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary-maroon focus:ring-primary-maroon w-3 h-3"
                      checked={filters.comboEligible}
                      onChange={(e) => handleFilterChange('comboEligible', null, e.target.checked)}
                    />
                    <span className="font-semibold">Combo Eligible Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-text-dark">Our Collection</h1>
                <p className="text-gray-600 mt-1 text-sm">
                  {filteredProducts.length} of {products.length} products
                  {hasActiveFilters() && (
                    <span className="ml-2 text-primary-maroon font-medium">(filtered)</span>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 flex-1 md:flex-none focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Customer Rating</option>
                </select>
                
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary-maroon text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary-maroon text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {hasActiveFilters() && (
              <div className="mb-8 p-4 bg-gradient-to-r from-soft-beige to-ivory-white rounded-xl border border-royal-gold/20">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-semibold text-text-dark">Active Filters:</span>
                  {filters.categories.map(cat => (
                    <span key={cat} className="badge badge-maroon flex items-center gap-1">
                      {cat}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-200" 
                        onClick={() => handleFilterChange('categories', cat, false)}
                      />
                    </span>
                  ))}
                  {filters.colors.map(color => (
                    <span key={color} className="badge badge-maroon flex items-center gap-1">
                      {color}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-200" 
                        onClick={() => handleFilterChange('colors', color, false)}
                      />
                    </span>
                  ))}
                  {filters.priceRange && (
                    <span className="badge badge-maroon flex items-center gap-1">
                      {filters.priceRange.label}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-200" 
                        onClick={() => handleFilterChange('priceRange', null, false)}
                      />
                    </span>
                  )}
                  {filters.comboEligible && (
                    <span className="badge badge-gold flex items-center gap-1">
                      Combo Eligible
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-yellow-800" 
                        onClick={() => handleFilterChange('comboEligible', null, false)}
                      />
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Combo Offer Banner */}
            <div className="bg-gradient-to-r from-royal-gold via-yellow-400 to-accent-gold rounded-2xl p-8 mb-8 text-center shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-3">
                🎉 Inauguration Special Combo Offer
              </h2>
              <p className="text-text-dark text-lg mb-2">
                Buy any Saree + Blouse and get <strong className="text-2xl">Extra 5% OFF</strong>
              </p>
              <p className="text-sm text-text-dark/80">
                Valid only on 1st February | Auto-applied at checkout
              </p>
            </div>
            
            {/* Products Grid */}
            {loading ? (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {Array(12).fill(0).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : displayedProducts.length > 0 ? (
              <>
                <div className={`grid gap-4 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {loadingMore && (
                  <div className={`grid gap-4 mt-4 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {Array(4).fill(0).map((_, index) => (
                      <ProductSkeleton key={`loading-${index}`} />
                    ))}
                  </div>
                )}
                
                {displayedProducts.length < filteredProducts.length && !loadingMore && (
                  <div className="text-center mt-8">
                    <div className="text-sm text-gray-500">
                      Scroll down to load more ({filteredProducts.length - displayedProducts.length} remaining)
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-text-dark mb-3">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <button onClick={resetFilters} className="bg-primary-maroon text-white px-6 py-2 rounded-lg">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Product Review Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ReviewSystem 
                productId={selectedProduct.id} 
                productName={selectedProduct.name} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;