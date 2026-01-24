import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminSidebar from '../components/AdminSidebar';
import EnhancedProductManagement from '../components/EnhancedProductManagement';
import OrderManagement from '../components/OrderManagement';
import InventoryManagement from '../components/InventoryManagement';
import DeliveryManagement from '../components/DeliveryManagement';
import ReportsManagement from '../components/ReportsManagement';
import productsData from '../data/products';
import { LayoutDashboard, Users, Settings, Menu, Download, FileText, FileSpreadsheet, Plus, TrendingUp, Package, ShoppingCart, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${colors[type]} animate-slide-in`}>
      {icons[type]}
      <span className="font-inter text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">×</button>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-text-dark/70 font-inter">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-accent-gold/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-maroon hover:text-ivory-white transition-colors"
        >
          Prev
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              page === currentPage 
                ? 'bg-primary-maroon text-ivory-white' 
                : 'border border-accent-gold/30 hover:bg-primary-maroon hover:text-ivory-white'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-accent-gold/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-maroon hover:text-ivory-white transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const AdminPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const resetSessionTimeout = () => {
    if (sessionTimeout) clearTimeout(sessionTimeout);
    const timeout = setTimeout(() => {
      localStorage.removeItem('admin-logged-in');
      setIsLoggedIn(false);
      showToast('Session expired due to inactivity', 'info');
    }, 10 * 60 * 1000); // 10 minutes
    setSessionTimeout(timeout);
  };

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin-logged-in');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
      resetSessionTimeout();
    }
    
    const existingProducts = localStorage.getItem('admin-products');
    if (!existingProducts) {
      localStorage.setItem('admin-products', JSON.stringify(productsData.products));
      localStorage.setItem('saksham-products', JSON.stringify(productsData));
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const handleActivity = () => {
      resetSessionTimeout();
    };

    document.addEventListener('mousedown', handleActivity);
    document.addEventListener('keydown', handleActivity);
    document.addEventListener('scroll', handleActivity);
    document.addEventListener('touchstart', handleActivity);

    return () => {
      document.removeEventListener('mousedown', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      document.removeEventListener('touchstart', handleActivity);
      if (sessionTimeout) clearTimeout(sessionTimeout);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    if (sessionTimeout) clearTimeout(sessionTimeout);
    localStorage.removeItem('admin-logged-in');
    setIsLoggedIn(false);
    showToast('Logged out successfully', 'success');
  };

  const downloadPDF = (data, filename) => {
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('PDF report downloaded', 'success');
  };

  const downloadExcel = (data, filename) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Excel report downloaded', 'success');
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardOverview downloadPDF={downloadPDF} downloadExcel={downloadExcel} setActiveMenu={setActiveMenu} showToast={showToast} />;
      case 'products':
        return <ProductsManagement downloadPDF={downloadPDF} downloadExcel={downloadExcel} showToast={showToast} />;
      case 'orders':
        return <OrdersManagement downloadPDF={downloadPDF} downloadExcel={downloadExcel} showToast={showToast} />;
      case 'inventory':
        return <InventoryManagementWrapper downloadPDF={downloadPDF} downloadExcel={downloadExcel} showToast={showToast} />;
      case 'delivery':
        return <DeliveryManagement showToast={showToast} />;
      case 'customers':
        return <CustomerManagement downloadPDF={downloadPDF} downloadExcel={downloadExcel} showToast={showToast} />;
      case 'reports':
        return <ReportsManagement showToast={showToast} />;
      case 'settings':
        return <SettingsManagement showToast={showToast} />;
      default:
        return <DashboardOverview downloadPDF={downloadPDF} downloadExcel={downloadExcel} setActiveMenu={setActiveMenu} showToast={showToast} />;
    }
  };

  return (
    <div className="flex h-screen bg-soft-beige overflow-hidden">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-all duration-300 ease-in-out`}>
        <AdminSidebar 
          activeMenu={activeMenu} 
          setActiveMenu={(menu) => {
            setActiveMenu(menu);
            setSidebarOpen(false);
            showToast(`Switched to ${menu}`, 'info');
          }} 
          onLogout={handleLogout} 
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <header className="bg-gradient-to-r from-primary-maroon to-deep-maroon shadow-gold border-b border-royal-gold/30">
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-royal-gold hover:text-ivory-white hover:bg-deep-maroon/50 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-deep-maroon/30 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-royal-gold rounded-full animate-pulse"></div>
              <span className="text-ivory-white font-inter text-sm capitalize">
                {activeMenu === 'dashboard' ? 'Dashboard Overview' : 
                 activeMenu === 'products' ? 'Product Management' :
                 activeMenu === 'orders' ? 'Order Management' :
                 activeMenu === 'inventory' ? 'Inventory Control' :
                 activeMenu === 'delivery' ? 'Delivery Tracking' :
                 activeMenu === 'customers' ? 'Customer Database' :
                 activeMenu === 'reports' ? 'Analytics & Reports' :
                 activeMenu === 'settings' ? 'System Settings' : activeMenu}
              </span>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <button className="relative p-2 rounded-lg text-ivory-white hover:text-royal-gold hover:bg-deep-maroon/50 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h0z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
              </button>
              
              <div className="flex items-center gap-2 bg-deep-maroon/30 rounded-full px-2 lg:px-3 py-1.5">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-royal-gold rounded-full flex items-center justify-center">
                  <span className="text-primary-maroon font-bold text-xs lg:text-sm">A</span>
                </div>
                <span className="hidden sm:block text-ivory-white font-inter text-sm">Admin</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-red-300 hover:text-red-200 hover:bg-red-900/20 transition-all"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-soft-beige/50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardOverview = ({ downloadPDF, downloadExcel, setActiveMenu }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStockItems: 0,
    pendingOrders: 0,
    totalExpenses: 0,
    netProfit: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    const orders = JSON.parse(localStorage.getItem('admin-orders') || '[]');
    const customers = JSON.parse(localStorage.getItem('saksham-users') || '[]');
    
    const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = orders.filter(order => order.paymentStatus === 'Pending').length;
    const lowStockCount = products.filter(product => (product.stock || 0) <= 5).length;
    
    // Calculate expenses (estimated)
    const totalExpenses = revenue * 0.6; // 60% of revenue as expenses
    const netProfit = revenue - totalExpenses;
    
    // Monthly calculations (current month)
    const currentMonth = new Date().getMonth();
    const monthlyOrders = orders.filter(order => {
      const orderMonth = new Date(order.orderDate).getMonth();
      return orderMonth === currentMonth;
    });
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const monthlyExpenses = monthlyRevenue * 0.6;

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalCustomers: customers.length,
      totalRevenue: revenue,
      lowStockItems: lowStockCount,
      pendingOrders: pendingOrders,
      totalExpenses: totalExpenses,
      netProfit: netProfit,
      monthlyRevenue: monthlyRevenue,
      monthlyExpenses: monthlyExpenses
    });
  }, []);

  const handleDownloadReport = (format) => {
    const reportData = [{
      ...stats,
      reportDate: new Date().toISOString(),
      reportType: 'Dashboard Summary'
    }];
    if (format === 'pdf') {
      downloadPDF(reportData, 'dashboard-report');
    } else {
      downloadExcel(reportData, 'dashboard-report');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-maroon font-playfair">Dashboard</h1>
          <p className="text-sm sm:text-base text-text-dark/70 font-inter">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleDownloadReport('pdf')}
            className="flex items-center gap-2 bg-primary-maroon text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors font-inter text-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={() => handleDownloadReport('excel')}
            className="flex items-center gap-2 bg-accent-gold text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-royal-gold transition-colors font-inter text-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>
      
      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-soft border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-green-800 mb-4 font-playfair">Total Earnings</h3>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-600 font-playfair">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-700">This Month: ₹{stats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-green-600">+12.5% from last month</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-soft border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-red-800 mb-4 font-playfair">Total Expenses</h3>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-red-600 font-playfair">₹{stats.totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-red-700">This Month: ₹{stats.monthlyExpenses.toLocaleString()}</div>
            <div className="text-xs text-red-600">Inventory, Operations, Staff</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-soft border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 font-playfair">Net Profit</h3>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600 font-playfair">₹{stats.netProfit.toLocaleString()}</div>
            <div className="text-sm text-blue-700">Profit Margin: {((stats.netProfit / stats.totalRevenue) * 100).toFixed(1)}%</div>
            <div className="text-xs text-blue-600">After all expenses</div>
          </div>
        </div>
      </div>
      
      {/* Expense Breakdown */}
      <div className="bg-ivory-white p-6 rounded-lg shadow-soft mb-6">
        <h3 className="text-lg font-semibold text-primary-maroon font-playfair mb-4">Expense Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-soft-beige rounded-lg">
            <div className="text-2xl font-bold text-primary-maroon">₹{(stats.totalExpenses * 0.4).toLocaleString()}</div>
            <div className="text-sm text-text-dark/70">Inventory</div>
            <div className="text-xs text-primary-maroon">40% of expenses</div>
          </div>
          <div className="text-center p-4 bg-soft-beige rounded-lg">
            <div className="text-2xl font-bold text-primary-maroon">₹{(stats.totalExpenses * 0.25).toLocaleString()}</div>
            <div className="text-sm text-text-dark/70">Operations</div>
            <div className="text-xs text-primary-maroon">25% of expenses</div>
          </div>
          <div className="text-center p-4 bg-soft-beige rounded-lg">
            <div className="text-2xl font-bold text-primary-maroon">₹{(stats.totalExpenses * 0.2).toLocaleString()}</div>
            <div className="text-sm text-text-dark/70">Staff</div>
            <div className="text-xs text-primary-maroon">20% of expenses</div>
          </div>
          <div className="text-center p-4 bg-soft-beige rounded-lg">
            <div className="text-2xl font-bold text-primary-maroon">₹{(stats.totalExpenses * 0.15).toLocaleString()}</div>
            <div className="text-sm text-text-dark/70">Other</div>
            <div className="text-xs text-primary-maroon">15% of expenses</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-ivory-white p-3 sm:p-4 rounded-lg shadow-soft border-l-4 border-primary-maroon cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMenu('products')}>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-maroon font-playfair">{stats.totalProducts}</div>
          <div className="text-xs sm:text-sm text-text-dark/70 font-inter">Products</div>
        </div>
        
        <div className="bg-ivory-white p-3 sm:p-4 rounded-lg shadow-soft border-l-4 border-accent-gold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMenu('orders')}>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent-gold font-playfair">{stats.totalOrders}</div>
          <div className="text-xs sm:text-sm text-text-dark/70 font-inter">Orders</div>
        </div>
        
        <div className="bg-ivory-white p-3 sm:p-4 rounded-lg shadow-soft border-l-4 border-deep-maroon cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMenu('customers')}>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-deep-maroon font-playfair">{stats.totalCustomers}</div>
          <div className="text-xs sm:text-sm text-text-dark/70 font-inter">Customers</div>
        </div>
        
        <div className="bg-ivory-white p-3 sm:p-4 rounded-lg shadow-soft border-l-4 border-royal-gold hover:shadow-lg hover:scale-105 transition-all duration-200">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-royal-gold font-playfair">₹{(stats.totalRevenue / stats.totalOrders || 0).toLocaleString()}</div>
          <div className="text-xs sm:text-sm text-text-dark/70 font-inter">Avg Order</div>
        </div>
        
        <div className="bg-ivory-white p-3 sm:p-4 rounded-lg shadow-soft border-l-4 border-red-500 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMenu('inventory')}>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 font-playfair">{stats.lowStockItems}</div>
          <div className="text-xs sm:text-sm text-text-dark/70 font-inter">Low Stock</div>
        </div>
        
        <div className="bg-ivory-white p-3 sm:p-4 rounded-lg shadow-soft border-l-4 border-orange-500 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMenu('orders')}>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 font-playfair">{stats.pendingOrders}</div>
          <div className="text-xs sm:text-sm text-text-dark/70 font-inter">Pending</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-ivory-white p-4 sm:p-6 rounded-lg shadow-soft">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-primary-maroon font-playfair">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            <button 
              onClick={() => setActiveMenu('products')}
              className="w-full bg-primary-maroon text-ivory-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-left hover:bg-deep-maroon transition-colors font-inter flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
            <button 
              onClick={() => setActiveMenu('orders')}
              className="w-full bg-accent-gold text-ivory-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-left hover:bg-royal-gold transition-colors font-inter flex items-center gap-2 text-sm sm:text-base"
            >
              <ShoppingCart className="w-4 h-4" />
              Process Orders
            </button>
            <button 
              onClick={() => setActiveMenu('inventory')}
              className="w-full bg-deep-maroon text-ivory-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-left hover:bg-primary-maroon transition-colors font-inter flex items-center gap-2 text-sm sm:text-base"
            >
              <Package className="w-4 h-4" />
              Update Inventory
            </button>
            <button 
              onClick={() => setActiveMenu('reports')}
              className="w-full bg-royal-gold text-text-dark py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-left hover:bg-accent-gold transition-colors font-inter flex items-center gap-2 text-sm sm:text-base"
            >
              <TrendingUp className="w-4 h-4" />
              Generate Reports
            </button>
          </div>
        </div>
        
        <div className="bg-ivory-white p-4 sm:p-6 rounded-lg shadow-soft">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-primary-maroon font-playfair">Recent Activity</h3>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            {JSON.parse(localStorage.getItem('user-activity') || '[]').slice(-5).reverse().map((activity, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-soft-beige last:border-b-0 gap-1 sm:gap-0">
                <div>
                  <span className="font-medium text-text-dark font-inter text-xs sm:text-sm truncate">{activity.email}</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full font-inter ${
                    activity.action === 'login' ? 'bg-accent-gold/20 text-accent-gold' :
                    activity.action === 'signup' ? 'bg-primary-maroon/20 text-primary-maroon' :
                    'bg-soft-beige text-text-dark'
                  }`}>
                    {activity.action}
                  </span>
                </div>
                <span className="text-text-dark/50 text-xs font-inter sm:text-right">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsManagement = ({ downloadPDF, downloadExcel, showToast }) => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('admin-products') || '[]');
    setProducts(savedProducts);
  }, []);

  const totalPages = Math.ceil(products.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + recordsPerPage);

  const handleDownload = (format) => {
    if (format === 'pdf') {
      downloadPDF(products, 'products-report');
    } else {
      downloadExcel(products, 'products-report');
    }
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('admin-products', JSON.stringify(updated));
    showToast('Product deleted successfully', 'success');
    
    // Adjust page if needed
    const newTotalPages = Math.ceil(updated.length / recordsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-maroon font-playfair">Products Management</h2>
          <p className="text-sm text-text-dark/70 font-inter">Total: {products.length} products</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-accent-gold/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'cards' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'list' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-2 bg-primary-maroon text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors font-inter text-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="flex items-center gap-2 bg-accent-gold text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-royal-gold transition-colors font-inter text-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>
      
      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="bg-ivory-white rounded-lg shadow-soft p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-primary-maroon font-playfair text-sm line-clamp-2">{product.name}</h3>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Price:</span>
                  <span className="font-bold text-primary-maroon">₹{product.discountedPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Stock:</span>
                  <span className={`font-medium ${
                    (product.stock || 0) <= 5 ? 'text-red-600' : 'text-green-600'
                  }`}>{product.stock || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Rating:</span>
                  <span className="font-medium">{product.rating || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-ivory-white rounded-lg shadow-soft overflow-hidden">
          {/* Mobile List */}
          <div className="lg:hidden">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="border-b border-soft-beige p-4 hover:bg-soft-beige">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-maroon font-playfair text-sm mb-2">{product.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-text-dark/70">Category:</span> {product.category}</div>
                      <div><span className="text-text-dark/70">Price:</span> ₹{product.discountedPrice?.toLocaleString()}</div>
                      <div><span className="text-text-dark/70">Stock:</span> 
                        <span className={`ml-1 ${
                          (product.stock || 0) <= 5 ? 'text-red-600' : 'text-green-600'
                        }`}>{product.stock || 0}</span>
                      </div>
                      <div><span className="text-text-dark/70">Rating:</span> {product.rating || 'N/A'}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-primary-maroon text-ivory-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-beige">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-soft-beige">
                    <td className="px-6 py-4 text-sm font-medium text-text-dark">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-text-dark/70">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary-maroon">₹{product.discountedPrice?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`font-medium ${
                        (product.stock || 0) <= 5 ? 'text-red-600' : 'text-green-600'
                      }`}>{product.stock || 0}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.rating || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const OrdersManagement = ({ downloadPDF, downloadExcel, showToast }) => {
  const [orders, setOrders] = useState([]);
  const [viewMode, setViewMode] = useState('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('admin-orders') || '[]');
    if (savedOrders.length === 0) {
      // Initialize with sample orders
      const sampleOrders = [
        {
          id: 'ORD001',
          customerName: 'Priya Sharma',
          email: 'priya@email.com',
          phone: '9876543210',
          items: [{ name: 'Royal Banarasi Silk Saree', price: 9749, quantity: 1 }],
          total: 9749,
          paymentStatus: 'Paid',
          deliveryStatus: 'Shipped',
          orderDate: new Date().toISOString().split('T')[0],
          address: 'Mumbai, Maharashtra'
        },
        {
          id: 'ORD002',
          customerName: 'Anjali Patel',
          email: 'anjali@email.com',
          phone: '9123456789',
          items: [{ name: 'Bridal Lehenga Set', price: 18199, quantity: 1 }],
          total: 18199,
          paymentStatus: 'Pending',
          deliveryStatus: 'Processing',
          orderDate: new Date().toISOString().split('T')[0],
          address: 'Delhi, India'
        }
      ];
      localStorage.setItem('admin-orders', JSON.stringify(sampleOrders));
      setOrders(sampleOrders);
    } else {
      setOrders(savedOrders);
    }
  }, []);

  const totalPages = Math.ceil(orders.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + recordsPerPage);

  const handleDownload = (format) => {
    if (format === 'pdf') {
      downloadPDF(orders, 'orders-report');
    } else {
      downloadExcel(orders, 'orders-report');
    }
  };

  const updateOrderStatus = (orderId, field, value) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, [field]: value } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('admin-orders', JSON.stringify(updatedOrders));
    showToast(`Order ${field} updated`, 'success');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-maroon font-playfair">Orders Management</h2>
          <p className="text-sm text-text-dark/70 font-inter">Total: {orders.length} orders</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-accent-gold/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'cards' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'list' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-2 bg-primary-maroon text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors font-inter text-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="flex items-center gap-2 bg-accent-gold text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-royal-gold transition-colors font-inter text-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>
      
      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedOrders.map((order) => (
            <div key={order.id} className="bg-ivory-white rounded-lg shadow-soft p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-primary-maroon font-playfair text-sm">{order.id}</h3>
                <span className="text-xs text-text-dark/70">{order.orderDate}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Customer:</span>
                  <span className="font-medium">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Total:</span>
                  <span className="font-bold text-primary-maroon">₹{order.total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dark/70">Payment:</span>
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => updateOrderStatus(order.id, 'paymentStatus', e.target.value)}
                    className={`px-2 py-1 text-xs rounded-full border-0 ${
                      order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dark/70">Delivery:</span>
                  <select
                    value={order.deliveryStatus}
                    onChange={(e) => updateOrderStatus(order.id, 'deliveryStatus', e.target.value)}
                    className={`px-2 py-1 text-xs rounded-full border-0 ${
                      order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.deliveryStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-ivory-white rounded-lg shadow-soft overflow-hidden">
          <div className="lg:hidden">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="border-b border-soft-beige p-4 hover:bg-soft-beige">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-primary-maroon font-playfair text-sm">{order.id}</h3>
                  <span className="text-xs text-text-dark/70">{order.orderDate}</span>
                </div>
                <p className="text-sm text-text-dark mb-2">{order.customerName}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary-maroon text-sm">₹{order.total?.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.deliveryStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.deliveryStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-primary-maroon text-ivory-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Delivery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-beige">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-soft-beige">
                    <td className="px-6 py-4 text-sm font-medium text-text-dark">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-text-dark/70">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary-maroon">₹{order.total?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updateOrderStatus(order.id, 'paymentStatus', e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full border-0 ${
                          order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                          order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) => updateOrderStatus(order.id, 'deliveryStatus', e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full border-0 ${
                          order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.deliveryStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-dark/70">{order.orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const InventoryManagementWrapper = ({ downloadPDF, downloadExcel, showToast }) => {
  const [inventory, setInventory] = useState([]);
  const [viewMode, setViewMode] = useState('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    setInventory(products);
  }, []);

  const totalPages = Math.ceil(inventory.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedInventory = inventory.slice(startIndex, startIndex + recordsPerPage);

  const handleDownload = (format) => {
    if (format === 'pdf') {
      downloadPDF(inventory, 'inventory-report');
    } else {
      downloadExcel(inventory, 'inventory-report');
    }
  };

  const updateStock = (id, newStock) => {
    const updatedInventory = inventory.map(item => 
      item.id === id ? { ...item, stock: parseInt(newStock) } : item
    );
    setInventory(updatedInventory);
    localStorage.setItem('admin-products', JSON.stringify(updatedInventory));
    localStorage.setItem('saksham-products', JSON.stringify({ products: updatedInventory }));
    showToast('Stock updated successfully', 'success');
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= 5) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-maroon font-playfair">Inventory Management</h2>
          <p className="text-sm text-text-dark/70 font-inter">Total: {inventory.length} items</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-accent-gold/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'cards' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'list' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-2 bg-primary-maroon text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors font-inter text-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="flex items-center gap-2 bg-accent-gold text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-royal-gold transition-colors font-inter text-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>
      
      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedInventory.map((item) => {
            const stockInfo = getStockStatus(item.stock || 0);
            return (
              <div key={item.id} className="bg-ivory-white rounded-lg shadow-soft p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-primary-maroon font-playfair text-sm line-clamp-2">{item.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${stockInfo.color}`}>
                    {stockInfo.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-dark/70">Category:</span>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-dark/70">Price:</span>
                    <span className="font-bold text-primary-maroon">₹{item.discountedPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-dark/70">Stock:</span>
                    <input
                      type="number"
                      value={item.stock || 0}
                      onChange={(e) => updateStock(item.id, e.target.value)}
                      className="w-16 border rounded px-2 py-1 text-xs text-center"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-ivory-white rounded-lg shadow-soft overflow-hidden">
          <div className="lg:hidden">
            {paginatedInventory.map((item) => {
              const stockInfo = getStockStatus(item.stock || 0);
              return (
                <div key={item.id} className="border-b border-soft-beige p-4 hover:bg-soft-beige">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-maroon font-playfair text-sm">{item.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${stockInfo.color}`}>
                      {stockInfo.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-text-dark/70">
                      <span>{item.category} • ₹{item.discountedPrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-dark/70">Stock:</span>
                      <input
                        type="number"
                        value={item.stock || 0}
                        onChange={(e) => updateStock(item.id, e.target.value)}
                        className="w-16 border rounded px-2 py-1 text-xs text-center"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-primary-maroon text-ivory-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-beige">
                {paginatedInventory.map((item) => {
                  const stockInfo = getStockStatus(item.stock || 0);
                  return (
                    <tr key={item.id} className="hover:bg-soft-beige">
                      <td className="px-6 py-4 text-sm font-medium text-text-dark">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-text-dark/70">{item.category}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-maroon">₹{item.discountedPrice?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={item.stock || 0}
                          onChange={(e) => updateStock(item.id, e.target.value)}
                          className="w-20 border rounded px-2 py-1 text-sm text-center"
                          min="0"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${stockInfo.color}`}>
                          {stockInfo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => updateStock(item.id, (item.stock || 0) + 10)}
                          className="text-primary-maroon hover:text-deep-maroon font-medium"
                        >
                          +10
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const CustomerManagement = ({ downloadPDF, downloadExcel, showToast }) => {
  const [customers, setCustomers] = useState([]);
  const [viewMode, setViewMode] = useState('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('saksham-users') || '[]');
    setCustomers(users);
  }, []);

  const totalPages = Math.ceil(customers.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedCustomers = customers.slice(startIndex, startIndex + recordsPerPage);

  const handleDownload = (format) => {
    if (format === 'pdf') {
      downloadPDF(customers, 'customers-report');
    } else {
      downloadExcel(customers, 'customers-report');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-maroon font-playfair">Customer Management</h2>
          <p className="text-sm text-text-dark/70 font-inter">Total: {customers.length} customers</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-accent-gold/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'cards' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'list' ? 'bg-primary-maroon text-ivory-white' : 'text-primary-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-2 bg-primary-maroon text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors font-inter text-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="flex items-center gap-2 bg-accent-gold text-ivory-white px-3 sm:px-4 py-2 rounded-lg hover:bg-royal-gold transition-colors font-inter text-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>
      
      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedCustomers.map((customer, index) => (
            <div key={index} className="bg-ivory-white rounded-lg shadow-soft p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-maroon rounded-full flex items-center justify-center">
                  <span className="text-ivory-white font-bold text-sm">
                    {(customer.name || customer.email).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-maroon font-playfair text-sm">
                    {customer.name || 'N/A'}
                  </h3>
                  <p className="text-xs text-text-dark/70 truncate">{customer.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Registered:</span>
                  <span className="font-medium">
                    {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dark/70">Status:</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-accent-gold/20 text-accent-gold font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-ivory-white rounded-lg shadow-soft overflow-hidden">
          {/* Mobile List */}
          <div className="lg:hidden">
            {paginatedCustomers.map((customer, index) => (
              <div key={index} className="border-b border-soft-beige p-4 hover:bg-soft-beige">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-maroon rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ivory-white font-bold text-sm">
                      {(customer.name || customer.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-maroon font-playfair text-sm mb-1">
                      {customer.name || 'N/A'}
                    </h3>
                    <p className="text-xs text-text-dark/70 mb-2">{customer.email}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-dark/70">
                        {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-accent-gold/20 text-accent-gold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-primary-maroon text-ivory-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-beige">
                {paginatedCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-soft-beige">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-maroon rounded-full flex items-center justify-center">
                          <span className="text-ivory-white font-bold text-xs">
                            {(customer.name || customer.email).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-text-dark">
                          {customer.name || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark/70">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark/70">
                      {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-gold/20 text-accent-gold">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const SettingsManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-maroon font-playfair">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-ivory-white p-6 rounded-lg shadow-soft">
          <h3 className="text-lg font-semibold mb-4 text-primary-maroon font-playfair">Store Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2 font-inter">Store Name</label>
              <input 
                type="text" 
                defaultValue="Saksham Fashion Zone" 
                className="w-full border border-accent-gold/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-maroon font-inter" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2 font-inter">Store Address</label>
              <textarea 
                defaultValue="Merta Road, Sadar Bazar, Near Namdev Vashtra Bhandar" 
                className="w-full border border-accent-gold/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-maroon font-inter" 
                rows="3" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2 font-inter">Contact Number</label>
              <input 
                type="text" 
                defaultValue="9588253490" 
                className="w-full border border-accent-gold/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-maroon font-inter" 
              />
            </div>
            <button className="w-full bg-primary-maroon text-ivory-white py-2 px-4 rounded-lg hover:bg-deep-maroon transition-colors font-inter">
              Save Settings
            </button>
          </div>
        </div>
        
        <div className="bg-ivory-white p-6 rounded-lg shadow-soft">
          <h3 className="text-lg font-semibold mb-4 text-primary-maroon font-playfair">Notification Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded text-primary-maroon" />
              <span className="font-inter text-text-dark">Email notifications for new orders</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded text-primary-maroon" />
              <span className="font-inter text-text-dark">SMS notifications for low stock</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded text-primary-maroon" />
              <span className="font-inter text-text-dark">Daily sales reports</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded text-primary-maroon" />
              <span className="font-inter text-text-dark">Weekly analytics summary</span>
            </label>
            <button className="w-full bg-accent-gold text-ivory-white py-2 px-4 rounded-lg hover:bg-royal-gold transition-colors mt-4 font-inter">
              Update Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;