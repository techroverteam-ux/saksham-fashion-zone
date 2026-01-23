import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    const savedUser = localStorage.getItem('saksham-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('saksham-user', JSON.stringify(userData));
    setShowAuth(false);
    
    // Track login
    const loginData = {
      userId: userData.id,
      email: userData.email,
      timestamp: new Date().toISOString(),
      action: 'login'
    };
    
    const userActivity = JSON.parse(localStorage.getItem('user-activity') || '[]');
    userActivity.push(loginData);
    localStorage.setItem('user-activity', JSON.stringify(userActivity));
  };

  const signup = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('saksham-user', JSON.stringify(newUser));
    setShowAuth(false);
    
    // Save to users database
    const users = JSON.parse(localStorage.getItem('saksham-users') || '[]');
    users.push(newUser);
    localStorage.setItem('saksham-users', JSON.stringify(users));
    
    // Track signup
    const signupData = {
      userId: newUser.id,
      email: newUser.email,
      timestamp: new Date().toISOString(),
      action: 'signup'
    };
    
    const userActivity = JSON.parse(localStorage.getItem('user-activity') || '[]');
    userActivity.push(signupData);
    localStorage.setItem('user-activity', JSON.stringify(userActivity));
  };

  const logout = () => {
    if (user) {
      // Track logout
      const logoutData = {
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString(),
        action: 'logout'
      };
      
      const userActivity = JSON.parse(localStorage.getItem('user-activity') || '[]');
      userActivity.push(logoutData);
      localStorage.setItem('user-activity', JSON.stringify(userActivity));
    }
    
    setUser(null);
    localStorage.removeItem('saksham-user');
  };

  const trackActivity = (action, data = {}) => {
    if (!user) return;
    
    const activityData = {
      userId: user.id,
      email: user.email,
      action,
      data,
      timestamp: new Date().toISOString()
    };
    
    const userActivity = JSON.parse(localStorage.getItem('user-activity') || '[]');
    userActivity.push(activityData);
    localStorage.setItem('user-activity', JSON.stringify(userActivity));
  };

  return (
    <AuthContext.Provider value={{
      user,
      showAuth,
      authMode,
      setShowAuth,
      setAuthMode,
      login,
      signup,
      logout,
      trackActivity
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};