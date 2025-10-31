'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface TextLogoProps {
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const TextLogo: React.FC<TextLogoProps> = ({ 
  className, 
  onClick,
  size = 'md',
  variant = 'dark'
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/');
    }
  };

  const sizeClasses = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center transition-all duration-300",
        "hover:opacity-80 active:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded",
        "cursor-pointer",
        className
      )}
      aria-label="Home"
    >
      {/* Mobile: Show icon logo only */}
      <div className="md:hidden">
        <img
          src="/logo-unique.svg"
          alt="Portfolio Logo"
          className="h-10 w-10 transition-transform duration-300"
        />
      </div>

      {/* Desktop: Show full text logo */}
      <div className={cn(
        "hidden md:flex flex-col items-center justify-center",
        sizeClasses[size]
      )}>
        <h1 className={cn(
          "font-bold tracking-tight",
          size === 'sm' && "text-2xl",
          size === 'md' && "text-3xl sm:text-4xl",
          size === 'lg' && "text-4xl sm:text-5xl",
          variant === 'dark' ? "text-gray-900" : "text-white"
        )}>
          Umer Farooque
        </h1>
        <div className={cn(
          "mt-1 flex flex-col items-center",
          size === 'sm' && "gap-1",
          size === 'md' && "gap-1.5",
          size === 'lg' && "gap-2"
        )}>
          <p className={cn(
            "uppercase tracking-wider font-normal",
            size === 'sm' && "text-xs",
            size === 'md' && "text-xs sm:text-sm",
            size === 'lg' && "text-sm sm:text-base",
            variant === 'dark' ? "text-gray-700" : "text-gray-300"
          )}>
            FRONT-END DEVELOPER
          </p>
          <div className={cn(
            variant === 'dark' ? "bg-gray-900" : "bg-white",
            size === 'sm' && "w-24 h-px",
            size === 'md' && "w-32 sm:w-40 h-0.5",
            size === 'lg' && "w-40 sm:w-48 h-0.5"
          )} />
        </div>
      </div>
    </button>
  );
};

