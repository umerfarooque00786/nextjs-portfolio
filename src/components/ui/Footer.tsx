'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass-nav border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Portfolio</h3>
            <p className="text-gray-700 leading-relaxed">
              Creating exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 glass-effect rounded-xl flex items-center justify-center",
                    "text-gray-700 hover:text-gray-900 hover:bg-white/30",
                    "transition-all duration-300 transform hover:scale-110 border border-white/20"
                  )}
                  aria-label={link.name}
                >
                  <SocialIcon icon={link.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Projects', href: '/projects' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.href.startsWith('/')) {
                      // Use Next.js router for page navigation (no reload)
                      router.push(link.href);
                    } else {
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="block text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="text-gray-900 font-medium">Email:</span><br />
                {PERSONAL_INFO.email}
              </p>
              <p className="text-gray-700">
                <span className="text-gray-900 font-medium">Location:</span><br />
                {PERSONAL_INFO.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-700 text-sm">
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-700">
              <span>Built with Next.js, GSAP & Locomotive Scroll</span>
              <button
                onClick={handleScrollToTop}
                className={cn(
                  "flex items-center space-x-2 text-gray-700 hover:text-gray-900",
                  "transition-colors group cursor-pointer"
                )}
              >
                <span>Back to top</span>
                <svg
                  className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
