const generateProducts = () => {
  return [
    {
      id: 1,
      name: "Royal Banarasi Silk Saree",
      description: "Exquisite handwoven Banarasi silk saree with intricate gold zari work.",
      category: "Sarees",
      subCategory: "Banarasi Sarees",
      collection: "Bridal Collection",
      fabric: "Banarasi Silk",
      occasion: "Wedding",
      originalPrice: 12000,
      discountedPrice: 9749,
      rating: 4.8,
      reviews: 45,
      reviewCount: 45,
      badges: ["Bestseller", "Premium"],
      features: ["Pure Silk", "Handwoven", "Gold Zari Work", "Traditional Design"],
      colors: [{name: "Red", code: "RED", hex: "#DC143C"}, {name: "Maroon", code: "MAROON", hex: "#800000"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.26.jpeg",
      stock: 15,
      isActive: true,
      isFeatured: true,
      comboEligible: true
    },
    {
      id: 2,
      name: "Designer Silk Blouse",
      description: "Elegant designer silk blouse with embroidered work.",
      category: "Blouses",
      subCategory: "Designer Blouses",
      collection: "Contemporary",
      fabric: "Pure Silk",
      occasion: "Party",
      originalPrice: 4000,
      discountedPrice: 3199,
      rating: 4.6,
      reviews: 32,
      reviewCount: 32,
      badges: ["New Arrival"],
      features: ["Silk Fabric", "Embroidered", "Designer Cut", "Perfect Fit"],
      colors: [{name: "Gold", code: "GOLD", hex: "#FFD700"}, {name: "Silver", code: "SILVER", hex: "#C0C0C0"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.27.jpeg",
      stock: 25,
      isActive: true,
      isFeatured: true,
      comboEligible: true
    },
    {
      id: 3,
      name: "Bridal Lehenga Set",
      description: "Stunning bridal lehenga set with heavy embroidery.",
      category: "Lehengas",
      subCategory: "Bridal Lehengas",
      collection: "Bridal Collection",
      fabric: "Velvet",
      occasion: "Wedding",
      originalPrice: 25000,
      discountedPrice: 18199,
      rating: 4.9,
      reviews: 28,
      reviewCount: 28,
      badges: ["Premium", "Limited Edition"],
      features: ["Heavy Embroidery", "Sequin Work", "Complete Set", "Bridal Special"],
      colors: [{name: "Red", code: "RED", hex: "#DC143C"}, {name: "Pink", code: "PINK", hex: "#FFC0CB"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.28.jpeg",
      stock: 8,
      isActive: true,
      isFeatured: true,
      comboEligible: false
    },
    {
      id: 4,
      name: "Anarkali Suit Set",
      description: "Beautiful Anarkali suit set with dupatta.",
      category: "Suits",
      subCategory: "Anarkali Suits",
      collection: "Festive",
      fabric: "Georgette",
      occasion: "Festival",
      originalPrice: 5500,
      discountedPrice: 4399,
      rating: 4.7,
      reviews: 41,
      reviewCount: 41,
      badges: ["Trending"],
      features: ["Georgette Fabric", "Complete Set", "Festival Special", "Elegant Design"],
      colors: [{name: "Yellow", code: "YELLOW", hex: "#FFFF00"}, {name: "Pink", code: "PINK", hex: "#FFC0CB"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.29.jpeg",
      stock: 20,
      isActive: true,
      isFeatured: true,
      comboEligible: false
    },
    {
      id: 5,
      name: "Cotton Casual Saree",
      description: "Comfortable cotton saree perfect for daily wear.",
      category: "Sarees",
      subCategory: "Cotton Sarees",
      collection: "Casual",
      fabric: "Cotton",
      occasion: "Casual",
      originalPrice: 2500,
      discountedPrice: 1999,
      rating: 4.4,
      reviews: 67,
      reviewCount: 67,
      badges: ["Bestseller"],
      features: ["Pure Cotton", "Lightweight", "Easy Care", "Comfortable"],
      colors: [{name: "Blue", code: "BLUE", hex: "#0000FF"}, {name: "Green", code: "GREEN", hex: "#008000"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.26 (1).jpeg",
      stock: 40,
      isActive: true,
      isFeatured: false,
      comboEligible: true
    },
    {
      id: 6,
      name: "Georgette Party Saree",
      description: "Elegant georgette saree with beautiful prints.",
      category: "Sarees",
      subCategory: "Georgette Sarees",
      collection: "Party Wear",
      fabric: "Georgette",
      occasion: "Party",
      originalPrice: 3500,
      discountedPrice: 2799,
      rating: 4.5,
      reviews: 38,
      reviewCount: 38,
      badges: ["Trending"],
      features: ["Georgette Fabric", "Beautiful Prints", "Party Perfect", "Elegant Drape"],
      colors: [{name: "Purple", code: "PURPLE", hex: "#800080"}, {name: "Orange", code: "ORANGE", hex: "#FFA500"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.27 (1).jpeg",
      stock: 22,
      isActive: true,
      isFeatured: true,
      comboEligible: true
    },
    {
      id: 7,
      name: "Traditional Cotton Blouse",
      description: "Classic cotton blouse with traditional design.",
      category: "Blouses",
      subCategory: "Cotton Blouses",
      collection: "Traditional",
      fabric: "Cotton",
      occasion: "Casual",
      originalPrice: 1800,
      discountedPrice: 1499,
      rating: 4.3,
      reviews: 54,
      reviewCount: 54,
      badges: ["Hot Deal"],
      features: ["Pure Cotton", "Traditional Design", "Comfortable Fit", "Easy Care"],
      colors: [{name: "White", code: "WHITE", hex: "#FFFFFF"}, {name: "Cream", code: "CREAM", hex: "#F5F5DC"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.28 (1).jpeg",
      stock: 35,
      isActive: true,
      isFeatured: false,
      comboEligible: true
    },
    {
      id: 8,
      name: "Party Wear Lehenga",
      description: "Stylish party wear lehenga with modern design.",
      category: "Lehengas",
      subCategory: "Party Lehengas",
      collection: "Party Wear",
      fabric: "Net",
      occasion: "Party",
      originalPrice: 8000,
      discountedPrice: 6399,
      rating: 4.6,
      reviews: 29,
      reviewCount: 29,
      badges: ["New Arrival"],
      features: ["Net Fabric", "Modern Design", "Party Perfect", "Stylish Cut"],
      colors: [{name: "Black", code: "BLACK", hex: "#000000"}, {name: "Navy", code: "NAVY", hex: "#000080"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.28 (2).jpeg",
      stock: 18,
      isActive: true,
      isFeatured: true,
      comboEligible: false
    },
    {
      id: 9,
      name: "Designer Palazzo Suit",
      description: "Modern palazzo suit with elegant design.",
      category: "Suits",
      subCategory: "Palazzo Suits",
      collection: "Contemporary",
      fabric: "Crepe",
      occasion: "Office",
      originalPrice: 4500,
      discountedPrice: 3599,
      rating: 4.4,
      reviews: 33,
      reviewCount: 33,
      badges: ["New Arrival"],
      features: ["Crepe Fabric", "Modern Cut", "Office Wear", "Comfortable"],
      colors: [{name: "Navy", code: "NAVY", hex: "#000080"}, {name: "Black", code: "BLACK", hex: "#000000"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.29 (1).jpeg",
      stock: 15,
      isActive: true,
      isFeatured: true,
      comboEligible: false
    },
    {
      id: 10,
      name: "Embroidered Silk Blouse",
      description: "Premium silk blouse with intricate embroidery.",
      category: "Blouses",
      subCategory: "Embroidered Blouses",
      collection: "Premium",
      fabric: "Silk",
      occasion: "Wedding",
      originalPrice: 3500,
      discountedPrice: 2799,
      rating: 4.7,
      reviews: 26,
      reviewCount: 26,
      badges: ["Premium"],
      features: ["Pure Silk", "Hand Embroidery", "Premium Quality", "Wedding Special"],
      colors: [{name: "Gold", code: "GOLD", hex: "#FFD700"}, {name: "Red", code: "RED", hex: "#DC143C"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.29 (2).jpeg",
      stock: 12,
      isActive: true,
      isFeatured: true,
      comboEligible: true
    },
    {
      id: 11,
      name: "Heavy Work Lehenga",
      description: "Luxurious lehenga with heavy embroidery work.",
      category: "Lehengas",
      subCategory: "Heavy Lehengas",
      collection: "Bridal Collection",
      fabric: "Silk",
      occasion: "Wedding",
      originalPrice: 35000,
      discountedPrice: 28999,
      rating: 4.9,
      reviews: 18,
      reviewCount: 18,
      badges: ["Premium", "Limited Edition"],
      features: ["Heavy Embroidery", "Pure Silk", "Bridal Special", "Handcrafted"],
      colors: [{name: "Red", code: "RED", hex: "#DC143C"}, {name: "Maroon", code: "MAROON", hex: "#800000"}],
      image: "/images/WhatsApp Image 2026-01-24 at 20.58.30.jpeg",
      stock: 5,
      isActive: true,
      isFeatured: true,
      comboEligible: false
    }
  ];
};

const productsData = {
  products: generateProducts(),
  filterOptions: {
    categories: ['Sarees', 'Blouses', 'Lehengas', 'Suits'],
    subCategories: {
      'Sarees': ['Silk Sarees', 'Cotton Sarees', 'Georgette Sarees', 'Banarasi Sarees', 'Designer Sarees'],
      'Blouses': ['Silk Blouses', 'Cotton Blouses', 'Designer Blouses', 'Embroidered Blouses', 'Party Wear Blouses'],
      'Lehengas': ['Bridal Lehengas', 'Party Lehengas', 'Designer Lehengas', 'Heavy Lehengas', 'Light Lehengas'],
      'Suits': ['Anarkali Suits', 'Straight Suits', 'Palazzo Suits', 'Sharara Suits', 'Designer Suits']
    },
    collections: ['Bridal Collection', 'Party Wear', 'Traditional', 'Contemporary', 'Festive', 'Casual'],
    fabrics: ['Pure Silk', 'Cotton Silk', 'Georgette', 'Chiffon', 'Banarasi Silk', 'Cotton', 'Velvet', 'Net', 'Satin', 'Crepe'],
    occasions: ['Wedding', 'Party', 'Festival', 'Casual', 'Office', 'Traditional', 'Modern'],
    colors: ['Red', 'Blue', 'Green', 'Pink', 'Purple', 'Orange', 'Yellow', 'Maroon', 'Navy', 'Black', 'White', 'Gold', 'Silver', 'Cream'],
    priceRanges: [
      {label: 'Under ₹2,000', min: 0, max: 2000},
      {label: '₹2,000 - ₹5,000', min: 2000, max: 5000},
      {label: '₹5,000 - ₹10,000', min: 5000, max: 10000},
      {label: 'Above ₹10,000', min: 10000, max: 999999}
    ]
  }
};

// Save to localStorage for admin portal
if (typeof window !== 'undefined') {
  const existingProducts = localStorage.getItem('admin-products');
  if (!existingProducts) {
    localStorage.setItem('admin-products', JSON.stringify(productsData.products));
  }
  localStorage.setItem('saksham-products', JSON.stringify(productsData));
  
  // Add sample users if none exist
  const existingUsers = localStorage.getItem('saksham-users');
  if (!existingUsers) {
    const sampleUsers = [
      {
        id: 1,
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "9876543210",
        password: "demo123",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 2,
        name: "Anjali Patel",
        email: "anjali.patel@email.com",
        phone: "9123456789",
        password: "demo123",
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 3,
        name: "Kavya Singh",
        email: "kavya.singh@email.com",
        phone: "9234567890",
        password: "demo123",
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 4,
        name: "Meera Gupta",
        email: "meera.gupta@email.com",
        phone: "9345678901",
        password: "demo123",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 5,
        name: "Riya Jain",
        email: "riya.jain@email.com",
        phone: "9456789012",
        password: "demo123",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 6,
        name: "Sanya Agarwal",
        email: "sanya.agarwal@email.com",
        phone: "9567890123",
        password: "demo123",
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 7,
        name: "Pooja Verma",
        email: "pooja.verma@email.com",
        phone: "9678901234",
        password: "demo123",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 8,
        name: "Neha Kapoor",
        email: "neha.kapoor@email.com",
        phone: "9789012345",
        password: "demo123",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 9,
        name: "Shreya Malhotra",
        email: "shreya.malhotra@email.com",
        phone: "9890123456",
        password: "demo123",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: 10,
        name: "Divya Reddy",
        email: "divya.reddy@email.com",
        phone: "9901234567",
        password: "demo123",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      }
    ];
    localStorage.setItem('saksham-users', JSON.stringify(sampleUsers));
    
    // Add sample user activity
    const sampleActivity = sampleUsers.map(user => ({
      email: user.email,
      action: 'signup',
      timestamp: user.createdAt
    }));
    localStorage.setItem('user-activity', JSON.stringify(sampleActivity));
  }
}

export default productsData;