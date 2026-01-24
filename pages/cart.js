import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle, CheckCircle } from 'lucide-react';
import productsData from '../data/products.js';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, getComboDiscount, getFinalTotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleQuantityChange = (productId, newQuantity) => {
    const product = items.find(item => item.id === productId);
    const productData = productsData.products.find(p => p.id === productId);
    
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else if (newQuantity > productData?.stock) {
      alert(`Only ${productData.stock} items available in stock`);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill all required fields');
      return;
    }

    // Create WhatsApp message
    const orderDetails = items.map(item => 
      `${item.name} - Qty: ${item.quantity} - ₹${(item.discountedPrice * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const comboDiscount = getComboDiscount();
    const total = getFinalTotal();
    
    const message = `🛍️ New Order from Website\n\n👤 Customer Details:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}\n\n📦 Order Details:\n${orderDetails}\n\n💰 Pricing:\nSubtotal: ₹${getCartTotal().toLocaleString()}\n${comboDiscount > 0 ? `Combo Discount: -₹${comboDiscount.toLocaleString()}\n` : ''}Final Total: ₹${total.toLocaleString()}\n\n💳 Payment: Cash on Delivery\n\n${customerInfo.notes ? `📝 Notes: ${customerInfo.notes}` : ''}`;

    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/919588253490?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and show success
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-ivory-white">
        <Header cartCount={0} />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-text-dark mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your order. We'll contact you shortly to confirm the details.
          </p>
          <div className="space-y-4">
            <p className="text-lg">📞 We'll call you within 30 minutes</p>
            <p className="text-lg">🚚 Free delivery to your address</p>
            <p className="text-lg">💳 Pay cash on delivery</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary mt-8"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-white">
      <Header cartCount={items.reduce((count, item) => count + item.quantity, 0)} />
      
      <div className="w-full px-2 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20">
            <img 
              src="/images/Screenshot 2026-01-24 at 6.53.23PM.png" 
              alt="Empty cart" 
              className="w-32 h-32 mx-auto mb-6 rounded-full object-cover opacity-50"
            />
            <h2 className="text-2xl font-bold text-text-dark mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some beautiful sarees and blouses to get started</p>
            <a href="/products" className="btn-primary">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card">
                  <div className="flex gap-4">
                    <img 
                      src={(() => {
                        const productData = productsData.products.find(p => p.id === item.id);
                        return productData?.image || '/images/Screenshot 2026-01-24 at 6.53.02PM.png';
                      })()} 
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-lg border"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-dark mb-2">{item.name}</h3>
                      <div className="text-sm text-gray-600 mb-2">
                        <span>Fabric: {item.fabric}</span> • <span>Occasion: {item.occasion}</span>
                        {item.selectedColor && (
                          <div className="flex items-center gap-2 mt-1">
                            <span>Color:</span>
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{backgroundColor: item.selectedColor.hex}}
                            ></div>
                            <span>{item.selectedColor.name}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Stock Info */}
                      {(() => {
                        const productData = productsData.products.find(p => p.id === item.id);
                        const stockLeft = productData?.stock - item.quantity;
                        return (
                          <div className="text-sm mb-3">
                            <span className={`font-medium ${
                              stockLeft <= 5 ? 'text-red-600' : 
                              stockLeft <= 10 ? 'text-orange-600' : 'text-green-600'
                            }`}>
                              {stockLeft > 0 ? `${stockLeft} left in stock` : 'Last item in cart'}
                            </span>
                          </div>
                        );
                      })()}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 border rounded hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={(() => {
                              const productData = productsData.products.find(p => p.id === item.id);
                              return item.quantity >= productData?.stock;
                            })()}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-maroon">
                            ₹{(item.discountedPrice * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            Save ₹{((item.originalPrice - item.discountedPrice) * item.quantity).toLocaleString()}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="text-xl font-bold text-text-dark mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((count, item) => count + item.quantity, 0)} items)</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  
                  {getComboDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Combo Discount (5%)</span>
                      <span>-₹{getComboDiscount().toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-maroon">₹{getFinalTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                {getComboDiscount() > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                    <p className="text-green-800 text-sm font-medium">
                      🎉 Combo discount applied! You saved ₹{getComboDiscount().toLocaleString()}
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={handleCheckout}
                  className="btn-primary w-full mb-4"
                >
                  Proceed to Checkout
                </button>
                
                <div className="text-center text-sm text-gray-600">
                  💳 Cash on Delivery Available<br />
                  🚚 Free Home Delivery<br />
                  📞 Call Support: 9588253490
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Complete Your Order</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input 
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input 
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                <textarea 
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                  rows="3"
                  placeholder="Enter your complete address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Special Notes (Optional)</label>
                <textarea 
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                  rows="2"
                  placeholder="Any special instructions..."
                />
              </div>
            </div>
            
            <div className="bg-soft-beige rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Order Total: ₹{getFinalTotal().toLocaleString()}</h3>
              <p className="text-sm text-gray-600">💳 Payment: Cash on Delivery</p>
              <p className="text-sm text-gray-600">🚚 Delivery: FREE</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCheckout(false)}
                className="flex-1 border border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handlePlaceOrder}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;