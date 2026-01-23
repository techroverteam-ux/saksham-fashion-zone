import React, { useState, useEffect } from 'react';
import { AlertTriangle, Package, TrendingDown, TrendingUp, Search, Filter, Eye, Edit } from 'lucide-react';

const MobileInventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // cards or table
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    const inventoryData = [];
    
    products.forEach(product => {
      product.variants?.forEach(variant => {
        inventoryData.push({
          id: `${product.id}-${variant.color}-${variant.size}`,
          productId: product.id,
          productName: product.name,
          category: product.category,
          fabric: product.fabric,
          variant: `${variant.color} - ${variant.size}`,
          color: variant.color,
          size: variant.size,
          sku: variant.sku || `SKU-${product.id}-${variant.color}`,
          currentStock: parseInt(variant.stock) || 0,
          minStock: 5,
          price: parseFloat(variant.price) || 0,
          images: variant.images || [],
          mainImage: product.mainImages?.[0]?.url,
          lastUpdated: new Date().toISOString().split('T')[0]
        });
      });
    });
    
    setInventory(inventoryData);
  }, []);

  const getStockStatus = (current, min) => {
    if (current === 0) return 'out-of-stock';
    if (current <= min) return 'low-stock';
    return 'in-stock';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'out-of-stock': return 'bg-red-100 text-red-800 border-red-200';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'out-of-stock': return <TrendingDown className="w-4 h-4" />;
      case 'low-stock': return <AlertTriangle className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const updateStock = (id, newStock) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { 
        ...item, 
        currentStock: parseInt(newStock), 
        lastUpdated: new Date().toISOString().split('T')[0] 
      } : item
    ));
    
    // Update in products as well
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    const updatedProducts = products.map(product => ({
      ...product,
      variants: product.variants?.map(variant => {
        const variantId = `${product.id}-${variant.color}-${variant.size}`;
        return variantId === id ? { ...variant, stock: newStock.toString() } : variant;
      })
    }));
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || getStockStatus(item.currentStock, item.minStock) === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);
  const lowStockItems = inventory.filter(item => getStockStatus(item.currentStock, item.minStock) === 'low-stock').length;
  const outOfStockItems = inventory.filter(item => getStockStatus(item.currentStock, item.minStock) === 'out-of-stock').length;

  return (
    <div className="space-y-4 pb-20 lg:pb-6">
      <h2 className="text-xl lg:text-2xl font-bold">Inventory Management</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Total Items</p>
              <p className="text-lg lg:text-2xl font-bold">{inventory.length}</p>
            </div>
            <Package className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Total Value</p>
              <p className="text-lg lg:text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-6 lg:w-8 h-6 lg:h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Low Stock</p>
              <p className="text-lg lg:text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>
            <AlertTriangle className="w-6 lg:w-8 h-6 lg:h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Out of Stock</p>
              <p className="text-lg lg:text-2xl font-bold text-red-600">{outOfStockItems}</p>
            </div>
            <TrendingDown className="w-6 lg:w-8 h-6 lg:h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg px-3 py-3 text-base focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            
            <button
              onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
              className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              {viewMode === 'cards' ? 'Table' : 'Cards'}
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Display */}
      {viewMode === 'cards' ? (
        /* Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInventory.map((item) => {
            const status = getStockStatus(item.currentStock, item.minStock);
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-32 bg-gray-200">
                  {item.mainImage || item.images?.[0]?.url ? (
                    <img 
                      src={item.mainImage || item.images[0].url} 
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(status)}`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(status)}
                      <span>{status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.productName}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.category} • {item.variant}</p>
                  <p className="text-xs text-gray-500 mb-3 font-mono">{item.sku}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Current Stock</p>
                      <input
                        type="number"
                        value={item.currentStock}
                        onChange={(e) => updateStock(item.id, e.target.value)}
                        className="w-16 border rounded px-2 py-1 text-sm font-bold"
                        min="0"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Price</p>
                      <p className="text-sm font-bold">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span>Value: ₹{(item.currentStock * item.price).toLocaleString()}</span>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item) => {
                  const status = getStockStatus(item.currentStock, item.minStock);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0">
                            {item.mainImage || item.images?.[0]?.url ? (
                              <img 
                                src={item.mainImage || item.images[0].url} 
                                alt=""
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Package className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.productName}</div>
                            <div className="text-xs text-gray-500">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono">{item.sku}</td>
                      <td className="px-4 py-3 text-sm">{item.variant}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.currentStock}
                          onChange={(e) => updateStock(item.id, e.target.value)}
                          className="w-16 border rounded px-2 py-1 text-sm"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(status)}`}>
                          {status.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">₹{item.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-medium">₹{(item.currentStock * item.price).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Inventory Details</h3>
              <button onClick={() => setSelectedItem(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {selectedItem.mainImage && (
                <img 
                  src={selectedItem.mainImage} 
                  alt={selectedItem.productName}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              
              <div>
                <h4 className="font-semibold">{selectedItem.productName}</h4>
                <p className="text-sm text-gray-600">{selectedItem.category} • {selectedItem.fabric}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <p className="font-mono">{selectedItem.sku}</p>
                </div>
                <div>
                  <span className="text-gray-600">Variant:</span>
                  <p>{selectedItem.variant}</p>
                </div>
                <div>
                  <span className="text-gray-600">Current Stock:</span>
                  <p className="font-bold">{selectedItem.currentStock}</p>
                </div>
                <div>
                  <span className="text-gray-600">Price:</span>
                  <p className="font-bold">₹{selectedItem.price.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Value:</span>
                  <p className="font-bold">₹{(selectedItem.currentStock * selectedItem.price).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Last Updated:</span>
                  <p>{selectedItem.lastUpdated}</p>
                </div>
              </div>
              
              {selectedItem.images?.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Variant Images</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedItem.images.map((img, index) => (
                      <img 
                        key={index}
                        src={img.url} 
                        alt=""
                        className="w-full h-16 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileInventoryManagement;