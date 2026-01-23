import React, { useState } from 'react';
import { Heart, Share2, Star, Truck, Shield, RotateCcw, MessageCircle, ShoppingBag, Plus, Minus } from 'lucide-react';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  const product = {
    id: 1,
    name: "Royal Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Silk Sarees",
    collection: "Bridal Collection",
    fabric: "Pure Banarasi Silk",
    occasion: "Wedding",
    originalPrice: 12999,
    discountedPrice: 9749,
    images: [
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800"
    ],
    rating: 4.8,
    reviewCount: 156,
    description: "Exquisite Royal Banarasi Silk Saree crafted with traditional weaving techniques. Features intricate gold zari work and beautiful floral motifs. Perfect for weddings and special occasions.",
    features: [
      "100% Pure Banarasi Silk",
      "Traditional Handwoven",
      "Gold Zari Work",
      "6.5 meters length",
      "Includes matching blouse piece",
      "Dry clean only"
    ],
    sizes: ["Free Size"],
    colors: ["Maroon", "Royal Blue", "Emerald Green"],
    inStock: true,
    comboEligible: true
  };

  const comboProducts = [
    {
      id: 2,
      name: "Designer Embroidered Blouse",
      price: 2999,
      discountedPrice: 2249,
      image: "/api/placeholder/200/250"
    },
    {
      id: 3,
      name: "Matching Silk Blouse",
      price: 3499,
      discountedPrice: 2624,
      image: "/api/placeholder/200/250"
    }
  ];

  const calculateComboSavings = (blousePrice) => {
    const totalOriginal = product.originalPrice + blousePrice;
    const totalDiscounted = product.discountedPrice + (blousePrice * 0.85); // 15% off
    const comboDiscount = totalDiscounted * 0.05; // Extra 5% off
    const finalPrice = totalDiscounted - comboDiscount;
    return {
      totalOriginal,
      finalPrice,
      totalSavings: totalOriginal - finalPrice
    };
  };

  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-maroon">Saksham Fashion Zone</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-text-dark hover:text-primary-maroon">Home</a>
              <a href="/products" className="text-text-dark hover:text-primary-maroon">Collection</a>
              <a href="/offers" className="text-text-dark hover:text-primary-maroon">Offers</a>
              <a href="/about" className="text-text-dark hover:text-primary-maroon">About</a>
              <a href="/contact" className="text-text-dark hover:text-primary-maroon">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-[600px] object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {product.comboEligible && (
                <div className="absolute top-4 left-4">
                  <div className="badge badge-gold">Combo Eligible</div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-primary-maroon' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600">{product.category} &gt; {product.subCategory}</span>
              </div>
              <h1 className="text-3xl font-bold text-text-dark mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-royal-gold text-royal-gold' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            {/* Pricing Section */}
            <div className="bg-soft-beige rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary-maroon">
                  ₹{product.discountedPrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="badge badge-maroon">
                  {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
              
              <div className="text-green-600 font-semibold mb-4">
                You Save ₹{(product.originalPrice - product.discountedPrice).toLocaleString()}
              </div>
              
              {/* Offer Breakdown */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Offer Breakdown:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Original Price:</span>
                    <span>₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>15% Inauguration Discount:</span>
                    <span>-₹{((product.originalPrice * 0.15)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Final Price:</span>
                    <span>₹{product.discountedPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    * Extra 5% combo discount applicable when purchased with blouse
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Options */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Size:</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size ? 'border-primary-maroon bg-primary-maroon text-white' : 'border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Quantity:</h3>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border rounded-lg min-w-[60px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full btn-primary text-lg py-4">
                <ShoppingBag className="w-5 h-5 inline mr-2" />
                Add to Package
              </button>
              <button className="w-full btn-gold text-lg py-4">
                <MessageCircle className="w-5 h-5 inline mr-2" />
                WhatsApp Inquiry
              </button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary-maroon" />
                <div className="text-sm font-semibold">Free Delivery</div>
                <div className="text-xs text-gray-600">On orders above ₹2000</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary-maroon" />
                <div className="text-sm font-semibold">Quality Assured</div>
                <div className="text-xs text-gray-600">100% Authentic</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary-maroon" />
                <div className="text-sm font-semibold">Easy Returns</div>
                <div className="text-xs text-gray-600">7 days return</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Combo Section */}
        {product.comboEligible && (
          <div className="mt-16">
            <div className="bg-gradient-to-r from-royal-gold to-accent-gold rounded-lg p-8">
              <h2 className="text-3xl font-bold text-text-dark text-center mb-8">
                🎉 Complete Your Look - Combo Offers
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {comboProducts.map((comboProduct) => {
                  const savings = calculateComboSavings(comboProduct.price);
                  return (
                    <div key={comboProduct.id} className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="flex gap-4">
                        <img 
                          src={comboProduct.image} 
                          alt={comboProduct.name}
                          className="w-24 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{comboProduct.name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Saree:</span>
                              <span>₹{product.discountedPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Blouse:</span>
                              <span>₹{(comboProduct.price * 0.85).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>Combo Discount (5%):</span>
                              <span>-₹{((product.discountedPrice + comboProduct.price * 0.85) * 0.05).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                              <span>Total:</span>
                              <span>₹{Math.round(savings.finalPrice).toLocaleString()}</span>
                            </div>
                            <div className="text-green-600 font-semibold">
                              Total Savings: ₹{Math.round(savings.totalSavings).toLocaleString()}
                            </div>
                          </div>
                          <button className="w-full btn-primary mt-4">
                            Add Combo to Package
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-primary-maroon text-primary-maroon font-semibold">
                Description
              </button>
              <button className="py-4 px-1 text-gray-600 hover:text-primary-maroon">
                Features
              </button>
              <button className="py-4 px-1 text-gray-600 hover:text-primary-maroon">
                Care Instructions
              </button>
              <button className="py-4 px-1 text-gray-600 hover:text-primary-maroon">
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-maroon rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;