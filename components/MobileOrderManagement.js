import React, { useState, useEffect } from 'react';
import { Package, CreditCard, Truck, Eye, Edit, User, Phone, MapPin, Calendar, Filter } from 'lucide-react';

const MobileOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    // Generate comprehensive orders with user data
    const users = JSON.parse(localStorage.getItem('saksham-users') || '[]');
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    
    const mockOrders = [
      {
        id: 'ORD001',
        userId: users[0]?.id || 1,
        customerName: users[0]?.name || 'Priya Sharma',
        email: users[0]?.email || 'priya@email.com',
        phone: users[0]?.phone || '9876543210',
        items: [
          { 
            id: 1,
            name: 'Royal Banarasi Silk Saree', 
            price: 9749, 
            quantity: 1,
            variant: 'Red - Free Size',
            image: products[0]?.mainImages?.[0]?.url || null
          },
          { 
            id: 2,
            name: 'Designer Blouse', 
            price: 2999, 
            quantity: 1,
            variant: 'Red - M',
            image: products[1]?.mainImages?.[0]?.url || null
          }
        ],
        subtotal: 12748,
        shipping: 0,
        tax: 1020,
        total: 13768,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI',
        deliveryStatus: 'Shipped',
        orderDate: '2024-01-28',
        expectedDelivery: '2024-02-02',
        address: {
          street: '123 Fashion Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          landmark: 'Near Metro Station'
        },
        trackingNumber: 'TRK001234567',
        notes: 'Handle with care - delicate fabric'
      },
      {
        id: 'ORD002',
        userId: users[1]?.id || 2,
        customerName: users[1]?.name || 'Anjali Patel',
        email: users[1]?.email || 'anjali@email.com',
        phone: users[1]?.phone || '9123456789',
        items: [
          { 
            id: 3,
            name: 'Bridal Lehenga Set', 
            price: 18199, 
            quantity: 1,
            variant: 'Gold - L',
            image: null
          }
        ],
        subtotal: 18199,
        shipping: 200,
        tax: 1456,
        total: 19855,
        paymentStatus: 'Pending',
        paymentMethod: 'COD',
        deliveryStatus: 'Processing',
        orderDate: '2024-01-29',
        expectedDelivery: '2024-02-05',
        address: {
          street: '456 Silk Road',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          landmark: 'Opposite Mall'
        },
        trackingNumber: 'TRK001234568',
        notes: 'Customer requested express delivery'
      },
      {
        id: 'ORD003',
        userId: users[2]?.id || 3,
        customerName: users[2]?.name || 'Meera Singh',
        email: users[2]?.email || 'meera@email.com',
        phone: users[2]?.phone || '9988776655',
        items: [
          { 
            id: 4,
            name: 'Festive Cotton Saree', 
            price: 3499, 
            quantity: 2,
            variant: 'Blue - Free Size',
            image: null
          }
        ],
        subtotal: 6998,
        shipping: 0,
        tax: 560,
        total: 7558,
        paymentStatus: 'Paid',
        paymentMethod: 'Card',
        deliveryStatus: 'Delivered',
        orderDate: '2024-01-27',
        expectedDelivery: '2024-02-01',
        deliveredDate: '2024-01-31',
        address: {
          street: '789 Heritage Lane',
          city: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302001',
          landmark: 'Near City Palace'
        },
        trackingNumber: 'TRK001234569',
        notes: 'Delivered successfully'
      }
    ];
    
    setOrders(mockOrders);
    localStorage.setItem('admin-orders', JSON.stringify(mockOrders));
  }, []);

  const updateOrderStatus = (orderId, field, value) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        [field]: value,
        ...(field === 'deliveryStatus' && value === 'Delivered' ? { deliveredDate: new Date().toISOString().split('T')[0] } : {})
      } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('admin-orders', JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status, type) => {
    if (type === 'payment') {
      return status === 'Paid' ? 'bg-green-100 text-green-800 border-green-200' : 
             status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
             'bg-red-100 text-red-800 border-red-200';
    } else {
      return status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' :
             status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-200' :
             status === 'Processing' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
             'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending-payment') return order.paymentStatus === 'Pending';
    if (filterStatus === 'processing') return order.deliveryStatus === 'Processing';
    if (filterStatus === 'shipped') return order.deliveryStatus === 'Shipped';
    if (filterStatus === 'delivered') return order.deliveryStatus === 'Delivered';
    return true;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.paymentStatus === 'Pending').length,
    processing: orders.filter(o => o.deliveryStatus === 'Processing').length,
    shipped: orders.filter(o => o.deliveryStatus === 'Shipped').length,
    delivered: orders.filter(o => o.deliveryStatus === 'Delivered').length,
    revenue: orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0)
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-6">
      <h2 className="text-xl lg:text-2xl font-bold">Order Management</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Total Orders</p>
              <p className="text-lg lg:text-2xl font-bold">{orderStats.total}</p>
            </div>
            <Package className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Revenue</p>
              <p className="text-lg lg:text-2xl font-bold">₹{orderStats.revenue.toLocaleString()}</p>
            </div>
            <CreditCard className="w-6 lg:w-8 h-6 lg:h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Pending</p>
              <p className="text-lg lg:text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
            </div>
            <Truck className="w-6 lg:w-8 h-6 lg:h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-3 text-base focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="pending-payment">Pending Payment</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          
          <button
            onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
            className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700"
          >
            {viewMode === 'cards' ? 'Table View' : 'Card View'}
          </button>
        </div>
      </div>

      {/* Orders Display */}
      {viewMode === 'cards' ? (
        /* Card View */
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">#{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.orderDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{order.total.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{order.items.length} items</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.phone}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <select
                  value={order.paymentStatus}
                  onChange={(e) => updateOrderStatus(order.id, 'paymentStatus', e.target.value)}
                  className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.paymentStatus, 'payment')}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
                
                <select
                  value={order.deliveryStatus}
                  onChange={(e) => updateOrderStatus(order.id, 'deliveryStatus', e.target.value)}
                  className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.deliveryStatus, 'delivery')}`}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Expected: {order.expectedDelivery}</p>
                  {order.deliveredDate && <p>Delivered: {order.deliveredDate}</p>}
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">#{order.id}</div>
                        <div className="text-xs text-gray-500">{order.orderDate}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-sm">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.phone}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">₹{order.total.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updateOrderStatus(order.id, 'paymentStatus', e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.paymentStatus, 'payment')}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) => updateOrderStatus(order.id, 'deliveryStatus', e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.deliveryStatus, 'delivery')}`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
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
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order #{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)}>×</button>
            </div>

            <div className="p-4 space-y-6">
              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Information
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </h4>
                  <div className="text-sm">
                    <p>{selectedOrder.address.street}</p>
                    <p>{selectedOrder.address.city}, {selectedOrder.address.state}</p>
                    <p>PIN: {selectedOrder.address.pincode}</p>
                    {selectedOrder.address.landmark && <p>Landmark: {selectedOrder.address.landmark}</p>}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover rounded" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.variant}</p>
                        <p className="text-xs">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>₹{selectedOrder.shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t pt-2">
                    <span>Total:</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Payment Status</h4>
                  <select
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, 'paymentStatus', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-1">Method: {selectedOrder.paymentMethod}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Delivery Status</h4>
                  <select
                    value={selectedOrder.deliveryStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, 'deliveryStatus', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-1">Tracking: {selectedOrder.trackingNumber}</p>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm bg-yellow-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileOrderManagement;