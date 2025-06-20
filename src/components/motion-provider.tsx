import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MotionConfig } from 'motion/react';

interface ReducedMotionProviderProps {
  children: React.ReactNode;
}

export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
  }, []);

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}

export function MotionToggle() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
  }, []);

  const toggleMotion = () => {
    setReducedMotion(!reducedMotion);
    document.documentElement.style.setProperty(
      '--motion-reduce', 
      reducedMotion ? '0' : '1'
    );
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMotion}
      className="text-xs"
    >
      {reducedMotion ? '🎭' : '⚡'} {reducedMotion ? 'Enable' : 'Reduce'} Motion
    </Button>
  );
}
