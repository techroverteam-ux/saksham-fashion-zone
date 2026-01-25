// Image Export Utility for downloading images from localStorage
export const ImageExporter = {
  // Export all product images as downloadable files
  exportAllImages: () => {
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    let imageCount = 0;
    
    products.forEach(product => {
      // Export main images
      product.mainImages?.forEach(img => {
        if (img.url && img.url.startsWith('data:')) {
          ImageExporter.downloadImage(img.url, img.fileName || `main_${product.id}_${imageCount++}.jpg`);
        }
      });
      
      // Export variant images
      product.variants?.forEach((variant, vIndex) => {
        variant.images?.forEach(img => {
          if (img.url && img.url.startsWith('data:')) {
            ImageExporter.downloadImage(img.url, img.fileName || `variant_${product.id}_${vIndex}_${imageCount++}.jpg`);
          }
        });
      });
    });
    
    return imageCount;
  },
  
  // Download a single image
  downloadImage: (dataUrl, filename) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  
  // Get image statistics
  getImageStats: () => {
    const products = JSON.parse(localStorage.getItem('admin-products') || '[]');
    let totalImages = 0;
    let totalSize = 0;
    
    products.forEach(product => {
      product.mainImages?.forEach(img => {
        if (img.url && img.url.startsWith('data:')) {
          totalImages++;
          totalSize += img.url.length;
        }
      });
      
      product.variants?.forEach(variant => {
        variant.images?.forEach(img => {
          if (img.url && img.url.startsWith('data:')) {
            totalImages++;
            totalSize += img.url.length;
          }
        });
      });
    });
    
    return {
      totalImages,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2)
    };
  }
};

export default ImageExporter;