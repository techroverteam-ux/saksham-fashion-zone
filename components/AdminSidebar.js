import React from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Truck, 
  BarChart3, Settings, LogOut, Warehouse 
} from 'lucide-react';

const AdminSidebar = ({ activeMenu, setActiveMenu, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-primary-maroon text-ivory-white h-screen overflow-y-auto">
      <div className="p-6 border-b border-deep-maroon">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-royal-gold rounded-full flex items-center justify-center">
            <span className="text-primary-maroon font-bold text-lg font-playfair">S</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-royal-gold font-playfair">Saksham Admin</h2>
            <p className="text-soft-beige text-sm font-inter">Fashion Zone ERP</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-deep-maroon transition-colors font-inter ${
                activeMenu === item.id ? 'bg-deep-maroon border-r-4 border-royal-gold text-royal-gold' : 'text-ivory-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t border-deep-maroon">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-300 hover:bg-red-900/20 rounded-lg transition-colors font-inter"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;