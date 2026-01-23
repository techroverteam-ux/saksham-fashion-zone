import React, { useState, useEffect } from 'react';
import { Package, CreditCard, Truck, Eye, Edit } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Load orders from localStorage or generate mock data
    const savedOrders = localStorage.getItem('admin-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Generate mock orders
      const mockOrders = [
        {
          id: 'ORD001',
          customerName: 'Priya Sharma',
          email: 'priya@email.com',
          phone: '9876543210',
          items: [
            { name: 'Royal Banarasi Silk Saree', price: 9749, quantity: 1 },
            { name: 'Designer Blouse', price: 2999, quantity: 1 }
          ],
          total: 12748,
          paymentStatus: 'Paid',
          deliveryStatus: 'Shipped',
          orderDate: '2024-01-28',
          address: 'Mumbai, Maharashtra'
        },
        {
          id: 'ORD002',
          customerName: 'Anjali Patel',
          email: 'anjali@email.com',
          phone: '9123456789',
          items: [
            { name: 'Bridal Lehenga Set', price: 18199, quantity: 1 }
          ],
          total: 18199,
          paymentStatus: 'Pending',
          deliveryStatus: 'Processing',
          orderDate: '2024-01-29',
          address: 'Delhi, India'
        },
        {
          id: 'ORD003',
          customerName: 'Meera Singh',
          email: 'meera@email.com',
          phone: '9988776655',
          items: [
            { name: 'Festive Cotton Saree', price: 3499, quantity: 2 }
          ],
          total: 6998,
          paymentStatus: 'Paid',
          deliveryStatus: 'Delivered',
          orderDate: '2024-01-27',
          address: 'Jaipur, Rajasthan'
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('admin-orders', JSON.stringify(mockOrders));
    }
  }, []);

  const updateOrderStatus = (orderId, field, value) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, [field]: value } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('admin-orders', JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status, type) => {
    if (type === 'payment') {
      return status === 'Paid' ? 'bg-green-100 text-green-800' : 
             status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
             'bg-red-100 text-red-800';
    } else {
      return status === 'Delivered' ? 'bg-green-100 text-green-800' :
             status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
             status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
             'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Management
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-xs text-gray-400">{order.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => updateOrderStatus(order.id, 'paymentStatus', e.target.value)}
                    className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(order.paymentStatus, 'payment')}`}
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
                    className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(order.deliveryStatus, 'delivery')}`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.orderDate}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details - {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                  <p><strong>Address:</strong> {selectedOrder.address}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Order Status</h4>
                  <p><strong>Payment:</strong> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.paymentStatus, 'payment')}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </p>
                  <p><strong>Delivery:</strong> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.deliveryStatus, 'delivery')}`}>
                      {selectedOrder.deliveryStatus}
                    </span>
                  </p>
                  <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Items Ordered</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm">{item.name}</td>
                          <td className="px-4 py-2 text-sm">₹{item.price.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-2 text-sm font-medium text-right">Total:</td>
                        <td className="px-4 py-2 text-sm font-bold">₹{selectedOrder.total.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;