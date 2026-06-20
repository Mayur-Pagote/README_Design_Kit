import { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={cn(
        // Base styles - Tailwind classes
        "fixed bottom-6 right-6 z-[9999]",
        "w-14 h-14 rounded-full",
        "bg-gradient-to-br from-purple-600 to-purple-400",
        "text-white text-2xl",
        "flex items-center justify-center",
        "shadow-lg shadow-purple-500/40",
        "border-none cursor-pointer",
        "transition-all duration-300 ease-out",
        // Visibility styles
        isVisible 
          ? "opacity-100 visible translate-y-0" 
          : "opacity-0 invisible translate-y-5",
        // Hover styles
        "hover:-translate-y-1 hover:scale-105",
        "hover:shadow-xl hover:shadow-purple-500/60",
        "hover:bg-gradient-to-br hover:from-purple-700 hover:to-purple-500",
        // Active styles
        "active:scale-95",
        // Responsive
        "max-sm:w-12 max-sm:h-12 max-sm:text-xl max-sm:bottom-4 max-sm:right-4"
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaRocket />
    </button>
  );
};

export default ScrollToTopButton;