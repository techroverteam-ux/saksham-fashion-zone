import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { showAuth, authMode, setShowAuth, setAuthMode, login, signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  if (!showAuth) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (authMode === 'login') {
      // Simple login - in real app, verify credentials
      const users = JSON.parse(localStorage.getItem('saksham-users') || '[]');
      const user = users.find(u => u.email === formData.email);
      
      if (user) {
        login(user);
      } else {
        alert('User not found. Please sign up first.');
      }
    } else {
      // Signup
      if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill all required fields');
        return;
      }
      
      signup(formData);
    }
    
    setFormData({ name: '', email: '', phone: '', address: '', password: '' });
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setFormData({ name: '', email: '', phone: '', address: '', password: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-dark">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button 
            onClick={() => setShowAuth(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {authMode === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-primary-maroon"
                    placeholder="Enter your address"
                    rows="2"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-primary-maroon text-white py-3 rounded-lg font-semibold hover:bg-deep-maroon transition-colors"
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={switchMode}
              className="ml-2 text-primary-maroon font-semibold hover:underline"
            >
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {authMode === 'login' && (
          <div className="mt-4 text-center">
            <button className="text-sm text-gray-500 hover:text-primary-maroon">
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;