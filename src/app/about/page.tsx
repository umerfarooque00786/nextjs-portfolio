'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { PERSONAL_INFO, SKILLS, EXPERIENCE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

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

    // Skills animation
    if (skillsRef.current) {
      const skillBars = skillsRef.current.querySelectorAll('.skill-bar');
      gsap.fromTo(skillBars,
        { width: '0%' },
        {
          width: (index, target) => target.getAttribute('data-level') + '%',
          duration: 1.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
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

  const skillCategories = {
    frontend: SKILLS.filter(skill => skill.category === 'frontend'),
    backend: SKILLS.filter(skill => skill.category === 'backend'),
    tools: SKILLS.filter(skill => skill.category === 'tools'),
    design: SKILLS.filter(skill => skill.category === 'design'),
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              About <span className="text-blue-400">Me</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating exceptional digital experiences through code
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1">
                <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-400">
                    {PERSONAL_INFO.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Hi, I'm {PERSONAL_INFO.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience
                creating digital experiences that combine beautiful design with
                powerful functionality. I specialize in modern web technologies
                and love bringing ideas to life through code.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My journey in web development started with a curiosity about how
                websites work, and it has evolved into a deep passion for creating
                user-centric applications that solve real-world problems.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                through blog posts and mentoring. I believe in continuous learning
                and staying up-to-date with the latest industry trends.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Experience
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">5+ Years</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Projects
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">50+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </div>

          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 capitalize">
                  {category}
                </h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-medium text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={cn(
                            "skill-bar h-3 rounded-full transition-all duration-300",
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
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Work Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional journey and the companies I've worked with
            </p>
          </div>

          <div ref={experienceRef} className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <div key={exp.id} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-gray-500 font-medium">
                    {exp.duration}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
