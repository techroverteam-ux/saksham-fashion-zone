import React from 'react';

export const HeroSkeleton = () => (
  <section className="relative h-screen bg-gray-200 animate-pulse">
    <div className="relative z-10 h-full flex items-center justify-center px-4">
      <div className="text-center w-full max-w-6xl mx-auto">
        <div className="h-8 bg-gray-300 rounded-full w-64 mx-auto mb-8"></div>
        <div className="h-16 bg-gray-300 rounded w-96 mx-auto mb-6"></div>
        <div className="h-6 bg-gray-300 rounded w-80 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="h-12 bg-gray-300 rounded-lg w-48"></div>
          <div className="h-12 bg-gray-300 rounded-lg w-48"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded-full w-80 mx-auto"></div>
      </div>
    </div>
  </section>
);

export const CollectionsSkeleton = () => (
  <section className="py-12 sm:py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8 sm:mb-12">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="w-20 h-1 bg-gray-200 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-2xl mb-4"></div>
          </div>
        ))}
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ProductsSkeleton = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
        <div className="w-24 h-1 bg-gray-200 mx-auto mb-6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
            <div className="h-80 bg-gray-200"></div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-maroon"></div>
  </div>
);

export const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return fallback || (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-text-dark mb-4">Something went wrong</h3>
        <p className="text-gray-600 mb-6">Please refresh the page or try again later</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary-maroon text-white px-6 py-3 rounded-lg hover:bg-deep-maroon transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return children;
};