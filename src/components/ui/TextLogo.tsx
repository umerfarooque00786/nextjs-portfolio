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

  const paddingClasses = {
    sm: 'px-6 py-2.5',
    md: 'px-8 py-3',
    lg: 'px-10 py-4',
  };

  const textClasses = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl',
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center transition-all duration-300",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === 'dark' ? "focus:ring-gray-300" : "focus:ring-gray-600",
        "cursor-pointer rounded-full shadow-lg",
        variant === 'dark'
          ? "bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400"
          : "bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900",
        paddingClasses[size],
        className
      )}
      aria-label="Home"
      style={{
        boxShadow: variant === 'dark'
          ? '0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
          : '0 8px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.3)'
      }}
    >
      <h1 className={cn(
        "font-black tracking-wide whitespace-nowrap",
        textClasses[size],
        variant === 'dark' ? "text-gray-900" : "text-white"
      )}>
        UMER
      </h1>
    </button>
  );
};

