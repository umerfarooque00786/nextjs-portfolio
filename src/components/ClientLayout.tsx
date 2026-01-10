'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '@/components/ui/Loading';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle page transitions with loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short loading animation

    return () => clearTimeout(timer);
  }, [pathname]);

  // Don't render anything until client-side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <Loading size="lg" variant="spinner" text="Loading..." />
        </div>
      )}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>
    </>
  );
}
