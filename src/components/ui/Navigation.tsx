'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { TextLogo } from '@/components/ui/TextLogo';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Enhanced navigation animation
  useEffect(() => {
    if (!navRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    )
    .fromTo(
      navRef.current.querySelectorAll('.nav-item'),
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.5'
    );
  }, []);

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('/')) {
      // Handle regular navigation for pages using Next.js router (no reload)
      router.push(href);
      return;
    }

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-nav"
          : "glass-nav"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 z-10">
            <TextLogo size="sm" variant="dark" onClick={() => router.push('/')} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "nav-item px-3 py-2 text-sm font-medium transition-all duration-300",
                      "relative group transform active:scale-95",
                      "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white rounded-md",
                      active
                        ? "text-gray-900 font-semibold scale-105"
                        : "text-gray-700 hover:text-gray-900 hover:scale-105"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-300 rounded-full",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </button>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 hidden lg:inline">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="nav-item px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-950 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="nav-item px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-950 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2.5 rounded-lg transition-all duration-300",
                "text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200",
                "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white",
                isMobileMenuOpen && "bg-gray-100 text-gray-900"
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close main menu" : "Open main menu"}</span>
              <div className="relative w-6 h-6">
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "rotate-45 top-3" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 bg-current top-3 transform transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "-rotate-45 top-3" : "top-6"
                  )}
                />
              </div>
            </button>
          </div>
        </div>


      </div>

      {/* Mobile dropdown menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen
            ? "max-h-[80vh] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        )}
      >
        <div className="px-2 pt-2 pb-4 sm:px-3 bg-white/98 backdrop-blur-lg border-t border-gray-200">
          {/* Scrollable Navigation Items Container */}
          <div className="overflow-y-auto max-h-[60vh] pb-2 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 scrollbar-thumb-rounded-full">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "block px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-300 w-full text-left transform",
                    "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white",
                    "active:scale-[0.98] shadow-sm hover:shadow-md",
                    active
                      ? "text-gray-900 font-semibold bg-gray-50 border-l-4 border-gray-900 scale-[1.02] shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-[1.01] border-l-4 border-transparent hover:border-gray-300"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="flex items-center">
                    {item.name}
                    {active && (
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 mt-2 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  <span className="flex items-center">
                    <svg
                      className="mr-2 w-4 h-4 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Welcome, {user?.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-950 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/login');
                }}
                className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-950 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
