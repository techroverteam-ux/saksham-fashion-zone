import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, Camera, Tag, Package, Grid, List, Search, Filter, Eye, Copy, Download } from 'lucide-react';
import StorageManager from '../utils/StorageManager';
import ImageExporter from '../utils/ImageExporter';

const AdvancedProductManagement = ({ showToast }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    subCategory: '',
    collection: '',
    fabric: '',
    occasion: '',
    colors: [],
    sizes: [],
    variants: [{
      color: '',
      size: 'Free Size',
      price: '',
      originalPrice: '',
      stock: '',
      sku: '',
      images: []
    }],
    mainImages: [],
    badges: [],
    features: [],
    careInstructions: '',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    isActive: true,
    isFeatured: false,
    comboEligible: false
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    subCategories: [],
    image: '',
    isActive: true
  });

  const defaultCategories = [
    {
      id: 1,
      name: 'Sarees',
      description: 'Traditional and designer sarees',
      subCategories: ['Silk Sarees', 'Cotton Sarees', 'Georgette Sarees', 'Banarasi Sarees', 'Designer Sarees'],
      image: '',
      isActive: true
    },
    {
      id: 2,
      name: 'Blouses',
      description: 'Designer and traditional blouses',
      subCategories: ['Silk Blouses', 'Cotton Blouses', 'Designer Blouses', 'Embroidered Blouses', 'Party Wear Blouses'],
      image: '',
      isActive: true
    },
    {
      id: 3,
      name: 'Lehengas',
      description: 'Bridal and party lehengas',
      subCategories: ['Bridal Lehengas', 'Party Lehengas', 'Designer Lehengas', 'Heavy Lehengas', 'Light Lehengas'],
      image: '',
      isActive: true
    },
    {
      id: 4,
      name: 'Suits',
      description: 'Traditional and modern suits',
      subCategories: ['Anarkali Suits', 'Straight Suits', 'Palazzo Suits', 'Sharara Suits', 'Designer Suits'],
      image: '',
      isActive: true
    }
  ];

  const availableBadges = ['Bestseller', 'New Arrival', 'Limited Edition', 'Hot Deal', 'Premium', 'Sale', 'Trending'];
  const availableColors = ['Red', 'Blue', 'Green', 'Pink', 'Purple', 'Orange', 'Yellow', 'Black', 'White', 'Gold', 'Silver', 'Maroon', 'Navy', 'Cream', 'Beige'];
  const availableSizes = ['Free Size', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const availableFabrics = ['Cotton', 'Silk', 'Georgette', 'Chiffon', 'Net', 'Velvet', 'Satin', 'Crepe', 'Banarasi Silk', 'Pure Silk', 'Cotton Silk'];
  const availableOccasions = ['Wedding', 'Party', 'Festival', 'Casual', 'Office', 'Traditional', 'Modern'];
  const availableCollections = ['Bridal Collection', 'Party Wear', 'Traditional', 'Contemporary', 'Festive', 'Casual'];

  const recordsPerPage = 12;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedProducts = JSON.parse(localStorage.getItem('admin-products') || '[]');
    const savedCategories = JSON.parse(localStorage.getItem('admin-categories') || '[]');
    
    setProducts(savedProducts);
    
    if (savedCategories.length === 0) {
      setCategories(defaultCategories);
      localStorage.setItem('admin-categories', JSON.stringify(defaultCategories));
    } else {
      setCategories(savedCategories);
    }
  };

  const saveProduct = () => {
    if (!productForm.name || !productForm.category || productForm.variants.length === 0) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    // Create product with image references instead of full data
    const newProduct = {
      id: editingProduct?.id || Date.now(),
      name: productForm.name,
      description: productForm.description,
      category: productForm.category,
      subCategory: productForm.subCategory,
      collection: productForm.collection,
      fabric: productForm.fabric,
      occasion: productForm.occasion,
      badges: productForm.badges,
      features: productForm.features,
      isActive: productForm.isActive,
      isFeatured: productForm.isFeatured,
      comboEligible: productForm.comboEligible,
      mainImages: productForm.mainImages.map(img => ({
        id: img.id,
        fileName: img.fileName,
        url: img.url
      })),
      variants: productForm.variants.map(variant => ({
        color: variant.color,
        size: variant.size,
        price: parseFloat(variant.price || 0),
        originalPrice: parseFloat(variant.originalPrice || variant.price || 0),
        stock: parseInt(variant.stock || 0),
        sku: variant.sku,
        images: variant.images?.map(img => ({
          id: img.id,
          fileName: img.fileName,
          url: img.url
        })) || []
      })),
      // Generate colors from variants
      colors: productForm.variants.map(v => ({
        name: v.color || 'Default',
        code: v.color?.toUpperCase() || 'DEFAULT',
        hex: ['#DC143C', '#0000FF', '#008000', '#FFC0CB', '#800080'][Math.floor(Math.random() * 5)]
      })).filter((color, index, self) => 
        index === self.findIndex(c => c.name === color.name)
      ),
      // Calculate prices
      originalPrice: Math.max(...productForm.variants.map(v => parseFloat(v.originalPrice || v.price || 0))),
      discountedPrice: Math.min(...productForm.variants.map(v => parseFloat(v.price || 0))),
      stock: productForm.variants.reduce((sum, v) => sum + parseInt(v.stock || 0), 0),
      rating: 4.0 + Math.random(),
      reviews: Math.floor(Math.random() * 50) + 10,
      reviewCount: Math.floor(Math.random() * 50) + 10,
      image: productForm.mainImages[0]?.url || `https://via.placeholder.com/400x500/8B0000/FFFFFF?text=${encodeURIComponent(productForm.name)}`,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
      showToast('Product updated successfully', 'success');
    } else {
      updatedProducts = [...products, newProduct];
      showToast('Product added successfully', 'success');
    }

    setProducts(updatedProducts);
    
    try {
      localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
      localStorage.setItem('saksham-products', JSON.stringify({ products: updatedProducts }));
      showToast('Product saved successfully', 'success');
    } catch (error) {
      showToast('Product saved but storage limit reached', 'info');
    }
    
    // Force reload products to ensure display is updated
    setTimeout(() => {
      loadData();
    }, 100);
    
    resetForm();
  };

  const saveCategory = () => {
    if (!categoryForm.name) {
      showToast('Please enter category name', 'error');
      return;
    }

    const newCategory = {
      ...categoryForm,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('admin-categories', JSON.stringify(updatedCategories));
    
    setCategoryForm({
      name: '',
      description: '',
      subCategories: [],
      image: '',
      isActive: true
    });
    setShowCategoryForm(false);
    showToast('Category added successfully', 'success');
  };

  const resetForm = () => {
    setProductForm({
      name: '', description: '', shortDescription: '', category: '', subCategory: '', collection: '',
      fabric: '', occasion: '', colors: [], sizes: [], variants: [{
        color: '', size: 'Free Size', price: '', originalPrice: '', stock: '', sku: '', images: []
      }], mainImages: [], badges: [], features: [], careInstructions: '', tags: [],
      seoTitle: '', seoDescription: '', isActive: true, isFeatured: false, comboEligible: false
    });
    setShowForm(false);
    setEditingProduct(null);
  };

  const editProduct = (product) => {
    setProductForm({
      ...product,
      mainImages: product.mainImages || [],
      variants: product.variants || [{
        color: '',
        size: 'Free Size',
        price: '',
        originalPrice: '',
        stock: '',
        sku: '',
        images: []
      }]
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('admin-products', JSON.stringify(updated));
      showToast('Product deleted successfully', 'success');
    }
  };

  const duplicateProduct = (product) => {
    const duplicated = {
      ...product,
      id: Date.now(),
      name: product.name.replace(/ \(Copy\).*$/, '') + ' (Copy)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProducts = [...products, duplicated];
    setProducts(updatedProducts);
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
    showToast('Product duplicated successfully', 'success');
  };

  const handleImageUpload = (files, variantIndex = null) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const timestamp = Date.now();
          const randomId = Math.random().toString(36).substring(2, 15);
          const ext = file.name.split('.').pop();
          const fileName = `product_${timestamp}_${randomId}.${ext}`;
          
          const imageData = {
            id: timestamp + Math.random(),
            url: `/images/${fileName}`,
            base64: e.target.result,
            name: file.name,
            fileName: fileName
          };

          // Store for file extraction
          const pendingFiles = JSON.parse(localStorage.getItem('pending-files') || '[]');
          pendingFiles.push({
            fileName: fileName,
            base64: e.target.result,
            mimeType: file.type
          });
          localStorage.setItem('pending-files', JSON.stringify(pendingFiles));

          if (variantIndex !== null) {
            setProductForm(prev => ({
              ...prev,
              variants: prev.variants.map((variant, i) => 
                i === variantIndex 
                  ? { ...variant, images: [...variant.images, imageData] }
                  : variant
              )
            }));
          } else {
            setProductForm(prev => ({
              ...prev,
              mainImages: [...prev.mainImages, imageData]
            }));
          }
          
          showToast(`Image ready: ${fileName}`, 'success');
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
        color: '', size: 'Free Size', price: '', originalPrice: '', stock: '', sku: '', images: []
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)); // Sort by latest first

  const totalPages = Math.ceil(filteredProducts.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary-maroon">Advanced Product Management</h2>
          <p className="text-gray-600">Manage products with multiple categories and variants</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const pendingFiles = JSON.parse(localStorage.getItem('pending-files') || '[]');
              pendingFiles.forEach(file => {
                const link = document.createElement('a');
                link.href = file.base64;
                link.download = file.fileName;
                link.click();
              });
              showToast(`Downloaded ${pendingFiles.length} files`, 'success');
              showToast('Move files to /public/images/ folder', 'info');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download Files
          </button>
          <button
            onClick={() => setShowCategoryForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Tag className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-maroon text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-deep-maroon"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-soft">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-maroon"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-maroon"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <div className="flex border rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-maroon text-white' : 'text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-maroon text-white' : 'text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => window.open(`/product-detail?id=${product.id}`, '_blank')}>
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {(product.image || product.mainImages?.[0]?.url) ? (
                  <img 
                    src={product.image || product.mainImages[0].url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const imageData = product.mainImages?.[0];
                      if (imageData?.base64) {
                        e.target.src = imageData.base64;
                      }
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                <div className="absolute top-2 left-2 space-y-1">
                  {product.badges?.slice(0, 2).map((badge, index) => (
                    <span key={index} className="bg-primary-maroon text-white px-2 py-1 rounded text-xs font-bold">
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/product-detail?id=${product.id}`, '_blank');
                    }}
                    className="bg-purple-600 text-white p-1.5 rounded-full hover:bg-purple-700 transform hover:scale-110 transition-all"
                    title="View Details"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      editProduct(product);
                    }}
                    className="bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateProduct(product);
                    }}
                    className="bg-green-600 text-white p-1.5 rounded-full hover:bg-green-700 transform hover:scale-110 transition-all"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id);
                    }}
                    className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transform hover:scale-110 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{product.category} • {product.fabric}</p>
                
                <div className="flex justify-between items-center text-xs mb-2">
                  <span>{product.variants?.length || 0} variants</span>
                  <span className="font-medium">Stock: {product.stock || 0}</span>
                </div>

                <div className="text-sm font-bold text-primary-maroon">
                  ₹{product.discountedPrice?.toLocaleString() || 'N/A'}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {product.isFeatured && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary-maroon text-white">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.open(`/product-detail?id=${product.id}`, '_blank')}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                        {(product.image || product.mainImages?.[0]?.url) ? (
                          <img 
                            src={product.image || product.mainImages[0].url} 
                            alt="" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEIwMDAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UHJvZHVjdDwvdGV4dD4KPC9zdmc+';
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-400 m-3" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.fabric}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">₹{product.discountedPrice?.toLocaleString() || 'N/A'}</td>
                  <td className="px-4 py-3">{product.stock || 0}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/product-detail?id=${product.id}`, '_blank');
                      }} className="text-purple-600 hover:text-purple-800" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        editProduct(product);
                      }} className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        duplicateProduct(product);
                      }} className="text-green-600 hover:text-green-800">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded ${
                page === currentPage 
                  ? 'bg-primary-maroon text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Category</h3>
              <button onClick={() => setShowCategoryForm(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />
              
              <textarea
                placeholder="Category Description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                rows="3"
              />
              
              <div className="flex gap-2">
                <button onClick={() => setShowCategoryForm(false)} className="flex-1 border rounded-lg py-2">
                  Cancel
                </button>
                <button onClick={saveCategory} className="flex-1 bg-primary-maroon text-white rounded-lg py-2">
                  Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end lg:items-center justify-center z-50">
          <div className="bg-white w-full h-full lg:h-auto lg:max-w-6xl lg:w-full lg:max-h-[95vh] overflow-y-auto lg:rounded-lg">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={resetForm}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Basic Information</h4>
                  
                  <input
                    type="text"
                    placeholder="Product Name *"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>

                    <select
                      value={productForm.subCategory}
                      onChange={(e) => setProductForm({...productForm, subCategory: e.target.value})}
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">Select Sub Category</option>
                      {categories.find(c => c.name === productForm.category)?.subCategories?.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={productForm.fabric}
                      onChange={(e) => setProductForm({...productForm, fabric: e.target.value})}
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">Select Fabric</option>
                      {availableFabrics.map(fabric => <option key={fabric} value={fabric}>{fabric}</option>)}
                    </select>

                    <select
                      value={productForm.occasion}
                      onChange={(e) => setProductForm({...productForm, occasion: e.target.value})}
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">Select Occasion</option>
                      {availableOccasions.map(occasion => <option key={occasion} value={occasion}>{occasion}</option>)}
                    </select>
                  </div>

                  <select
                    value={productForm.collection}
                    onChange={(e) => setProductForm({...productForm, collection: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Select Collection</option>
                    {availableCollections.map(collection => <option key={collection} value={collection}>{collection}</option>)}
                  </select>

                  <textarea
                    placeholder="Product Description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3"
                    rows="4"
                  />

                  <input
                    type="text"
                    placeholder="Short Description"
                    value={productForm.shortDescription}
                    onChange={(e) => setProductForm({...productForm, shortDescription: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3"
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

                  {/* Product Settings */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.isActive}
                        onChange={(e) => setProductForm({...productForm, isActive: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">Active Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.isFeatured}
                        onChange={(e) => setProductForm({...productForm, isFeatured: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">Featured Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.comboEligible}
                        onChange={(e) => setProductForm({...productForm, comboEligible: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">Combo Eligible</span>
                    </label>
                  </div>
                </div>

                {/* Main Product Images */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Main Product Images</h4>
                  
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
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
                      className="bg-primary-maroon text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-deep-maroon"
                    >
                      Choose Images
                    </label>
                  </div>

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

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                        <select
                          value={variant.color}
                          onChange={(e) => updateVariant(index, 'color', e.target.value)}
                          className="border rounded px-3 py-2"
                        >
                          <option value="">Select Color</option>
                          {availableColors.map(color => <option key={color} value={color}>{color}</option>)}
                        </select>

                        <select
                          value={variant.size}
                          onChange={(e) => updateVariant(index, 'size', e.target.value)}
                          className="border rounded px-3 py-2"
                        >
                          {availableSizes.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>

                        <input
                          type="number"
                          placeholder="Price *"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          className="border rounded px-3 py-2"
                          required
                        />

                        <input
                          type="number"
                          placeholder="Original Price"
                          value={variant.originalPrice}
                          onChange={(e) => updateVariant(index, 'originalPrice', e.target.value)}
                          className="border rounded px-3 py-2"
                        />

                        <input
                          type="number"
                          placeholder="Stock *"
                          value={variant.stock}
                          onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                          className="border rounded px-3 py-2"
                          required
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="SKU (Auto-generated or custom)"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        className="w-full border rounded px-3 py-2"
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
                                <img 
                                  src={img.url} 
                                  alt="" 
                                  className="w-full h-16 object-cover rounded border"
                                  onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOEIwMDAwIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzMiIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltZzwvdGV4dD4KPC9zdmc+';
                                  }}
                                />
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
                className="flex-1 bg-primary-maroon text-white rounded-lg py-3 text-base font-medium hover:bg-deep-maroon"
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

export default AdvancedProductManagement;