import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, TrendingUp, Users, ShoppingCart, Eye } from 'lucide-react';
import OrderManagement from '../components/OrderManagement';
import AdminLogin from '../components/AdminLogin';

const EnhancedAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalUsers: 0,
    cartItems: 0,
    conversionRate: 0
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Sarees',
    fabric: '',
    occasion: '',
    originalPrice: '',
    discountedPrice: '',
    stock: '',
    badges: []
  });

  const availableBadges = [
    'Bestseller', 'New Arrival', 'Limited Edition', 'Inauguration Special',
    'Hot Deal', 'Premium', 'Customer Favorite'
  ];

  useEffect(() => {
    // Check if admin is already logged in
    const adminLoggedIn = localStorage.getItem('admin-logged-in');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    const savedProducts = localStorage.getItem('admin-products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    
    // Mock analytics
    setAnalytics({
      totalViews: Math.floor(Math.random() * 5000) + 1000,
      totalUsers: JSON.parse(localStorage.getItem('saksham-users') || '[]').length,
      cartItems: Math.floor(Math.random() * 200) + 50,
      conversionRate: (Math.random() * 5 + 2).toFixed(1)
    });
  }, []);

  const saveProduct = () => {
    const newProduct = {
      ...productForm,
      id: editingProduct?.id || Date.now(),
      originalPrice: parseFloat(productForm.originalPrice),
      discountedPrice: parseFloat(productForm.discountedPrice),
      stock: parseInt(productForm.stock),
      rating: 4.5,
      reviews: Math.floor(Math.random() * 200) + 50
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
    } else {
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
    localStorage.setItem('saksham-products', JSON.stringify({ products: updatedProducts }));
    resetForm();
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
  };

  const resetForm = () => {
    setProductForm({
      name: '', category: 'Sarees', fabric: '', occasion: '',
      originalPrice: '', discountedPrice: '', stock: '', badges: []
    });
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const editProduct = (product) => {
    setProductForm({
      ...product,
      originalPrice: product.originalPrice.toString(),
      discountedPrice: product.discountedPrice.toString(),
      stock: product.stock.toString(),
      badges: product.badges || []
    });
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const toggleBadge = (badge) => {
    setProductForm(prev => ({
      ...prev,
      badges: prev.badges.includes(badge) 
        ? prev.badges.filter(b => b !== badge)
        : [...prev.badges, badge]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-logged-in');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Admin Portal</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Views</p>
                <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Users</p>
                <p className="text-2xl font-bold">{analytics.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Cart Items</p>
                <p className="text-2xl font-bold">{analytics.cartItems}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Conversion Rate</p>
                <p className="text-2xl font-bold">{analytics.conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Products Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Products Management</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Badges</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ₹{product.discountedPrice} <span className="line-through text-gray-400">₹{product.originalPrice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {product.badges?.map((badge, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button onClick={() => editProduct(product)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {/* Order Management */}
        <OrderManagement />
      </div>

      {/* Enhanced Product Form */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={resetForm}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={productForm.name}
                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />
              
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="Sarees">Sarees</option>
                <option value="Blouses">Blouses</option>
                <option value="Lehengas">Lehengas</option>
              </select>

              <input
                type="text"
                placeholder="Fabric"
                value={productForm.fabric}
                onChange={(e) => setProductForm({...productForm, fabric: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                placeholder="Original Price"
                value={productForm.originalPrice}
                onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                placeholder="Discounted Price"
                value={productForm.discountedPrice}
                onChange={(e) => setProductForm({...productForm, discountedPrice: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                placeholder="Stock"
                value={productForm.stock}
                onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              {/* Badge Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Marketing Badges</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableBadges.map((badge) => (
                    <label key={badge} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.badges.includes(badge)}
                        onChange={() => toggleBadge(badge)}
                        className="rounded"
                      />
                      <span className="text-sm">{badge}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={resetForm} className="flex-1 border border-gray-300 rounded-lg py-2">
                  Cancel
                </button>
                <button onClick={saveProduct} className="flex-1 bg-blue-600 text-white rounded-lg py-2">
                  <Save className="w-4 h-4 inline mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAdmin;