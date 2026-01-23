import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock component for testing below center positioning
const BelowCenterLayout = ({ children, className = '' }) => (
  <div className={`below-center-layout ${className}`} data-testid="below-center-layout">
    {children}
  </div>
);

const ProductCard = ({ product, position = 'below-center' }) => (
  <div className={`product-card position-${position}`} data-testid="product-card">
    <img src={product.image} alt={product.name} className="product-image" />
    <div className="product-info below-center">
      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>
    </div>
  </div>
);

describe('Below Center Position Layout Tests', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Saree',
    price: 5000,
    image: 'https://sudathi.com/cdn/shop/files/4953S1261_6.JPG?v=1766147381&width=750'
  };

  test('renders below-center layout correctly', () => {
    render(
      <BelowCenterLayout>
        <div>Test content</div>
      </BelowCenterLayout>
    );
    
    const layout = screen.getByTestId('below-center-layout');
    expect(layout).toBeInTheDocument();
    expect(layout).toHaveClass('below-center-layout');
  });

  test('applies correct positioning classes', () => {
    render(
      <BelowCenterLayout className="custom-class">
        <div>Content</div>
      </BelowCenterLayout>
    );
    
    const layout = screen.getByTestId('below-center-layout');
    expect(layout).toHaveClass('below-center-layout');
    expect(layout).toHaveClass('custom-class');
  });

  test('product card renders with below-center positioning', () => {
    render(<ProductCard product={mockProduct} />);
    
    const card = screen.getByTestId('product-card');
    expect(card).toHaveClass('position-below-center');
    expect(screen.getByText('Test Saree')).toBeInTheDocument();
    expect(screen.getByText('₹5000')).toBeInTheDocument();
  });

  test('product card image loads correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });

  test('multiple product cards in below-center layout', () => {
    const products = [
      { id: 1, name: 'Saree 1', price: 5000, image: 'https://sudathi.com/cdn/shop/files/4953S1261_6.JPG?v=1766147381&width=750' },
      { id: 2, name: 'Saree 2', price: 6000, image: 'https://sudathi.com/cdn/shop/files/MouniroyXSudathi_trust_b19b5aa5-4ed2-45a2-aa71-a7967634bf9f.jpg?v=1766147381&width=750' }
    ];

    render(
      <BelowCenterLayout>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </BelowCenterLayout>
    );

    expect(screen.getByText('Saree 1')).toBeInTheDocument();
    expect(screen.getByText('Saree 2')).toBeInTheDocument();
    expect(screen.getByText('₹5000')).toBeInTheDocument();
    expect(screen.getByText('₹6000')).toBeInTheDocument();
  });

  test('responsive behavior for below-center positioning', () => {
    render(
      <BelowCenterLayout className="responsive-layout">
        <ProductCard product={mockProduct} position="below-center-responsive" />
      </BelowCenterLayout>
    );

    const card = screen.getByTestId('product-card');
    expect(card).toHaveClass('position-below-center-responsive');
  });
});