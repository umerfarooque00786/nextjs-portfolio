'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  animate?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  animate = true,
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!animate || !buttonRef.current) return;

    const button = buttonRef.current;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseDown = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
    };
  }, [animate]);

  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group cursor-pointer";

  const variantClasses = {
    primary: "glass-effect text-white hover:bg-white/20 focus:ring-white/50 shadow-lg hover:shadow-xl rounded-2xl",
    secondary: "bg-white/10 backdrop-blur-md hover:bg-white/20 text-white focus:ring-white/50 shadow-sm hover:shadow-md rounded-2xl border border-white/20",
    outline: "border-2 border-white/30 hover:bg-white/10 text-white focus:ring-white/50 bg-transparent rounded-2xl backdrop-blur-sm",
    ghost: "text-gray-300 hover:text-white hover:bg-white/10 focus:ring-white/50 rounded-2xl"
  };

  // Ripple effect element
  const rippleEffect = (
    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/10" />
  );

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2.5 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl"
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isLoading && "animate-pulse cursor-wait",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {variant === 'primary' && rippleEffect}
      {isLoading ? (
        <div className="flex items-center relative z-10 gap-2">
          <div className="relative">
            <div className="w-4 h-4 border-2 border-white/30 rounded-full animate-spin" style={{
              borderTopColor: '#ffffff',
              borderRightColor: 'rgba(255,255,255,0.3)',
              borderBottomColor: 'rgba(255,255,255,0.3)',
              borderLeftColor: 'rgba(255,255,255,0.3)',
            }}></div>
            <div className="absolute inset-0 w-4 h-4 border-2 border-transparent border-t-white/50 rounded-full animate-spin" style={{
              animationDirection: 'reverse',
              animationDuration: '0.6s',
            }}></div>
          </div>
          <span>{children}</span>
        </div>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  );
};
