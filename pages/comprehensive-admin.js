import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import MobileAdminSidebar from '../components/MobileAdminSidebar';
import EnhancedProductManagement from '../components/EnhancedProductManagement';
import MobileOrderManagement from '../components/MobileOrderManagement';
import MobileInventoryManagement from '../components/MobileInventoryManagement';
import DeliveryManagement from '../components/DeliveryManagement';
import ReportsManagement from '../components/ReportsManagement';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

const ComprehensiveAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin-logged-in');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-logged-in');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'products':
        return <EnhancedProductManagement />;
      case 'orders':
        return <MobileOrderManagement />;
      case 'inventory':
        return <MobileInventoryManagement />;
      case 'delivery':
        return <DeliveryManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'settings':
        return <SettingsManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <MobileAdminSidebar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        onLogout={handleLogout} 
      />
      
      <div className="flex-1 lg:ml-64 pt-16 lg:pt-0 pb-16 lg:pb-0 overflow-y-auto">
        <div className="p-4 lg:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStockItems: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    const orders = JSON.parse(localStorage.getItem('admin-orders') || '[]');
    const customers = JSON.parse(localStorage.getItem('saksham-users') || '[]');
    
    const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = orders.filter(order => order.paymentStatus === 'Pending').length;
    
    // Calculate low stock items
    let lowStockCount = 0;
    products.forEach(product => {
      product.variants?.forEach(variant => {
        if (parseInt(variant.stock || 0) <= 5) {
          lowStockCount++;
        }
      });
    });

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalCustomers: customers.length,
      totalRevenue: revenue,
      lowStockItems: lowStockCount,
      pendingOrders: pendingOrders
    });
  }, []);

  return (
    <div className="space-y-4 lg:space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
      
      {/* Mobile Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="text-lg lg:text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
          <div className="text-xs lg:text-sm text-gray-600">Products</div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="text-lg lg:text-2xl font-bold text-green-600">{stats.totalOrders}</div>
          <div className="text-xs lg:text-sm text-gray-600">Orders</div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="text-lg lg:text-2xl font-bold text-purple-600">{stats.totalCustomers}</div>
          <div className="text-xs lg:text-sm text-gray-600">Customers</div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="text-lg lg:text-2xl font-bold text-yellow-600">₹{stats.totalRevenue.toLocaleString()}</div>
          <div className="text-xs lg:text-sm text-gray-600">Revenue</div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="text-lg lg:text-2xl font-bold text-red-600">{stats.lowStockItems}</div>
          <div className="text-xs lg:text-sm text-gray-600">Low Stock</div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="text-lg lg:text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
          <div className="text-xs lg:text-sm text-gray-600">Pending</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-base lg:text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-left text-sm lg:text-base">
              Add New Product
            </button>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-left text-sm lg:text-base">
              Process Orders
            </button>
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg text-left text-sm lg:text-base">
              Update Inventory
            </button>
            <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg text-left text-sm lg:text-base">
              Generate Reports
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-base lg:text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>New order received</span>
              <span className="text-gray-500">2 min ago</span>
            </div>
            <div className="flex justify-between">
              <span>Product stock updated</span>
              <span className="text-gray-500">15 min ago</span>
            </div>
            <div className="flex justify-between">
              <span>Customer registered</span>
              <span className="text-gray-500">1 hour ago</span>
            </div>
            <div className="flex justify-between">
              <span>Order delivered</span>
              <span className="text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('saksham-users') || '[]');
    setCustomers(users);
  }, []);

  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold">Customers</h2>
      
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {customers.map((customer, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{customer.name || 'N/A'}</h3>
                <p className="text-sm text-gray-600">{customer.email}</p>
                <p className="text-xs text-gray-500 mt-1">{customer.createdAt || 'N/A'}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium">{customer.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">{customer.email}</td>
                <td className="px-6 py-4 text-sm">{customer.createdAt || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SettingsManagement = () => {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-base lg:text-lg font-semibold mb-4">Store Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <input type="text" defaultValue="Saksham Fashion Zone" className="w-full border rounded-lg px-3 py-3 text-base" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Address</label>
              <textarea defaultValue="Merta Road, Sadar Bazar, Near Namdev Vashtra Bhandar" className="w-full border rounded-lg px-3 py-3 text-base" rows="3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number</label>
              <input type="text" defaultValue="9588253490" className="w-full border rounded-lg px-3 py-3 text-base" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-base lg:text-lg font-semibold mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded w-4 h-4" />
              <span className="text-sm lg:text-base">Email notifications for new orders</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded w-4 h-4" />
              <span className="text-sm lg:text-base">SMS notifications for low stock</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded w-4 h-4" />
              <span className="text-sm lg:text-base">Daily sales reports</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAdmin;