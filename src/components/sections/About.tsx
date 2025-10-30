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
      className="py-20 lg:py-32 bg-gray-50"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Content */}
            <div className="space-y-8">
              <h2
                ref={titleRef}
                className="text-4xl lg:text-5xl font-bold text-gray-900"
              >
                About Me
              </h2>

              <div ref={contentRef} className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  I'm a passionate full-stack developer with over 2 years of experience
                  creating digital experiences that combine beautiful design with
                  powerful functionality. I specialize in modern web technologies
                  and love bringing ideas to life through code.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge
                  through blog posts and mentoring. I believe in continuous learning
                  and staying up-to-date with the latest industry trends.
                </p>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Experience
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">2+ Years</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Projects
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">50+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Skills & Technologies</h3>

              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category} className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-700 capitalize">
                    {category}
                  </h4>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="skill-item">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              "skill-bar h-2 rounded-full transition-all duration-300",
                              category === 'frontend' && "bg-blue-500",
                              category === 'backend' && "bg-green-500",
                              category === 'tools' && "bg-purple-500",
                              category === 'design' && "bg-pink-500"
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
    </section>
  );
};

export default About;
