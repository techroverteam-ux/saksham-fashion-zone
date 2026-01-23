import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img src={product.images[0].url} alt="" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.fabric}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{product.category}</td>
                <td className="px-6 py-4 text-sm">{product.variants?.length || 0} variants</td>
                <td className="px-6 py-4 text-sm">
                  {product.variants?.reduce((sum, v) => sum + parseInt(v.stock || 0), 0) || 0}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => editProduct(product)} className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={resetForm}><X className="w-6 h-6" /></button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-medium">Basic Information</h4>
                
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

                <textarea
                  placeholder="Description"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
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
                    className="w-full border rounded-lg px-3 py-2"
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
                  <h4 className="font-medium">Product Variants</h4>
                  <button
                    onClick={addVariant}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Add Variant
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {productForm.variants.map((variant, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
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
                      
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={variant.size}
                          onChange={(e) => updateVariant(index, 'size', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>
                        
                        <select
                          value={variant.color}
                          onChange={(e) => updateVariant(index, 'color', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          {colors.map(color => <option key={color} value={color}>{color}</option>)}
                        </select>
                        
                        <input
                          type="number"
                          placeholder="Price"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        
                        <input
                          type="number"
                          placeholder="Stock"
                          value={variant.stock}
                          onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        
                        <input
                          type="text"
                          placeholder="SKU"
                          value={variant.sku}
                          onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                          className="border rounded px-2 py-1 text-sm col-span-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={resetForm} className="flex-1 border rounded-lg py-2">Cancel</button>
              <button onClick={saveProduct} className="flex-1 bg-blue-600 text-white rounded-lg py-2">
                <Save className="w-4 h-4 inline mr-2" />Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;