import html2canvas from 'html2canvas';
import JSZip from 'jszip';

// Extract local image URLs from markdown (both markdown syntax and HTML tags)
const extractImageUrls = (markdown: string): string[] => {
  const urls: Set<string> = new Set();
  
  // Extract from markdown image syntax: ![alt](url)
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = markdownImageRegex.exec(markdown)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('http') && !url.startsWith('//') && !url.startsWith('data:')) {
      urls.add(url);
    }
  }
  
  // Extract from HTML img tags: <img src="url" />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = htmlImageRegex.exec(markdown)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('http') && !url.startsWith('//') && !url.startsWith('data:')) {
      urls.add(url);
    }
  }
  
  return Array.from(urls);
};

// Fetch image as blob with better error handling
const fetchImageAsBlob = async (url: string): Promise<Blob | null> => {
  try {
    // Handle relative paths
    let fullUrl = url;
    if (url.startsWith('/')) {
      fullUrl = `${window.location.origin}${url}`;
    } else if (!url.startsWith('http') && !url.startsWith('data:')) {
      // Relative path - try both with and without leading slash
      fullUrl = `${window.location.origin}/${url}`;
    }
    
    const response = await fetch(fullUrl, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      // Try alternative path if first attempt failed
      if (!url.startsWith('/') && !url.startsWith('http')) {
        const altUrl = `${window.location.origin}${url}`;
        const altResponse = await fetch(altUrl, {
          mode: 'cors',
          credentials: 'omit'
        });
        if (altResponse.ok) {
          return await altResponse.blob();
        }
      }
      return null;
    }
    
    return await response.blob();
  } catch (error) {
    console.warn(`Failed to fetch image: ${url}`, error);
    return null;
  }
};

// Export as ZIP with enhanced asset bundling
export const exportAsZip = async (markdown: string, filename = 'readme-export'): Promise<void> => {
  try {
    const zip = new JSZip();
    
    // Add README.md file
    zip.file('README.md', markdown);
    
    // Extract and bundle all local images
    const imageUrls = extractImageUrls(markdown);
    let bundledCount = 0;
    
    if (imageUrls.length > 0) {
      for (const url of imageUrls) {
        const blob = await fetchImageAsBlob(url);
        if (blob) {
          // Preserve directory structure or place in assets folder
          let filePath: string;
          if (url.includes('/')) {
            // Preserve nested directory structure
            filePath = url.startsWith('/') ? url.slice(1) : url;
          } else {
            // Place single files in assets folder
            filePath = `assets/${url}`;
          }
          
          // Ensure parent directories exist by creating folder structure
          const pathParts = filePath.split('/');
          if (pathParts.length > 1) {
            let currentFolder = zip;
            for (let i = 0; i < pathParts.length - 1; i++) {
              const folderName = pathParts[i];
              const existingFolder = currentFolder.folder(folderName);
              currentFolder = existingFolder || currentFolder.folder(folderName)!;
            }
            currentFolder.file(pathParts[pathParts.length - 1], blob);
          } else {
            zip.file(filePath, blob);
          }
          
          bundledCount++;
        }
      }
    }
    
    // Generate and download ZIP
    const blob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    // Log success (could be used for toast notifications)
    console.log(`ZIP export successful: ${bundledCount} asset(s) bundled`);
  } catch (error) {
    console.error('ZIP export failed:', error);
    throw error;
  }
};

// Wait for all images in an element to load
const waitForImages = (element: HTMLElement): Promise<void> => {
  return new Promise((resolve) => {
    const images = element.querySelectorAll('img');
    if (images.length === 0) {
      resolve();
      return;
    }
    
    let loadedCount = 0;
    const totalImages = images.length;
    
    const checkComplete = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        resolve();
      }
    };
    
    images.forEach((img) => {
      if (img.complete) {
        checkComplete();
      } else {
        img.onload = checkComplete;
        img.onerror = checkComplete; // Continue even if image fails to load
      }
    });
    
    // Timeout after 5 seconds
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

// Export component card as PDF
export const exportComponentCardAsPdf = async (cardElement: HTMLElement, filename: string): Promise<void> => {
  try {
    // Wait for images to load
    await waitForImages(cardElement);
    
    // Small delay to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const { jsPDF } = await import('jspdf');
    
    // Get computed background color
    const computedStyle = window.getComputedStyle(cardElement);
    let backgroundColor = computedStyle.backgroundColor || '#1e293b';
    
    // Convert RGB/RGBA to hex if needed
    if (backgroundColor.startsWith('rgb')) {
      const matches = backgroundColor.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]);
        const g = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        backgroundColor = `#${[r, g, b].map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        }).join('')}`;
      }
    }
    
    let imgData: string;
    
    // Try html2canvas first
    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: backgroundColor,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true, // Allow taint for external images
        width: cardElement.offsetWidth || cardElement.scrollWidth,
        height: cardElement.offsetHeight || cardElement.scrollHeight,
      });
      
      // Check if canvas has valid dimensions
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Invalid canvas dimensions');
      }
      
      imgData = canvas.toDataURL('image/png', 1.0);
    } catch (html2canvasError) {
      console.warn('html2canvas failed, trying dom-to-image-more:', html2canvasError);
      
      // Fallback to dom-to-image-more
      const domToImage = await import('dom-to-image-more');
      const scrollWidth = cardElement.scrollWidth || cardElement.offsetWidth;
      const scrollHeight = cardElement.scrollHeight || cardElement.offsetHeight;
      
      imgData = await domToImage.default.toPng(cardElement, {
        bgcolor: backgroundColor,
        width: scrollWidth,
        height: scrollHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        quality: 1.0,
      });
    }
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    
    // Get image dimensions from data URL
    const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = () => reject(new Error('Failed to load image data'));
        img.src = dataUrl;
        // Timeout after 5 seconds
        setTimeout(() => reject(new Error('Image load timeout')), 5000);
      });
    };
    
    const { width: imgWidth, height: imgHeight } = await getImageDimensions(imgData);
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    let heightLeft = pdfHeight - pdf.internal.pageSize.getHeight();
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -heightLeft, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Component PDF export failed:', error);
    throw new Error(`PDF export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Export component code as ZIP
export const exportComponentCodeAsZip = async (codeSnippet: string, filename: string): Promise<void> => {
  try {
    const zip = new JSZip();
    
    // Add the code snippet as a markdown file
    zip.file('component.md', codeSnippet);
    
    // Generate and download ZIP
    const blob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Component ZIP export failed:', error);
    throw error;
  }
};

// Export as PDF with enhanced styling preservation
export const exportAsPdf = async (elementId: string, filename = 'readme-export'): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Preview element not found. Please switch to Preview tab.');
    }
    
    // Wait for images to load
    await waitForImages(element);
    
    // Small delay to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Detect background color from computed styles
    const computedStyle = window.getComputedStyle(element);
    let backgroundColor = computedStyle.backgroundColor || '#ffffff';
    
    // Convert RGB/RGBA to hex if needed
    if (backgroundColor.startsWith('rgb')) {
      const matches = backgroundColor.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]);
        const g = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        backgroundColor = `#${[r, g, b].map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        }).join('')}`;
      }
    }
    
    const { jsPDF } = await import('jspdf');
    
    let imgData: string;
    
    // Try html2canvas first
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: backgroundColor,
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true, // Allow taint for external images
        width: element.scrollWidth || element.offsetWidth,
        height: element.scrollHeight || element.offsetHeight,
        windowWidth: element.scrollWidth || element.offsetWidth,
        windowHeight: element.scrollHeight || element.offsetHeight,
      });
      
      // Check if canvas has valid dimensions
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Invalid canvas dimensions');
      }
      
      imgData = canvas.toDataURL('image/png', 1.0);
    } catch (html2canvasError) {
      console.warn('html2canvas failed, trying dom-to-image-more:', html2canvasError);
      
      // Fallback to dom-to-image-more
      const domToImage = await import('dom-to-image-more');
      const scrollWidth = element.scrollWidth || element.offsetWidth;
      const scrollHeight = element.scrollHeight || element.offsetHeight;
      
      imgData = await domToImage.default.toPng(element, {
        bgcolor: backgroundColor,
        width: scrollWidth,
        height: scrollHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        quality: 1.0,
      });
    }
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    
    // Get image dimensions from data URL
    const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = () => reject(new Error('Failed to load image data'));
        img.src = dataUrl;
        // Timeout after 5 seconds
        setTimeout(() => reject(new Error('Image load timeout')), 5000);
      });
    };
    
    const { width: imgWidth, height: imgHeight } = await getImageDimensions(imgData);
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    let heightLeft = pdfHeight - pdf.internal.pageSize.getHeight();
    
    // Add additional pages if content is taller than one page
    while (heightLeft > 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -heightLeft, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    
    // Save the PDF
    pdf.save(`${filename}.pdf`);
    
    console.log('PDF export successful');
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error(`PDF export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
