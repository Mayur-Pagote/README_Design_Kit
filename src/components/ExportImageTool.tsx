import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import domtoimage from 'dom-to-image-more';
import {
  Download,
  Image as ImageIcon,
  Loader2,
  Monitor,
  Twitter,
  Linkedin,
  Check,
} from 'lucide-react';

export interface ExportSize {
  name: string;
  width: number | 'auto';
  height: number | 'auto';
  icon: ReactNode;
}

export interface ExportImageToolProps {
  children?: ReactNode;
  filename?: string;
  className?: string;
  targetRef: React.RefObject<HTMLDivElement | null>;
  onBackgroundChange?: (color: string) => void; // ✅ new prop added
}

const exportSizes: ExportSize[] = [
  { name: 'Full Width', width: 'auto', height: 'auto', icon: <Monitor className="h-4 w-4" /> },
  { name: 'Twitter Card', width: 600, height: 314, icon: <Twitter className="h-4 w-4" /> },
  { name: 'LinkedIn Card', width: 1200, height: 627, icon: <Linkedin className="h-4 w-4" /> },
];

const backgroundOptions = [
  { name: 'White', value: '#ffffff' },
  { name: 'Transparent', value: 'transparent' },
  { name: 'Light Gray', value: '#f8f9fa' },
  { name: 'Cool Blue', value: '#e0f2ff' },
  { name: 'Warm Yellow', value: '#fff7e0' },
];

export function ExportImageTool({
  children,
  filename = 'README-preview',
  className = '',
  targetRef,
  onBackgroundChange,
}: ExportImageToolProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(exportSizes[0]);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const generateFilename = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${filename}-${timestamp}.png`;
  };

  const exportAsImage = async (size: ExportSize) => {
    const element = targetRef.current;
    if (!element) {
      setError('Target element not found.');
      return;
    }

    const originalStyle = element.getAttribute('style') || '';
    setIsExporting(true);
    setError(null);

    try {
      if (size.width !== 'auto') element.style.width = `${size.width}px`;
      if (size.height !== 'auto') element.style.height = `${size.height}px`;
      element.style.overflow = 'hidden';

      const dataUrl = await domtoimage.toPng(element, {
        bgcolor: backgroundColor,
        width: size.width === 'auto' ? undefined : size.width,
        height: size.height === 'auto' ? undefined : size.height,
      });

      element.setAttribute('style', originalStyle);

      const link = document.createElement('a');
      link.download = generateFilename();
      link.href = dataUrl;
      link.click();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Export failed: ${message}`);
    } finally {
      setIsExporting(false);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleBackgroundChange = (color: string) => {
    setBackgroundColor(color);
    if (onBackgroundChange) onBackgroundChange(color); // ✅ sync with parent
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
          Export PNG
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4 space-y-4">
            {/* Size */}
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Export Size</label>
              {exportSizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
                    selectedSize.name === size.name
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {size.icon}
                  <span className="flex-1 text-left">{size.name}</span>
                  <span className="text-xs text-gray-500">
                    {size.width === 'auto' ? 'Auto' : `${size.width}×${size.height}`}
                  </span>
                  {selectedSize.name === size.name && <Check className="h-4 w-4 text-blue-600" />}
                </button>
              ))}
            </div>

            {/* Background */}
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Background</label>
              <div className="grid grid-cols-2 gap-2">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => handleBackgroundChange(bg.value)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                      backgroundColor === bg.value
                        ? 'bg-gray-100 border border-blue-500 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: bg.value === 'transparent' ? 'white' : bg.value }}
                    />
                    {bg.name}
                    {backgroundColor === bg.value && <Check className="ml-auto h-4 w-4 text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-sm text-red-600 p-2 rounded border border-red-200">{error}</div>
            )}

            {/* Export */}
            <button
              onClick={() => exportAsImage(selectedSize)}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export as PNG
                </>
              )}
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
