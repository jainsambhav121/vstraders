
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      size="icon"
      className={cn(
        'fixed bottom-20 right-4 z-50 rounded-full shadow-lg transition-opacity md:bottom-24',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      onClick={scrollToTop}
      aria-label="Go to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
