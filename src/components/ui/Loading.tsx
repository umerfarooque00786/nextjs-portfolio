'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  className, 
  size = 'md',
  variant = 'spinner',
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
        <div className="flex items-center gap-1.5">
          <div className={cn(
            'rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce',
            dotSizeClasses[size]
          )} style={{ animationDelay: '0ms' }} />
          <div className={cn(
            'rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce',
            dotSizeClasses[size]
          )} style={{ animationDelay: '150ms' }} />
          <div className={cn(
            'rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce',
            dotSizeClasses[size]
          )} style={{ animationDelay: '300ms' }} />
        </div>
        {text && <p className="text-sm text-gray-400 animate-pulse">{text}</p>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
        <div className={cn(
          'rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse',
          sizeClasses[size]
        )} />
        {text && <p className="text-sm text-gray-400">{text}</p>}
      </div>
    );
  }

  // Default spinner with enhanced design
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className="relative">
        <div
          className={cn(
            'animate-spin rounded-full',
            sizeClasses[size]
          )}
          style={{
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderTopColor: '#3B82F6',
            borderRightColor: '#8B5CF6',
            borderBottomColor: '#EC4899',
            borderLeftColor: '#3B82F6',
            background: 'conic-gradient(from 0deg, transparent, transparent, transparent)',
          }}
        />
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2 border-transparent border-t-white/30',
            'animate-spin',
            sizeClasses[size]
          )}
          style={{
            animationDirection: 'reverse',
            animationDuration: '0.8s',
          }}
        />
      </div>
      {text && <p className="text-sm text-gray-400 font-medium animate-pulse">{text}</p>}
    </div>
  );
};

export default Loading;
