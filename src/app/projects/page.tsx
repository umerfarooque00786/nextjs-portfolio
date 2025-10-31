'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PROJECTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

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

    // Projects animation
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      gsap.fromTo(projectCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsRef.current,
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

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-40 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              My <span className="text-blue-400">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A showcase of my work, featuring web applications, mobile apps, and creative solutions
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer",
                filter === 'all'
                  ? "glass-effect text-white shadow-lg bg-white/20"
                  : "glass-effect text-gray-300 hover:text-white hover:bg-white/10"
              )}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={cn(
                "px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer",
                filter === 'featured'
                  ? "glass-effect text-white shadow-lg bg-white/20"
                  : "glass-effect text-gray-300 hover:text-white hover:bg-white/10"
              )}
            >
              Featured ({PROJECTS.filter(p => p.featured).length})
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                className="project-card"
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-300">No projects found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities and exciting projects.
            Let's create something amazing together!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold glass-effect text-white rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-white/20 cursor-pointer"
          >
            Get In Touch
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
