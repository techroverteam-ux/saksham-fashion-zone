import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import OrderManagement from '../components/OrderManagement';
import AdminLogin from '../components/AdminLogin';

const AdminPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);

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

  const [offerForm, setOfferForm] = useState({
    title: '',
    description: '',
    discountPercent: '',
    validUntil: '',
    isActive: true
  });

  useEffect(() => {
    // Check if admin is already logged in
    const adminLoggedIn = localStorage.getItem('admin-logged-in');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    // Load existing data
    const savedProducts = localStorage.getItem('admin-products');
    const savedOffers = localStorage.getItem('admin-offers');
    
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedOffers) setOffers(JSON.parse(savedOffers));
  }, []);

  const saveProduct = () => {
    const newProduct = {
      ...productForm,
      id: editingProduct?.id || Date.now(),
      originalPrice: parseFloat(productForm.originalPrice),
      discountedPrice: parseFloat(productForm.discountedPrice),
      stock: parseInt(productForm.stock),
      rating: 4.5,
      reviews: Math.floor(Math.random() * 200) + 50,
      comboEligible: true
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
    
    resetProductForm();
  };

  const saveOffer = () => {
    const newOffer = {
      ...offerForm,
      id: editingOffer?.id || Date.now(),
      discountPercent: parseFloat(offerForm.discountPercent)
    };

    let updatedOffers;
    if (editingOffer) {
      updatedOffers = offers.map(o => o.id === editingOffer.id ? newOffer : o);
    } else {
      updatedOffers = [...offers, newOffer];
    }

    setOffers(updatedOffers);
    localStorage.setItem('admin-offers', JSON.stringify(updatedOffers));
    
    resetOfferForm();
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
    localStorage.setItem('saksham-products', JSON.stringify({ products: updatedProducts }));
  };

  const deleteOffer = (id) => {
    const updatedOffers = offers.filter(o => o.id !== id);
    setOffers(updatedOffers);
    localStorage.setItem('admin-offers', JSON.stringify(updatedOffers));
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      category: 'Sarees',
      fabric: '',
      occasion: '',
      originalPrice: '',
      discountedPrice: '',
      stock: '',
      badges: []
    });
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const resetOfferForm = () => {
    setOfferForm({
      title: '',
      description: '',
      discountPercent: '',
      validUntil: '',
      isActive: true
    });
    setShowOfferForm(false);
    setEditingOffer(null);
  };

  const editProduct = (product) => {
    setProductForm({
      ...product,
      originalPrice: product.originalPrice.toString(),
      discountedPrice: product.discountedPrice.toString(),
      stock: product.stock.toString()
    });
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const editOffer = (offer) => {
    setOfferForm({
      ...offer,
      discountPercent: offer.discountPercent.toString()
    });
    setEditingOffer(offer);
    setShowOfferForm(true);
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal - Saksham Fashion Zone</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Products Management</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.discountedPrice} <span className="line-through text-gray-400">₹{product.originalPrice}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => editProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Sales Dashboard */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Sales Analytics</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Total Users</h3>
                <p className="text-2xl font-bold text-blue-900">
                  {JSON.parse(localStorage.getItem('saksham-users') || '[]').length}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600">Active Sessions</h3>
                <p className="text-2xl font-bold text-green-900">
                  {JSON.parse(localStorage.getItem('user-activity') || '[]').filter(a => a.action === 'login').length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600">Total Products</h3>
                <p className="text-2xl font-bold text-purple-900">{products.length}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-600">Active Offers</h3>
                <p className="text-2xl font-bold text-orange-900">
                  {offers.filter(o => o.isActive).length}
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4">Recent User Activity</h3>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {JSON.parse(localStorage.getItem('user-activity') || '[]').slice(-10).reverse().map((activity, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-900">{activity.email}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activity.action === 'login' ? 'bg-green-100 text-green-800' :
                          activity.action === 'signup' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.action}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Order Management Section */}
        <OrderManagement />

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Offers Management</h2>
              <button
                onClick={() => setShowOfferForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Offer
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {offers.map((offer) => (
                  <tr key={offer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {offer.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {offer.discountPercent}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {offer.validUntil}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        offer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {offer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => editOffer(offer)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h3>
              <button onClick={resetProductForm}>
                <X className="w-5 h-5" />
              </button>
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
                type="text"
                placeholder="Occasion"
                value={productForm.occasion}
                onChange={(e) => setProductForm({...productForm, occasion: e.target.value})}
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
                placeholder="Stock Quantity"
                value={productForm.stock}
                onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              <div className="flex gap-3">
                <button
                  onClick={resetProductForm}
                  className="flex-1 border border-gray-300 rounded-lg py-2 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProduct}
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offer Form Modal */}
      {showOfferForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingOffer ? 'Edit Offer' : 'Add Offer'}
              </h3>
              <button onClick={resetOfferForm}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Offer Title"
                value={offerForm.title}
                onChange={(e) => setOfferForm({...offerForm, title: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              <textarea
                placeholder="Description"
                value={offerForm.description}
                onChange={(e) => setOfferForm({...offerForm, description: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                rows="3"
              />

              <input
                type="number"
                placeholder="Discount Percentage"
                value={offerForm.discountPercent}
                onChange={(e) => setOfferForm({...offerForm, discountPercent: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="date"
                value={offerForm.validUntil}
                onChange={(e) => setOfferForm({...offerForm, validUntil: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={offerForm.isActive}
                  onChange={(e) => setOfferForm({...offerForm, isActive: e.target.checked})}
                />
                <span>Active Offer</span>
              </label>

              <div className="flex gap-3">
                <button
                  onClick={resetOfferForm}
                  className="flex-1 border border-gray-300 rounded-lg py-2 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveOffer}
                  className="flex-1 bg-green-600 text-white rounded-lg py-2 font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
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

export default AdminPortal;