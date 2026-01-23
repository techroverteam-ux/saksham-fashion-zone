const generateProducts = () => {
  const products = [];
  const categories = ['Sarees', 'Blouses', 'Lehengas'];
  const fabrics = ['Pure Silk', 'Cotton', 'Georgette', 'Chiffon', 'Velvet', 'Banarasi Silk', 'Cotton Silk'];
  const occasions = ['Wedding', 'Party', 'Festival', 'Casual', 'Office'];
  const collections = ['Bridal Collection', 'Party Wear', 'Traditional', 'Contemporary'];
  
  // Sudathi product images
  const sudathiImages = [
    'https://sudathi.com/cdn/shop/files/4953S1261_6.JPG?v=1766147381&width=750',
    'https://sudathi.com/cdn/shop/files/MouniroyXSudathi_trust_b19b5aa5-4ed2-45a2-aa71-a7967634bf9f.jpg?v=1766147381&width=750',
    'https://sudathi.com/cdn/shop/files/4953S1261_1.JPGa?v=1766147381&width=750'
  ];
  
  const colorVariants = [
    { name: 'Red', hex: '#DC2626', code: 'RED' },
    { name: 'Blue', hex: '#2563EB', code: 'BLUE' },
    { name: 'Green', hex: '#059669', code: 'GREEN' },
    { name: 'Pink', hex: '#DB2777', code: 'PINK' },
    { name: 'Purple', hex: '#7C3AED', code: 'PURPLE' },
    { name: 'Orange', hex: '#EA580C', code: 'ORANGE' },
    { name: 'Yellow', hex: '#D97706', code: 'YELLOW' },
    { name: 'Maroon', hex: '#7F1D1D', code: 'MAROON' },
    { name: 'Navy', hex: '#1E3A8A', code: 'NAVY' },
    { name: 'Black', hex: '#000000', code: 'BLACK' },
    { name: 'White', hex: '#FFFFFF', code: 'WHITE' },
    { name: 'Gold', hex: '#F59E0B', code: 'GOLD' }
  ];
  
  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const fabric = fabrics[Math.floor(Math.random() * fabrics.length)];
    const occasion = occasions[Math.floor(Math.random() * occasions.length)];
    const collection = collections[Math.floor(Math.random() * collections.length)];
    
    const basePrice = Math.floor(Math.random() * 20000) + 1000;
    const discount = Math.floor(Math.random() * 30) + 10;
    const discountedPrice = Math.floor(basePrice * (100 - discount) / 100);
    
    // Generate 2-5 color variants for each product
    const numVariants = Math.floor(Math.random() * 4) + 2;
    const availableColors = [...colorVariants].sort(() => 0.5 - Math.random()).slice(0, numVariants);
    
    products.push({
      id: i,
      name: `${fabric} ${category.slice(0, -1)} ${i}`,
      category,
      subCategory: `${fabric} ${category}`,
      collection,
      fabric,
      occasion,
      originalPrice: basePrice,
      discountedPrice,
      image: sudathiImages[i % sudathiImages.length],
      badges: i <= 20 ? ['New Arrival'] : i <= 40 ? ['Combo Eligible'] : ['Popular'],
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
      isNew: i <= 30,
      stock: Math.floor(Math.random() * 50) + 5,
      comboEligible: true,
      colors: availableColors,
      selectedColor: availableColors[0]
    });
  }
  
  return products;
};

const productsData = {
  products: generateProducts(),
  filterOptions: {
    categories: ['Sarees', 'Blouses', 'Lehengas', 'Accessories'],
    subCategories: ['Silk Sarees', 'Cotton Sarees', 'Georgette Sarees', 'Designer Blouses', 'Traditional Blouses', 'Modern Blouses', 'Bridal Lehengas'],
    collections: ['Bridal Collection', 'Party Wear', 'Traditional', 'Contemporary'],
    fabrics: ['Pure Silk', 'Cotton Silk', 'Georgette', 'Chiffon', 'Banarasi Silk', 'Cotton', 'Velvet'],
    occasions: ['Wedding', 'Party', 'Festival', 'Casual', 'Office'],
    colors: ['Red', 'Blue', 'Green', 'Pink', 'Purple', 'Orange', 'Yellow', 'Maroon', 'Navy', 'Black', 'White', 'Gold'],
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
  localStorage.setItem('saksham-products', JSON.stringify(productsData));
}

export default productsData;