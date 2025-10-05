'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_CONFIG } from './constants';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation presets
export const animations = {
  // Fade animations
  fadeIn: (element: string | Element, options: any = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || GSAP_CONFIG.fadeIn.duration,
        ease: options.ease || GSAP_CONFIG.fadeIn.ease,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  fadeInUp: (element: string | Element, options: any = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || GSAP_CONFIG.duration,
        ease: options.ease || GSAP_CONFIG.ease,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  fadeInDown: (element: string | Element, options: any = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: -100 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || GSAP_CONFIG.duration,
        ease: options.ease || GSAP_CONFIG.ease,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  fadeInLeft: (element: string | Element, options: any = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: options.duration || GSAP_CONFIG.duration,
        ease: options.ease || GSAP_CONFIG.ease,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  fadeInRight: (element: string | Element, options: any = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: options.duration || GSAP_CONFIG.duration,
        ease: options.ease || GSAP_CONFIG.ease,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  // Scale animations
  scaleIn: (element: string | Element, options: any = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: options.duration || GSAP_CONFIG.duration,
        ease: options.ease || GSAP_CONFIG.ease,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  // Stagger animations
  staggerFadeIn: (elements: string | Element[], options: any = {}) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || GSAP_CONFIG.duration,
        ease: options.ease || GSAP_CONFIG.ease,
        stagger: options.stagger || GSAP_CONFIG.stagger,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  // Text animations
  splitTextReveal: (element: string | Element, options: any = {}) => {
    // Handle both string selectors and DOM elements
    let selector: string;
    if (typeof element === 'string') {
      selector = `${element} .char`;
    } else {
      // For DOM elements, find .char children directly
      const chars = element.querySelectorAll('.char');
      return gsap.fromTo(
        chars,
        { opacity: 0, y: 100, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: options.duration || 0.8,
          ease: options.ease || 'back.out(1.7)',
          stagger: options.stagger || 0.02,
          delay: options.delay || 0,
          ...options,
        }
      );
    }

    const chars = gsap.utils.toArray(selector);
    return gsap.fromTo(
      chars,
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: options.duration || 0.8,
        ease: options.ease || 'back.out(1.7)',
        stagger: options.stagger || 0.02,
        delay: options.delay || 0,
        ...options,
      }
    );
  },

  // Parallax effect
  parallax: (element: string | Element, options: any = {}) => {
    return gsap.to(element, {
      yPercent: options.yPercent || -50,
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger || element,
        start: options.start || 'top bottom',
        end: options.end || 'bottom top',
        scrub: options.scrub !== undefined ? options.scrub : true,
        ...options.scrollTrigger,
      },
    });
  },

  // Magnetic effect for buttons
  magnetic: (element: string | Element, options: any = {}) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (el as Element).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * (options.strength || 0.3),
        y: y * (options.strength || 0.3),
        duration: options.duration || 0.3,
        ease: options.ease || 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: options.duration || 0.3,
        ease: options.ease || 'power2.out',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  },
};

// Utility functions
export const createScrollTrigger = (element: string | Element, animation: any, options: any = {}) => {
  return ScrollTrigger.create({
    trigger: element,
    start: options.start || 'top 80%',
    end: options.end || 'bottom 20%',
    animation: animation,
    toggleActions: options.toggleActions || 'play none none reverse',
    ...options,
  });
};

export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export const killScrollTriggers = () => {
  ScrollTrigger.killAll();
};

// Advanced animations for better user experience
export const advancedAnimations = {
  // Text reveal animation
  textReveal: (element: string | Element, options: any = {}) => {
    const tl = gsap.timeline();

    tl.set(element, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: 100,
      skewY: 7
    })
    .to(element, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
      y: 0,
      skewY: 0,
      duration: options.duration || GSAP_CONFIG.textReveal.duration,
      ease: options.ease || GSAP_CONFIG.textReveal.ease,
      delay: options.delay || 0,
    });

    return tl;
  },

  // Magnetic effect for buttons
  magneticEffect: (element: string | Element) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = el.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  // Parallax effect
  parallax: (element: string | Element, speed: number = 0.5) => {
    return ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.fromTo(element,
        { y: -100 * speed },
        { y: 100 * speed, ease: 'none' }
      )
    });
  },

  // Stagger animation for lists
  staggerIn: (elements: string | NodeList, options: any = {}) => {
    return gsap.fromTo(elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 0.8,
        ease: options.ease || 'back.out(1.7)',
        stagger: options.stagger || 0.1,
        delay: options.delay || 0,
      }
    );
  },

  // Loading animation
  loadingAnimation: (element: string | Element) => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(element, {
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to(element, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    return tl;
  }
};
