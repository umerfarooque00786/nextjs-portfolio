'use client';

import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  hoverEffect?: boolean;
  variant?: 'default' | 'glass' | 'gradient';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  animate = true,
  hoverEffect = true,
  variant = 'default'
}, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const cardRef = ref || internalRef;

  useEffect(() => {
    const card = (cardRef as React.RefObject<HTMLDivElement>).current;
    if (!animate || !card) return;

    // Initial animation
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    if (hoverEffect) {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [animate, hoverEffect]);

  const variantClasses = {
    default: "glass-card border border-white/20",
    glass: "glass-card border border-white/20",
    gradient: "glass-card border border-white/20"
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-2xl shadow-2xl transition-all duration-300",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
