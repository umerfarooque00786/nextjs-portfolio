'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animations, refreshScrollTrigger } from '@/lib/animations';

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface UseGSAPOptions {
  dependencies?: any[];
  revertOnUpdate?: boolean;
}

export const useGSAP = (
  callback: (context: any) => void,
  options: UseGSAPOptions = {}
) => {
  const { dependencies = [], revertOnUpdate = true } = options;
  const contextRef = useRef<any>(null);

  useIsomorphicLayoutEffect(() => {
    // Create GSAP context
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, dependencies);

  useEffect(() => {
    // Refresh ScrollTrigger when dependencies change
    if (dependencies.length > 0) {
      refreshScrollTrigger();
    }
  }, dependencies);

  return contextRef.current;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (
  element: React.RefObject<HTMLElement | null>,
  animationType: keyof typeof animations,
  options: any = {},
  dependencies: any[] = []
) => {
  useGSAP(() => {
    if (!element.current) return;

    const animationFunction = animations[animationType] as any;
    const animation = animationFunction(element.current, {
      scrollTrigger: {
        trigger: element.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
      ...options,
    });

    return animation;
  }, { dependencies });
};

// Hook for magnetic effect
export const useMagnetic = (
  element: React.RefObject<HTMLElement | null>,
  options: any = {},
  dependencies: any[] = []
) => {
  useEffect(() => {
    if (!element.current) return;

    const cleanup = (animations.magnetic as any)(element.current, options);
    return cleanup;
  }, dependencies);
};

// Hook for parallax effect
export const useParallax = (
  element: React.RefObject<HTMLElement | null>,
  options: any = {},
  dependencies: any[] = []
) => {
  useGSAP(() => {
    if (!element.current) return;

    return (animations.parallax as any)(element.current, options);
  }, { dependencies });
};

// Hook for text reveal animation
export const useTextReveal = (
  element: React.RefObject<HTMLElement | null>,
  options: any = {},
  dependencies: any[] = []
) => {
  useGSAP(() => {
    if (!element.current) return;

    // Split text into characters
    const text = element.current.textContent || '';
    const chars = text.split('').map(char =>
      char === ' ' ? '<span class="char">&nbsp;</span>' : `<span class="char">${char}</span>`
    ).join('');

    element.current.innerHTML = chars;

    return (animations.splitTextReveal as any)(element.current, {
      scrollTrigger: {
        trigger: element.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
      ...options,
    });
  }, { dependencies });
};

// Hook for stagger animations
export const useStaggerAnimation = (
  elements: React.RefObject<HTMLElement | null>[],
  animationType: keyof typeof animations,
  options: any = {},
  dependencies: any[] = []
) => {
  useGSAP(() => {
    const validElements = elements
      .map(ref => ref.current)
      .filter(Boolean) as HTMLElement[];

    if (validElements.length === 0) return;

    const animationFunction = animations[animationType] as any;
    return animationFunction(validElements, {
      scrollTrigger: {
        trigger: validElements[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
      ...options,
    });
  }, { dependencies });
};
