import React, { useState, useEffect } from 'react';
import { AlertTriangle, Package, TrendingDown, TrendingUp, Search } from 'lucide-react';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
          variant: `${variant.color} - ${variant.size}`,
          sku: variant.sku || `SKU-${product.id}-${variant.color}`,
          currentStock: parseInt(variant.stock) || 0,
          minStock: 5,
          price: parseFloat(variant.price) || 0,
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
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const updateStock = (id, newStock) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, currentStock: parseInt(newStock), lastUpdated: new Date().toISOString().split('T')[0] } : item
    ));
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || getStockStatus(item.currentStock, item.minStock) === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);
  const lowStockItems = inventory.filter(item => getStockStatus(item.currentStock, item.minStock) === 'low-stock').length;
  const outOfStockItems = inventory.filter(item => getStockStatus(item.currentStock, item.minStock) === 'out-of-stock').length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inventory Management</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold">{inventory.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Items</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInventory.map((item) => {
              const status = getStockStatus(item.currentStock, item.minStock);
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">{item.sku}</td>
                  <td className="px-6 py-4 text-sm">{item.variant}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={item.currentStock}
                      onChange={(e) => updateStock(item.id, e.target.value)}
                      className="w-20 border rounded px-2 py-1 text-sm"
                      min="0"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                      {status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">₹{item.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium">₹{(item.currentStock * item.price).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;