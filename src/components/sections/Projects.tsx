'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useScrollAnimation, useMagnetic } from '@/hooks/useGSAP';
// Using direct data attributes for Locomotive Scroll
import { PROJECTS } from '@/lib/constants';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  // Title animation
  useScrollAnimation(titleRef, 'fadeInUp', {
    scrollTrigger: {
      start: 'top 80%',
    },
  });

  // Projects grid animation
  useEffect(() => {
    if (!projectsGridRef.current) return;

    const projectCards = projectsGridRef.current.querySelectorAll('.project-card');

    gsap.fromTo(
      projectCards,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: projectsGridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-24">
            <h2
              ref={titleRef}
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion
              for creating exceptional digital experiences.
            </p>
          </div>

          {/* Projects Grid */}
          <div ref={projectsGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {PROJECTS.filter(p => p.featured).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} className="project-card" />
            ))}
          </div>
        </div>
    </section>
  );
};



export default Projects;
