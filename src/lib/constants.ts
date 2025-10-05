import { Project, Skill, Experience, SocialLink } from '@/types';

// Portfolio data
export const PERSONAL_INFO = {
  name: "Umer Farooque",
  title: "Full Stack Developer",
  email: "00.umer786@gmail.com",
  phone: "+92 (300) 123-4567",
  location: "Pakistan",
  bio: "Passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications that solve real-world problems.",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/umerfarooque00786/nextjs-portfolio",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/umer-farooq-296252272",
    icon: "linkedin",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/umerkhan786",
    icon: "x",
  },
  {
    name: "Email",
    url: "mailto:00.umer786@gmail.com",
    icon: "email",
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 88, category: "frontend" },
  { name: "JavaScript", level: 92, category: "frontend" },
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "GSAP", level: 75, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "Python", level: 78, category: "backend" },
  { name: "PostgreSQL", level: 82, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  
  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "AWS", level: 70, category: "tools" },
  { name: "Vercel", level: 85, category: "tools" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Next.js Portfolio with Authentication",
    description: "A modern portfolio website with authentication system, smooth animations using GSAP and Locomotive Scroll, built with Next.js 15.",
    image: "/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "GSAP", "Locomotive Scroll", "Tailwind CSS"],
    githubUrl: "https://github.com/umerfarooque00786/nextjs-portfolio",
    liveUrl: "https://umer-portfolio.vercel.app",
    featured: true,
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/umerfarooque00786/ecommerce-platform",
    liveUrl: "https://umer-ecommerce.vercel.app",
    featured: true,
  },
  {
    id: "3",
    title: "React Task Manager",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/projects/taskmanager.jpg",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    githubUrl: "https://github.com/umerfarooque00786/react-task-manager",
    liveUrl: "https://umer-taskmanager.vercel.app",
    featured: false,
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "1",
    company: "Tech Company Inc.",
    position: "Senior Frontend Developer",
    duration: "2022 - Present",
    description: [
      "Led development of responsive web applications using React and Next.js",
      "Implemented complex animations and interactions using GSAP and Framer Motion",
      "Collaborated with design team to create pixel-perfect user interfaces",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["React", "Next.js", "TypeScript", "GSAP", "Tailwind CSS"],
  },
  {
    id: "2",
    company: "Digital Agency",
    position: "Full Stack Developer",
    duration: "2020 - 2022",
    description: [
      "Developed and maintained multiple client websites and web applications",
      "Built RESTful APIs using Node.js and Express.js",
      "Integrated third-party services and payment gateways",
      "Optimized application performance and SEO",
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "AWS"],
  },
];

// Animation configurations
export const SCROLL_CONFIG = {
  smooth: true,
  multiplier: 1,
  class: 'is-revealed',
  lerp: 0.1,
  firefoxMultiplier: 50,
  touchMultiplier: 2,
  smartphone: {
    smooth: true,
    breakpoint: 768,
    direction: 'vertical' as const,
    gestureDirection: 'vertical' as const,
  },
  tablet: {
    smooth: true,
    breakpoint: 1024,
    direction: 'vertical' as const,
    gestureDirection: 'vertical' as const,
  },
};

export const GSAP_CONFIG = {
  duration: 1,
  ease: "power2.out",
  stagger: 0.1,
  fadeIn: {
    duration: 1.2,
    ease: "power2.out",
    y: 50,
    opacity: 0,
  },
  slideUp: {
    duration: 1,
    ease: "power3.out",
    y: 100,
    opacity: 0,
  },
  scaleIn: {
    duration: 0.8,
    ease: "back.out(1.7)",
    scale: 0.8,
    opacity: 0,
  },
  textReveal: {
    duration: 1,
    ease: "power2.out",
    y: 100,
    skewY: 7,
  },
};
