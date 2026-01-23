import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock components for testing messaging functionality
const MessageComponent = ({ message, position = 'center' }) => (
  <div data-testid="message" className={`message-${position}`}>
    {message}
  </div>
);

const BelowCenterComponent = ({ children, position = 'below-center' }) => (
  <div data-testid="below-center" className={`position-${position}`}>
    {children}
  </div>
);

describe('Messaging Tests', () => {
  test('renders message component correctly', () => {
    render(<MessageComponent message="Test message" />);
    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('applies correct position class for center', () => {
    render(<MessageComponent message="Center message" position="center" />);
    const messageElement = screen.getByTestId('message');
    expect(messageElement).toHaveClass('message-center');
  });

  test('applies correct position class for below-center', () => {
    render(<MessageComponent message="Below center message" position="below-center" />);
    const messageElement = screen.getByTestId('message');
    expect(messageElement).toHaveClass('message-below-center');
  });

  test('handles empty message gracefully', () => {
    render(<MessageComponent message="" />);
    const messageElement = screen.getByTestId('message');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toBeEmptyDOMElement();
  });

  test('handles long messages', () => {
    const longMessage = 'This is a very long message that should be handled properly by the component without breaking the layout or causing any issues';
    render(<MessageComponent message={longMessage} />);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });
});

describe('Below Center Position Tests', () => {
  test('renders below-center component correctly', () => {
    render(
      <BelowCenterComponent>
        <span>Test content</span>
      </BelowCenterComponent>
    );
    expect(screen.getByTestId('below-center')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies correct position class', () => {
    render(
      <BelowCenterComponent position="below-center">
        <span>Content</span>
      </BelowCenterComponent>
    );
    const element = screen.getByTestId('below-center');
    expect(element).toHaveClass('position-below-center');
  });

  test('handles multiple children', () => {
    render(
      <BelowCenterComponent>
        <span>First child</span>
        <span>Second child</span>
      </BelowCenterComponent>
    );
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });

  test('handles nested components', () => {
    render(
      <BelowCenterComponent>
        <MessageComponent message="Nested message" />
      </BelowCenterComponent>
    );
    expect(screen.getByText('Nested message')).toBeInTheDocument();
  });
});

describe('Integration Tests', () => {
  test('message and below-center components work together', () => {
    render(
      <BelowCenterComponent>
        <MessageComponent message="Integrated message" position="below-center" />
      </BelowCenterComponent>
    );
    
    const belowCenterElement = screen.getByTestId('below-center');
    const messageElement = screen.getByTestId('message');
    
    expect(belowCenterElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('message-below-center');
    expect(screen.getByText('Integrated message')).toBeInTheDocument();
  });
});