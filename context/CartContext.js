import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Get products from admin or fallback to default
const getProducts = () => {
  const adminProducts = localStorage.getItem('saksham-products');
  if (adminProducts) {
    return JSON.parse(adminProducts).products;
  }
  // Fallback to default products
  return [
    {
      id: 1,
      name: "Royal Banarasi Silk Saree",
      category: "Sarees",
      fabric: "Pure Banarasi Silk",
      occasion: "Wedding",
      originalPrice: 12999,
      discountedPrice: 9749,
      stock: 25,
      comboEligible: true
    },
    {
      id: 2,
      name: "Designer Embroidered Blouse",
      category: "Blouses",
      fabric: "Silk Blend",
      occasion: "Party",
      originalPrice: 3999,
      discountedPrice: 2999,
      stock: 45,
      comboEligible: true
    }
  ];
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem('saksham-cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saksham-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getComboDiscount = () => {
    const adminOffers = localStorage.getItem('admin-offers');
    let comboDiscountPercent = 5; // default
    
    if (adminOffers) {
      const offers = JSON.parse(adminOffers);
      const activeComboOffer = offers.find(offer => 
        offer.isActive && 
        offer.title.toLowerCase().includes('combo') &&
        new Date(offer.validUntil) > new Date()
      );
      if (activeComboOffer) {
        comboDiscountPercent = activeComboOffer.discountPercent;
      }
    }
    
    const hasSaree = state.items.some(item => item.category === 'Sarees');
    const hasBlouse = state.items.some(item => item.category === 'Blouses');
    
    if (hasSaree && hasBlouse) {
      return getCartTotal() * (comboDiscountPercent / 100);
    }
    return 0;
  };

  const getFinalTotal = () => {
    return getCartTotal() - getComboDiscount();
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getComboDiscount,
    getFinalTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};