import { Project, Skill, Experience, SocialLink } from '@/types';

// Portfolio data
export const PERSONAL_INFO = {
  name: "Umer Farooque",
  title: "Full Stack Developer",
  email: "00.umer786@gmail.com",
  phone: "+92 (300) 123-4567",
  location: "Pakistan",
  bio: "Passionate full-stack developer with 3+ years of experience in web development. I specialize in custom WordPress, PHP, Laravel, and Next.js development. Currently growing my skills and polishing my expertise in modern web technologies to deliver exceptional digital solutions.",
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
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "React", level: 88, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "frontend" },
  { name: "GSAP", level: 75, category: "frontend" },

  // Backend
  { name: "PHP", level: 90, category: "backend" },
  { name: "Laravel", level: 88, category: "backend" },
  { name: "WordPress", level: 92, category: "backend" },
  { name: "MySQL", level: 85, category: "backend" },
  { name: "Node.js", level: 75, category: "backend" },

  // Tools
  { name: "Git", level: 85, category: "tools" },
  { name: "Vercel", level: 80, category: "tools" },
  { name: "cPanel", level: 85, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Next.js Portfolio with Authentication",
    description: "A modern portfolio website with authentication system, smooth animations using GSAP, and professional design. Built with Next.js 15 and TypeScript.",
    image: "/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/umerfarooque00786/nextjs-portfolio",
    liveUrl: "https://umer-portfolio.vercel.app",
    featured: true,
  },
  {
    id: "2",
    title: "Custom WordPress Solutions",
    description: "Multiple custom WordPress websites with custom themes, plugins, and advanced functionality. Focused on performance and user experience.",
    image: "/projects/ecommerce.jpg",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "CSS"],
    githubUrl: "https://github.com/umerfarooque00786/wordpress-projects",
    liveUrl: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Laravel Web Applications",
    description: "Full-stack web applications built with Laravel framework, featuring user authentication, database management, and RESTful APIs.",
    image: "/projects/taskmanager.jpg",
    technologies: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
    githubUrl: "https://github.com/umerfarooque00786/laravel-projects",
    liveUrl: "#",
    featured: false,
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "1",
    company: "Freelance & Contract Work",
    position: "Full Stack Developer",
    duration: "2022 - Present (1+ Year)",
    description: [
      "Specialized in Next.js development for modern web applications",
      "Built responsive and interactive user interfaces with React",
      "Implemented server-side rendering and static site generation",
      "Continuously learning and polishing skills in modern web technologies",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    id: "2",
    company: "Various Clients & Projects",
    position: "Full Stack Developer",
    duration: "2021 - 2022 (2 Years)",
    description: [
      "Developed custom WordPress themes and plugins",
      "Built dynamic web applications using PHP and Laravel",
      "Created RESTful APIs and database management systems",
      "Delivered full-stack solutions from concept to deployment",
    ],
    technologies: ["WordPress", "PHP", "Laravel", "MySQL", "JavaScript"],
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
