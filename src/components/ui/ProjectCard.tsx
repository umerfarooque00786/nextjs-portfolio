'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  className 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const tech = techRef.current;
    const buttons = buttonsRef.current;

    // Initial state
    gsap.set([title, desc, tech, buttons], {
      opacity: 0,
      y: 30
    });

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to([title, desc, tech, buttons], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to([title, desc, tech, buttons], {
        opacity: 0,
        y: 30,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const gradients = [
    'from-blue-500 via-purple-500 to-pink-500',
    'from-green-400 via-blue-500 to-purple-600',
    'from-yellow-400 via-red-500 to-pink-500',
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-cyan-400 via-blue-500 to-indigo-600',
    'from-orange-400 via-red-500 to-purple-600'
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-3xl cursor-pointer",
        "h-80 md:h-96 transition-all duration-500",
        "shadow-xl hover:shadow-2xl",
        className
      )}
    >
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-90",
        gradient
      )} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
            Featured
          </span>
        </div>
      )}

      {/* Large Letter Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/10 text-[12rem] md:text-[16rem] font-bold leading-none select-none">
          {project.title.charAt(0)}
        </span>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10"
      >
        <div className="space-y-4">
          {/* Title */}
          <h3
            ref={titleRef}
            className="text-2xl md:text-3xl font-bold text-white leading-tight"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            ref={descRef}
            className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3"
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div ref={techRef} className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-md border border-white/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-md border border-white/30">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-white/90 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
