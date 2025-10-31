'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Removed SimpleScrollElement import - using direct data attributes
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { animations, advancedAnimations } from '@/lib/animations';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  // Text reveal animations - temporarily disabled
  // useTextReveal(titleRef, {
  //   delay: 0.5,
  //   scrollTrigger: {
  //     start: 'top 90%',
  //   },
  // });

  // useTextReveal(subtitleRef, {
  //   delay: 0.8,
  //   scrollTrigger: {
  //     start: 'top 90%',
  //   },
  // });

  // Enhanced magnetic effect for CTA button
  useEffect(() => {
    if (ctaButtonRef.current) {
      const cleanup = advancedAnimations.magneticEffect(ctaButtonRef.current);
      return cleanup;
    }
  }, []);

  // Main hero animations
  useEffect(() => {
    if (!heroRef.current) return;

    // Animate description
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate CTA button
    if (ctaButtonRef.current) {
      gsap.fromTo(
        ctaButtonRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 1.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate social links
    if (socialLinksRef.current) {
      const socialItems = socialLinksRef.current.querySelectorAll('.social-item');
      gsap.fromTo(
        socialItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Parallax effect for background elements
    gsap.to('.hero-bg-element', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If projects section doesn't exist, navigate to projects page
      window.location.href = '/projects';
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
        {/* Background Elements - Minimal black and white */}
        <div className="absolute inset-0 hero-bg-element">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl" />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold text-gray-900 leading-tight"
            >
              {PERSONAL_INFO.name}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light uppercase tracking-wider mt-2"
            >
              {PERSONAL_INFO.title}
            </p>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mt-6"
            >
              {PERSONAL_INFO.bio}
            </p>

            {/* CTA Button */}
            <button
              ref={ctaButtonRef}
              onClick={handleScrollToProjects}
              className={cn(
                "inline-flex items-center px-8 py-4 text-lg font-semibold",
                "bg-gray-900 text-white hover:bg-gray-800",
                "rounded-md shadow-lg hover:shadow-xl active:shadow-md",
                "transform transition-all duration-300 relative overflow-hidden group",
                "hover:scale-105 active:scale-95 border-2 border-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white",
                "before:absolute before:inset-0 before:bg-white before:opacity-0",
                "hover:before:opacity-5 before:transition-opacity before:duration-300"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg
                  className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
            </button>

            {/* Social Links */}
            <div ref={socialLinksRef} className="flex justify-center space-x-6 pt-8">
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "social-item p-3 text-gray-600 hover:text-gray-900",
                    "transition-all duration-300 hover:scale-110 active:scale-95 transform",
                    "rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white",
                    "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-900",
                    "shadow-sm hover:shadow-lg"
                  )}
                  aria-label={link.name}
                >
                  <span className="sr-only">{link.name}</span>
                  <SocialIcon icon={link.icon} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-gray-600">
            <span className="text-sm font-medium">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-gray-600 to-transparent" />
          </div>
        </div>
    </section>
  );
};

export default Hero;
