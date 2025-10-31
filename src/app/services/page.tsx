'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ['Responsive Design', 'SEO Optimization', 'Performance Optimization', 'Modern UI/UX'],
    price: 'Starting at $2,000'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications using React Native and Flutter for iOS and Android.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: ['Cross-platform', 'Native Performance', 'App Store Deployment', 'Push Notifications'],
    price: 'Starting at $5,000'
  },
  {
    id: 3,
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration, inventory management, and admin dashboards.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    features: ['Payment Integration', 'Inventory Management', 'Order Tracking', 'Admin Dashboard'],
    price: 'Starting at $3,500'
  },
  {
    id: 4,
    title: 'API Development',
    description: 'RESTful APIs and GraphQL services with proper authentication, documentation, and testing.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: ['RESTful APIs', 'GraphQL', 'Authentication', 'Documentation'],
    price: 'Starting at $1,500'
  },
  {
    id: 5,
    title: 'UI/UX Design',
    description: 'Modern and intuitive user interface designs with focus on user experience and accessibility.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    features: ['Wireframing', 'Prototyping', 'User Research', 'Accessibility'],
    price: 'Starting at $1,000'
  },
  {
    id: 6,
    title: 'Consulting & Support',
    description: 'Technical consulting, code reviews, performance optimization, and ongoing maintenance support.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ['Code Review', 'Performance Audit', 'Technical Consulting', 'Maintenance'],
    price: 'Starting at $100/hour'
  }
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out'
        }
      );
    }

    // Services animation
    if (servicesRef.current) {
      const serviceCards = servicesRef.current.querySelectorAll('.service-card');
      gsap.fromTo(serviceCards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              My <span className="text-blue-400">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive web development services to help bring your digital vision to life
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card glass-card rounded-3xl p-8 border border-white/20 hover:scale-105 transition-all duration-300"
              >
                {/* Service Icon */}
                <div className="w-16 h-16 glass-effect rounded-xl flex items-center justify-center text-white mb-6 border border-white/20">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Service Price */}
                <div className="border-t border-white/20 pt-6">
                  <p className="text-lg font-semibold text-blue-400 mb-4">
                    {service.price}
                  </p>
                  <button className="w-full px-6 py-3 glass-effect text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              My Development Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A structured approach to deliver high-quality results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Understanding your requirements, goals, and target audience'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Creating detailed project roadmap and technical specifications'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Building your solution with clean, scalable, and maintainable code'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Testing, deployment, and ongoing support for your project'
              }
            ].map((process, index) => (
              <div key={index} className="text-center glass-card rounded-3xl p-6 border border-white/20">
                <div className="w-16 h-16 glass-effect rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 border border-white/20">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-300">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's discuss your project requirements and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold glass-effect text-white rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-white/20 cursor-pointer"
            >
              Get In Touch
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer glass-effect"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
