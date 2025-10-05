'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  scrollTrigger?: {
    start?: string;
    end?: string;
    toggleActions?: string;
    scrub?: boolean | number;
  };
}

// Optimized fade in animation
export const useFadeIn = (
  ref: RefObject<HTMLElement | null>,
  config: AnimationConfig = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const {
      duration = 0.8,
      delay = 0,
      ease = "power2.out",
      scrollTrigger
    } = config;

    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: scrollTrigger ? {
          trigger: element,
          start: scrollTrigger.start || "top 85%",
          toggleActions: scrollTrigger.toggleActions || "play none none reverse",
          ...scrollTrigger
        } : undefined
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, config]);
};

// Optimized stagger animation for multiple elements
export const useStaggerAnimation = (
  ref: RefObject<HTMLElement | null>,
  selector: string,
  config: AnimationConfig = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const elements = container.querySelectorAll(selector);
    
    if (elements.length === 0) return;

    const {
      duration = 0.6,
      delay = 0,
      ease = "power2.out",
      stagger = 0.1,
      scrollTrigger
    } = config;

    gsap.fromTo(
      elements,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease,
        stagger,
        scrollTrigger: scrollTrigger ? {
          trigger: container,
          start: scrollTrigger.start || "top 80%",
          toggleActions: scrollTrigger.toggleActions || "play none none reverse",
          ...scrollTrigger
        } : undefined
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [ref, selector, config]);
};

// Optimized hover animation
export const useHoverAnimation = (
  ref: RefObject<HTMLElement | null>,
  config: {
    scale?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { scale = 1.05, duration = 0.3, ease = "power2.out" } = config;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration,
        ease
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration,
        ease
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, config]);
};

// Optimized magnetic effect
export const useMagnetic = (
  ref: RefObject<HTMLElement | null>,
  config: {
    strength?: number;
    speed?: number;
  } = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { strength = 0.3, speed = 0.3 } = config;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: speed,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: speed,
        ease: "power2.out"
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, config]);
};

// Cleanup all ScrollTriggers on unmount
export const useScrollTriggerCleanup = () => {
  useEffect(() => {
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);
};

// Performance optimized scroll animation
export const useScrollReveal = (
  ref: RefObject<HTMLElement | null>,
  config: AnimationConfig = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const {
      duration = 1,
      ease = "power2.out",
      scrollTrigger
    } = config;

    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration,
                ease
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, config]);
};
