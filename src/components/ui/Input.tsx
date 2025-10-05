'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  animate?: boolean;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  animate = true,
  icon,
  className,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (!animate || !inputRef.current) return;

    const input = inputRef.current;

    const handleFocus = () => {
      setIsFocused(true);
      gsap.to(input, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      });

      if (labelRef.current) {
        gsap.to(labelRef.current, {
          scale: 0.85,
          y: -8,
          color: "#3B82F6",
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      gsap.to(input, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });

      if (labelRef.current && !hasValue) {
        gsap.to(labelRef.current, {
          scale: 1,
          y: 0,
          color: "#9CA3AF",
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      setHasValue(target.value.length > 0);
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);
    input.addEventListener('input', handleInput);

    // Initial check for value
    setHasValue(input.value.length > 0);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
      input.removeEventListener('input', handleInput);
    };
  }, [animate, hasValue]);

  return (
    <div className="relative">
      {label && (
        <label
          ref={labelRef}
          htmlFor={props.id}
          className={cn(
            "absolute left-3 top-3 text-gray-400 transition-all duration-200 pointer-events-none",
            (isFocused || hasValue) && "text-blue-500 text-sm -translate-y-2 scale-85"
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={inputRef}
          className={cn(
            "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "transition-all duration-200",
            icon && "pl-10",
            label && "pt-6 pb-2",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};
