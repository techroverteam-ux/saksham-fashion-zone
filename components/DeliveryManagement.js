import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('admin-orders') || '[]');
    const deliveryData = orders.map(order => ({
      id: order.id,
      orderId: order.id,
      customerName: order.customerName,
      customerPhone: order.phone,
      address: order.address,
      items: order.items,
      total: order.total,
      status: order.deliveryStatus || 'Processing',
      trackingNumber: `TRK${order.id}${Math.floor(Math.random() * 1000)}`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      actualDelivery: order.deliveryStatus === 'Delivered' ? new Date().toISOString().split('T')[0] : null,
      courier: 'BlueDart Express',
      deliveryFee: order.total > 2000 ? 0 : 50
    }));
    setDeliveries(deliveryData);
  }, []);

  const updateDeliveryStatus = (id, status) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === id ? { 
        ...delivery, 
        status,
        actualDelivery: status === 'Delivered' ? new Date().toISOString().split('T')[0] : delivery.actualDelivery
      } : delivery
    ));
    
    // Update orders as well
    const orders = JSON.parse(localStorage.getItem('admin-orders') || '[]');
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, deliveryStatus: status } : order
    );
    localStorage.setItem('admin-orders', JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Out for Delivery': return <MapPin className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statusOptions = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Delivery Management</h2>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {statusOptions.slice(0, 4).map(status => {
          const count = deliveries.filter(d => d.status === status).length;
          return (
            <div key={status} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{status}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                {getStatusIcon(status)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Delivery</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td className="px-6 py-4 text-sm font-medium">{delivery.orderId}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{delivery.customerName}</div>
                    <div className="text-sm text-gray-500">{delivery.customerPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm max-w-xs truncate">{delivery.address}</td>
                <td className="px-6 py-4">
                  <select
                    value={delivery.status}
                    onChange={(e) => updateDeliveryStatus(delivery.id, e.target.value)}
                    className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(delivery.status)}`}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm font-mono">{delivery.trackingNumber}</td>
                <td className="px-6 py-4 text-sm">{delivery.estimatedDelivery}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedDelivery(delivery)}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Delivery Details - {selectedDelivery.orderId}</h3>
              <button onClick={() => setSelectedDelivery(null)} className="text-gray-500">×</button>
            </div>

            <div className="space-y-6">
              {/* Customer & Address */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <p><strong>Name:</strong> {selectedDelivery.customerName}</p>
                  <p><strong>Phone:</strong> {selectedDelivery.customerPhone}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Delivery Address</h4>
                  <p>{selectedDelivery.address}</p>
                </div>
              </div>

              {/* Tracking Info */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Tracking Number</h4>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{selectedDelivery.trackingNumber}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Courier</h4>
                  <p>{selectedDelivery.courier}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Delivery Fee</h4>
                  <p>₹{selectedDelivery.deliveryFee}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h4 className="font-medium mb-4">Delivery Timeline</h4>
                <div className="space-y-3">
                  {['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((status, index) => {
                    const isCompleted = statusOptions.indexOf(selectedDelivery.status) >= statusOptions.indexOf(status);
                    const isCurrent = selectedDelivery.status === status;
                    
                    return (
                      <div key={status} className={`flex items-center gap-3 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-4 h-4 rounded-full border-2 ${isCompleted ? 'bg-green-600 border-green-600' : 'border-gray-300'} ${isCurrent ? 'animate-pulse' : ''}`}></div>
                        <span className={`${isCurrent ? 'font-semibold' : ''}`}>{status}</span>
                        {isCompleted && <span className="text-xs">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-medium mb-2">Items to Deliver</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs">Item</th>
                        <th className="px-4 py-2 text-left text-xs">Qty</th>
                        <th className="px-4 py-2 text-left text-xs">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedDelivery.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm">{item.name}</td>
                          <td className="px-4 py-2 text-sm">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm">₹{item.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
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

export default DeliveryManagement;