'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Reduced loading time for better performance
  useEffect(() => {
    if (!isClient) return;

    const minLoadingTime = 800; // Reduced to 800ms
    const timer = setTimeout(() => {
      if (isLoading) {
        handleLoadingComplete();
      }
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [isLoading, isClient]);

  // Don't render anything until client-side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        suppressHydrationWarning
      >
        {children}
      </div>
    </>
  );
}
