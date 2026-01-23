import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, Camera } from 'lucide-react';

const EnhancedProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Sarees',
    fabric: '',
    occasion: '',
    description: '',
    variants: [{ 
      size: 'Free Size', 
      color: 'Red', 
      price: '', 
      stock: '', 
      sku: '',
      images: []
    }],
    mainImages: [],
    badges: []
  });

  const availableBadges = ['Bestseller', 'New Arrival', 'Limited Edition', 'Hot Deal', 'Premium'];
  const colors = ['Red', 'Blue', 'Green', 'Pink', 'Purple', 'Orange', 'Yellow', 'Black', 'White', 'Gold', 'Silver', 'Maroon'];
  const sizes = ['Free Size', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const categories = ['Sarees', 'Blouses', 'Lehengas', 'Suits', 'Dupattas'];
  const fabrics = ['Cotton', 'Silk', 'Georgette', 'Chiffon', 'Net', 'Velvet', 'Satin', 'Crepe'];

  useEffect(() => {
    const saved = localStorage.getItem('admin-products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const handleImageUpload = (files, variantIndex = null) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = {
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name,
            size: file.size
          };

          if (variantIndex !== null) {
            // Add to specific variant
            setProductForm(prev => ({
              ...prev,
              variants: prev.variants.map((variant, i) => 
                i === variantIndex 
                  ? { ...variant, images: [...variant.images, imageData] }
                  : variant
              )
            }));
          } else {
            // Add to main product images
            setProductForm(prev => ({
              ...prev,
              mainImages: [...prev.mainImages, imageData]
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId, variantIndex = null) => {
    if (variantIndex !== null) {
      setProductForm(prev => ({
        ...prev,
        variants: prev.variants.map((variant, i) => 
          i === variantIndex 
            ? { ...variant, images: variant.images.filter(img => img.id !== imageId) }
            : variant
        )
      }));
    } else {
      setProductForm(prev => ({
        ...prev,
        mainImages: prev.mainImages.filter(img => img.id !== imageId)
      }));
    }
  };

  const addVariant = () => {
    setProductForm(prev => ({
      ...prev,
      variants: [...prev.variants, { 
        size: 'Free Size', 
        color: 'Red', 
        price: '', 
        stock: '', 
        sku: '',
        images: []
      }]
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
    if (productForm.variants.length > 1) {
      setProductForm(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
      }));
    }
  };

  const generateSKU = (index) => {
    const variant = productForm.variants[index];
    const sku = `${productForm.category.substring(0,3).toUpperCase()}-${variant.color.substring(0,3).toUpperCase()}-${variant.size.replace(' ', '')}-${Date.now().toString().slice(-4)}`;
    updateVariant(index, 'sku', sku);
  };

  const saveProduct = () => {
    const newProduct = {
      ...productForm,
      id: editingProduct?.id || Date.now(),
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalStock: productForm.variants.reduce((sum, v) => sum + parseInt(v.stock || 0), 0),
      priceRange: {
        min: Math.min(...productForm.variants.map(v => parseFloat(v.price || 0))),
        max: Math.max(...productForm.variants.map(v => parseFloat(v.price || 0)))
      }
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
      variants: [{ size: 'Free Size', color: 'Red', price: '', stock: '', sku: '', images: [] }],
      mainImages: [], badges: []
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, variantIndex = null) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files, variantIndex);
    }
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl lg:text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-40 bg-gray-200">
              {product.mainImages?.[0] ? (
                <img 
                  src={product.mainImages[0].url} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 space-y-1">
                {product.badges?.slice(0, 2).map((badge, index) => (
                  <span key={index} className="bg-primary-maroon text-white px-2 py-1 rounded text-xs font-bold">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button 
                  onClick={() => editProduct(product)}
                  className="bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{product.category} • {product.fabric}</p>
              
              <div className="flex justify-between items-center text-xs mb-2">
                <span>{product.variants?.length || 0} variants</span>
                <span className="font-medium">Stock: {product.totalStock || 0}</span>
              </div>

              <div className="text-sm font-bold text-primary-maroon">
                ₹{product.priceRange?.min?.toLocaleString()} - ₹{product.priceRange?.max?.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end lg:items-center justify-center z-50">
          <div className="bg-white w-full h-full lg:h-auto lg:max-w-6xl lg:w-full lg:max-h-[95vh] overflow-y-auto lg:rounded-lg">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={resetForm}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 lg:p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Basic Information</h4>
                  
                  <input
                    type="text"
                    placeholder="Product Name *"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    <select
                      value={productForm.fabric}
                      onChange={(e) => setProductForm({...productForm, fabric: e.target.value})}
                      className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Fabric</option>
                      {fabrics.map(fabric => <option key={fabric} value={fabric}>{fabric}</option>)}
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Occasion (Wedding, Party, Casual, etc.)"
                    value={productForm.occasion}
                    onChange={(e) => setProductForm({...productForm, occasion: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
                  />

                  <textarea
                    placeholder="Product Description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />

                  {/* Marketing Badges */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Marketing Badges</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableBadges.map((badge) => (
                        <label key={badge} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.badges.includes(badge)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProductForm(prev => ({...prev, badges: [...prev.badges, badge]}));
                              } else {
                                setProductForm(prev => ({...prev, badges: prev.badges.filter(b => b !== badge)}));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{badge}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Product Images */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Main Product Images</h4>
                  
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(e) => handleDrop(e)}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Drag & drop images here or click to browse</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="main-images"
                    />
                    <label
                      htmlFor="main-images"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                    >
                      Choose Images
                    </label>
                  </div>

                  {/* Main Images Preview */}
                  <div className="grid grid-cols-3 gap-2">
                    {productForm.mainImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img src={img.url} alt="" className="w-full h-20 object-cover rounded border" />
                        <button
                          onClick={() => removeImage(img.id)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Variants */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Product Variants</h4>
                  <button
                    onClick={addVariant}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                  >
                    Add Variant
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {productForm.variants.map((variant, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Variant {index + 1}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => generateSKU(index)}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            Generate SKU
                          </button>
                          {productForm.variants.length > 1 && (
                            <button
                              onClick={() => removeVariant(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <select
                          value={variant.size}
                          onChange={(e) => updateVariant(index, 'size', e.target.value)}
                          className="border rounded px-3 py-2 text-base focus:ring-2 focus:ring-blue-500"
                        >
                          {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>

                        <select
                          value={variant.color}
                          onChange={(e) => updateVariant(index, 'color', e.target.value)}
                          className="border rounded px-3 py-2 text-base focus:ring-2 focus:ring-blue-500"
                        >
                          {colors.map(color => <option key={color} value={color}>{color}</option>)}
                        </select>

                        <input
                          type="number"
                          placeholder="Price *"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          className="border rounded px-3 py-2 text-base focus:ring-2 focus:ring-blue-500"
                          required
                        />

                        <input
                          type="number"
                          placeholder="Stock *"
                          value={variant.stock}
                          onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                          className="border rounded px-3 py-2 text-base focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="SKU (Auto-generated or custom)"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-base focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Variant Images */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Variant Images ({variant.color} - {variant.size})</label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files, index)}
                            className="hidden"
                            id={`variant-images-${index}`}
                          />
                          <label
                            htmlFor={`variant-images-${index}`}
                            className="bg-gray-600 text-white px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-700 flex items-center gap-2"
                          >
                            <Camera className="w-4 h-4" />
                            Add Images
                          </label>
                          <span className="text-sm text-gray-600">{variant.images?.length || 0} images</span>
                        </div>

                        {variant.images?.length > 0 && (
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {variant.images.map((img) => (
                              <div key={img.id} className="relative group">
                                <img src={img.url} alt="" className="w-full h-16 object-cover rounded border" />
                                <button
                                  onClick={() => removeImage(img.id, index)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
              <button 
                onClick={resetForm} 
                className="flex-1 border border-gray-300 rounded-lg py-3 text-base font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={saveProduct} 
                className="flex-1 bg-blue-600 text-white rounded-lg py-3 text-base font-medium hover:bg-blue-700"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedProductManagement;