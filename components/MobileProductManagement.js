import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, Eye } from 'lucide-react';

const MobileProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Sarees',
    fabric: '',
    occasion: '',
    description: '',
    variants: [{ size: 'Free Size', color: 'Red', price: '', stock: '', sku: '' }],
    images: [],
    badges: []
  });

  const availableBadges = ['Bestseller', 'New Arrival', 'Limited Edition', 'Hot Deal'];
  const colors = ['Red', 'Blue', 'Green', 'Pink', 'Purple', 'Orange', 'Yellow', 'Black', 'White', 'Gold'];
  const sizes = ['Free Size', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const saved = localStorage.getItem('admin-products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const addVariant = () => {
    setProductForm(prev => ({
      ...prev,
      variants: [...prev.variants, { size: 'Free Size', color: 'Red', price: '', stock: '', sku: '' }]
    }));
  };

  const updateVariant = (index, field, value) => {
    setProductForm(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const removeVariant = (index) => {
    setProductForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductForm(prev => ({
          ...prev,
          images: [...prev.images, { url: event.target.result, name: file.name }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const saveProduct = () => {
    const newProduct = {
      ...productForm,
      id: editingProduct?.id || Date.now(),
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
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

  const resetForm = () => {
    setProductForm({
      name: '', category: 'Sarees', fabric: '', occasion: '', description: '',
      variants: [{ size: 'Free Size', color: 'Red', price: '', stock: '', sku: '' }],
      images: [], badges: []
    });
    setShowForm(false);
    setEditingProduct(null);
  };

  const editProduct = (product) => {
    setProductForm(product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('admin-products', JSON.stringify(updated));
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl lg:text-2xl font-bold">Products</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex-1 sm:flex-none bg-gray-600 text-white px-3 py-2 rounded-lg text-sm"
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-32 bg-gray-200 flex items-center justify-center">
                {product.images?.[0] ? (
                  <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => editProduct(product)} className="bg-blue-600 text-white p-1 rounded">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="bg-red-600 text-white p-1 rounded">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{product.category} • {product.fabric}</p>
                <div className="flex justify-between items-center text-xs">
                  <span>{product.variants?.length || 0} variants</span>
                  <span className="font-medium">
                    Stock: {product.variants?.reduce((sum, v) => sum + parseInt(v.stock || 0), 0) || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {products.map((product) => (
              <div key={product.id} className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.images?.[0] ? (
                    <img src={product.images[0].url} alt="" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.category}</p>
                  <p className="text-xs text-gray-500">
                    {product.variants?.length || 0} variants • 
                    Stock: {product.variants?.reduce((sum, v) => sum + parseInt(v.stock || 0), 0) || 0}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => editProduct(product)} className="text-blue-600 p-1">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-600 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end lg:items-center justify-center z-50">
          <div className="bg-white w-full h-full lg:h-auto lg:max-w-4xl lg:w-full lg:max-h-[90vh] overflow-y-auto lg:rounded-lg">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={resetForm}><X className="w-6 h-6" /></button>
            </div>

            <div className="p-4 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                
                <input
                  type="text"
                  placeholder="Product Name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-3 text-base"
                />
                
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  className="w-full border rounded-lg px-3 py-3 text-base"
                >
                  <option value="Sarees">Sarees</option>
                  <option value="Blouses">Blouses</option>
                  <option value="Lehengas">Lehengas</option>
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Fabric"
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({...productForm, fabric: e.target.value})}
                    className="w-full border rounded-lg px-3 py-3 text-base"
                  />
                  <input
                    type="text"
                    placeholder="Occasion"
                    value={productForm.occasion}
                    onChange={(e) => setProductForm({...productForm, occasion: e.target.value})}
                    className="w-full border rounded-lg px-3 py-3 text-base"
                  />
                </div>

                <textarea
                  placeholder="Description"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-3 text-base"
                  rows="3"
                />

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Product Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border rounded-lg px-3 py-3 text-base"
                  />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {productForm.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img.url} alt="" className="w-16 h-16 object-cover rounded border" />
                        <button
                          onClick={() => setProductForm(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }))}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Variants */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Product Variants</h4>
                  <button
                    onClick={addVariant}
                    className="bg-green-600 text-white px-3 py-2 rounded text-sm"
                  >
                    Add Variant
                  </button>
                </div>

                <div className="space-y-4">
                  {productForm.variants.map((variant, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Variant {index + 1}</span>
                        {productForm.variants.length > 1 && (
                          <button
                            onClick={() => removeVariant(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <select
                          value={variant.size}
                          onChange={(e) => updateVariant(index, 'size', e.target.value)}
                          className="border rounded px-3 py-2 text-base"
                        >
                          {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>
                        
                        <select
                          value={variant.color}
                          onChange={(e) => updateVariant(index, 'color', e.target.value)}
                          className="border rounded px-3 py-2 text-base"
                        >
                          {colors.map(color => <option key={color} value={color}>{color}</option>)}
                        </select>
                        
                        <input
                          type="number"
                          placeholder="Price"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          className="border rounded px-3 py-2 text-base"
                        />
                        
                        <input
                          type="number"
                          placeholder="Stock"
                          value={variant.stock}
                          onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                          className="border rounded px-3 py-2 text-base"
                        />
                        
                        <input
                          type="text"
                          placeholder="SKU"
                          value={variant.sku}
                          onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                          className="border rounded px-3 py-2 text-base col-span-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
              <button onClick={resetForm} className="flex-1 border rounded-lg py-3 text-base">
                Cancel
              </button>
              <button onClick={saveProduct} className="flex-1 bg-blue-600 text-white rounded-lg py-3 text-base">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileProductManagement;