"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import { PERSONAL_INFO, SKILLS, EXPERIENCE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }

    // Skills animation
    if (skillsRef.current) {
      const skillBars = skillsRef.current.querySelectorAll(".skill-bar");
      gsap.fromTo(
        skillBars,
        { width: "0%" },
        {
          width: (index, target) => target.getAttribute("data-level") + "%",
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const skillCategories = {
    frontend: SKILLS.filter((skill) => skill.category === "frontend"),
    backend: SKILLS.filter((skill) => skill.category === "backend"),
    tools: SKILLS.filter((skill) => skill.category === "tools"),
    design: SKILLS.filter((skill) => skill.category === "design"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 sm:pt-28 lg:pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              About <span className="text-blue-400">Me</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Full Stack Developer with 3+ years of experience in web
              development, specializing in modern technologies and continuously
              growing my skills
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="glass-card rounded-3xl p-1 border border-white/20">
                <div className="w-full aspect-square glass-effect rounded-3xl flex items-center justify-center">
                  <div className="text-6xl font-bold text-white">
                    {PERSONAL_INFO.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="space-y-6 glass-card rounded-3xl p-8 border border-white/20">
              <h2 className="text-4xl font-bold text-white">
                Hi, I'm {PERSONAL_INFO.name}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with 2+ years of
                experience in web development. I have 2 years of solid
                experience in custom WordPress development, PHP, and Laravel as
                a full-stack developer, plus 1 year of specialized experience in
                Next.js development.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey started with WordPress and PHP development, where I
                learned to create custom themes, plugins, and full-stack web
                applications. I then expanded my skills to include Laravel for
                more complex backend solutions and database management.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently, I'm growing and polishing my skills in modern
                technologies like Next.js and React. I believe in continuous
                learning and constantly work on improving my expertise to
                deliver better solutions. I'm passionate about staying
                up-to-date with the latest industry trends and best practices.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="glass-effect rounded-xl p-4 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Experience
                  </h3>
                  <p className="text-3xl font-bold text-blue-400">2+ Years</p>
                </div>
                <div className="glass-effect rounded-xl p-4 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Projects
                  </h3>
                  <p className="text-3xl font-bold text-purple-400">50+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to
              life
            </p>
          </div>

          <div
            ref={skillsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div
                key={category}
                className="glass-card rounded-3xl p-6 border border-white/20 space-y-6"
              >
                <h3 className="text-2xl font-bold text-white capitalize">
                  {category}
                </h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-medium text-white">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full glass-effect-dark rounded-full h-3 overflow-hidden">
                        <div
                          className={cn(
                            "skill-bar h-3 rounded-full transition-all duration-300",
                            category === "frontend" &&
                            "bg-gradient-to-r from-blue-400 to-blue-600",
                            category === "backend" &&
                            "bg-gradient-to-r from-green-400 to-green-600",
                            category === "tools" &&
                            "bg-gradient-to-r from-purple-400 to-purple-600",
                            category === "design" &&
                            "bg-gradient-to-r from-pink-400 to-pink-600"
                          )}
                          data-level={skill.level}
                          style={{ width: "0%" }}
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Work Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My professional journey and the companies I've worked with
            </p>
          </div>

          <div ref={experienceRef} className="space-y-8">
            {EXPERIENCE.map((exp, index) => (
              <div
                key={exp.id}
                className="glass-card rounded-3xl p-8 border border-white/20"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {exp.position}
                    </h3>
                    <p className="text-xl text-blue-400 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-gray-400 font-medium">
                    {exp.duration}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 glass-effect rounded-full text-sm text-white border border-white/20"
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
