import React, { useState, useEffect } from 'react';
import { Download, FileText, BarChart3, TrendingUp, Calendar } from 'lucide-react';

const ReportsManagement = () => {
  const [reportData, setReportData] = useState({
    sales: [],
    inventory: [],
    customers: [],
    orders: []
  });
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Load data from localStorage
    const orders = JSON.parse(localStorage.getItem('admin-orders') || '[]');
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    const users = JSON.parse(localStorage.getItem('saksham-users') || '[]');
    
    setReportData({
      sales: orders,
      inventory: products,
      customers: users,
      orders: orders
    });
  }, []);

  const generateSalesReport = () => {
    const filteredOrders = reportData.sales.filter(order => {
      const orderDate = new Date(order.orderDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return orderDate >= startDate && orderDate <= endDate;
    });

    return {
      totalSales: filteredOrders.reduce((sum, order) => sum + order.total, 0),
      totalOrders: filteredOrders.length,
      avgOrderValue: filteredOrders.length > 0 ? filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length : 0,
      topProducts: getTopProducts(filteredOrders),
      salesByDate: getSalesByDate(filteredOrders)
    };
  };

  const getTopProducts = (orders) => {
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (productSales[item.name]) {
          productSales[item.name].quantity += item.quantity;
          productSales[item.name].revenue += item.price * item.quantity;
        } else {
          productSales[item.name] = {
            name: item.name,
            quantity: item.quantity,
            revenue: item.price * item.quantity
          };
        }
      });
    });
    
    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const getSalesByDate = (orders) => {
    const salesByDate = {};
    orders.forEach(order => {
      const date = order.orderDate;
      if (salesByDate[date]) {
        salesByDate[date] += order.total;
      } else {
        salesByDate[date] = order.total;
      }
    });
    return salesByDate;
  };

  const exportToCSV = (data, filename) => {
    let csv = '';
    
    if (filename.includes('sales')) {
      csv = 'Date,Order ID,Customer,Total,Status\n';
      data.forEach(order => {
        csv += `${order.orderDate},${order.id},${order.customerName},${order.total},${order.paymentStatus}\n`;
      });
    } else if (filename.includes('inventory')) {
      csv = 'Product Name,Category,Variants,Total Stock,Value\n';
      data.forEach(product => {
        const totalStock = product.variants?.reduce((sum, v) => sum + parseInt(v.stock || 0), 0) || 0;
        const totalValue = product.variants?.reduce((sum, v) => sum + (parseInt(v.stock || 0) * parseFloat(v.price || 0)), 0) || 0;
        csv += `${product.name},${product.category},${product.variants?.length || 0},${totalStock},${totalValue}\n`;
      });
    } else if (filename.includes('customers')) {
      csv = 'Name,Email,Registration Date,Status\n';
      data.forEach(customer => {
        csv += `${customer.name || 'N/A'},${customer.email},${customer.createdAt || 'N/A'},Active\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = (reportType) => {
    // Simple PDF generation using HTML to PDF conversion
    const printWindow = window.open('', '_blank');
    let content = '';
    
    if (reportType === 'sales') {
      const salesReport = generateSalesReport();
      content = `
        <html>
          <head>
            <title>Sales Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .header { text-align: center; margin-bottom: 30px; }
              .stats { display: flex; justify-content: space-around; margin: 20px 0; }
              .stat-box { text-align: center; padding: 10px; border: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Saksham Fashion Zone - Sales Report</h1>
              <p>Period: ${dateRange.start} to ${dateRange.end}</p>
            </div>
            
            <div class="stats">
              <div class="stat-box">
                <h3>Total Sales</h3>
                <p>₹${salesReport.totalSales.toLocaleString()}</p>
              </div>
              <div class="stat-box">
                <h3>Total Orders</h3>
                <p>${salesReport.totalOrders}</p>
              </div>
              <div class="stat-box">
                <h3>Avg Order Value</h3>
                <p>₹${salesReport.avgOrderValue.toFixed(2)}</p>
              </div>
            </div>
            
            <h2>Top Products</h2>
            <table>
              <tr><th>Product</th><th>Quantity Sold</th><th>Revenue</th></tr>
              ${salesReport.topProducts.map(product => 
                `<tr><td>${product.name}</td><td>${product.quantity}</td><td>₹${product.revenue.toLocaleString()}</td></tr>`
              ).join('')}
            </table>
            
            <h2>Orders</h2>
            <table>
              <tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr>
              ${reportData.sales.map(order => 
                `<tr><td>${order.id}</td><td>${order.customerName}</td><td>${order.orderDate}</td><td>₹${order.total.toLocaleString()}</td><td>${order.paymentStatus}</td></tr>`
              ).join('')}
            </table>
          </body>
        </html>
      `;
    }
    
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  const salesReport = generateSalesReport();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        
        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-green-600">₹{salesReport.totalSales.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{salesReport.totalOrders}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold">₹{salesReport.avgOrderValue.toFixed(0)}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold">{reportData.customers.length}</p>
            </div>
            <FileText className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Sales Report</h3>
          <div className="space-y-2">
            <button
              onClick={() => exportToCSV(reportData.sales, 'sales-report')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => exportToPDF('sales')}
              className="w-full bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Inventory Report</h3>
          <div className="space-y-2">
            <button
              onClick={() => exportToCSV(reportData.inventory, 'inventory-report')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => exportToPDF('inventory')}
              className="w-full bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Customer Report</h3>
          <div className="space-y-2">
            <button
              onClick={() => exportToCSV(reportData.customers, 'customers-report')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => exportToPDF('customers')}
              className="w-full bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Orders Report</h3>
          <div className="space-y-2">
            <button
              onClick={() => exportToCSV(reportData.orders, 'orders-report')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => exportToPDF('orders')}
              className="w-full bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Top Selling Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesReport.topProducts.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-sm">{product.quantity}</td>
                  <td className="px-6 py-4 text-sm font-medium">₹{product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;