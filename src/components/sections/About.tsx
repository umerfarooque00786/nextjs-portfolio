'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Using direct data attributes for Locomotive Scroll
import { PERSONAL_INFO, SKILLS } from '@/lib/constants';
import { animations, advancedAnimations } from '@/lib/animations';
import { cn } from '@/lib/utils';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 100,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    // Content stagger animation
    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.fromTo(elements,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          delay: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  // Skills animation
  useEffect(() => {
    if (!skillsRef.current) return;

    const skillItems = skillsRef.current.querySelectorAll('.skill-item');
    const skillBars = skillsRef.current.querySelectorAll('.skill-bar');

    // Animate skill items
    gsap.fromTo(
      skillItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate skill bars
    gsap.fromTo(
      skillBars,
      { width: '0%' },
      {
        width: (index, target) => target.getAttribute('data-level') + '%',
        duration: 1.5,
        delay: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const skillCategories = {
    frontend: SKILLS.filter(skill => skill.category === 'frontend'),
    backend: SKILLS.filter(skill => skill.category === 'backend'),
    tools: SKILLS.filter(skill => skill.category === 'tools'),
    design: SKILLS.filter(skill => skill.category === 'design'),
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Content */}
            <div className="space-y-8">
              <h2
                ref={titleRef}
                className="text-4xl lg:text-5xl font-bold text-white"
              >
                About Me
              </h2>

              <div ref={contentRef} className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a passionate full-stack developer with over 2 years of experience
                  creating digital experiences that combine beautiful design with
                  powerful functionality. I specialize in modern web technologies
                  and love bringing ideas to life through code.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge
                  through blog posts and mentoring. I believe in continuous learning
                  and staying up-to-date with the latest industry trends.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="glass-card rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Experience
                    </h3>
                    <p className="text-3xl font-bold text-blue-400">2+ Years</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Projects
                    </h3>
                    <p className="text-3xl font-bold text-purple-400">50+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="space-y-8">
              <div className="glass-card rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h3>

                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category} className="space-y-4 mb-6 last:mb-0">
                    <h4 className="text-lg font-semibold text-gray-300 capitalize">
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {skills.map((skill, index) => (
                        <div key={skill.name} className="skill-item">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white">
                              {skill.name}
                            </span>
                            <span className="text-sm text-gray-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full glass-effect-dark rounded-full h-2 overflow-hidden">
                            <div
                              className={cn(
                                "skill-bar h-2 rounded-full transition-all duration-300",
                                category === 'frontend' && "bg-gradient-to-r from-blue-400 to-blue-600",
                                category === 'backend' && "bg-gradient-to-r from-green-400 to-green-600",
                                category === 'tools' && "bg-gradient-to-r from-purple-400 to-purple-600",
                                category === 'design' && "bg-gradient-to-r from-pink-400 to-pink-600"
                              )}
                              data-level={skill.level}
                              style={{ width: '0%' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default About;
