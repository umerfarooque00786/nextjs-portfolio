'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { cn } from '@/lib/utils';

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15: A Complete Guide',
    excerpt: 'Learn how to build modern web applications with the latest features in Next.js 15, including the new App Router and Server Components.',
    content: 'Next.js 15 brings exciting new features that make building React applications even more powerful and efficient...',
    author: 'Umer Farooque',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    featured: true
  },
  {
    id: 2,
    title: 'Mastering GSAP Animations in React Applications',
    excerpt: 'Discover how to create stunning animations in React using GSAP, from basic tweens to complex timeline animations.',
    content: 'GSAP (GreenSock Animation Platform) is one of the most powerful animation libraries available for web development...',
    author: 'Umer Farooque',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Animation',
    tags: ['GSAP', 'React', 'Animation', 'Frontend'],
    featured: true
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'Learn best practices for creating robust and scalable REST APIs using Node.js, Express, and modern development patterns.',
    content: 'Building scalable APIs is crucial for modern web applications. In this guide, we\'ll explore best practices...',
    author: 'Umer Farooque',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    featured: false
  },
  {
    id: 4,
    title: 'TypeScript Best Practices for Large Applications',
    excerpt: 'Explore advanced TypeScript patterns and best practices that will help you build maintainable large-scale applications.',
    content: 'TypeScript has become an essential tool for building large-scale JavaScript applications...',
    author: 'Umer Farooque',
    date: '2023-12-28',
    readTime: '15 min read',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    featured: false
  },
  {
    id: 5,
    title: 'Modern CSS Techniques: Grid, Flexbox, and Beyond',
    excerpt: 'Master modern CSS layout techniques and create responsive designs that work across all devices and browsers.',
    content: 'CSS has evolved significantly over the years, and modern CSS techniques allow us to create complex layouts...',
    author: 'Umer Farooque',
    date: '2023-12-20',
    readTime: '7 min read',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design'],
    featured: false
  },
  {
    id: 6,
    title: 'Optimizing React Performance: Tips and Tricks',
    excerpt: 'Learn how to optimize your React applications for better performance using memoization, lazy loading, and other techniques.',
    content: 'React performance optimization is crucial for creating smooth user experiences...',
    author: 'Umer Farooque',
    date: '2023-12-15',
    readTime: '11 min read',
    category: 'React',
    tags: ['React', 'Performance', 'Optimization'],
    featured: false
  }
];

const categories = ['All', 'Web Development', 'Animation', 'Backend', 'TypeScript', 'CSS', 'React'];

export default function BlogPage() {
  const heroRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

    // Posts animation
    if (postsRef.current) {
      const postCards = postsRef.current.querySelectorAll('.blog-post');
      gsap.fromTo(postCards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: postsRef.current,
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

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              My <span className="text-blue-400">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and thoughts on web development, technology, and design
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="glass-card rounded-3xl overflow-hidden border border-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="h-48 glass-effect flex items-center justify-center relative">
                  <div className="text-white text-6xl font-bold opacity-30">
                    {post.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 glass-effect text-blue-300 text-sm font-semibold rounded-full border border-white/20">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 glass-effect rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/20">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{post.author}</p>
                        <p className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm cursor-pointer transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer",
                  selectedCategory === category
                    ? "glass-effect text-white shadow-lg bg-white/20"
                    : "glass-effect text-gray-300 hover:text-white hover:bg-white/10"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </h2>
          <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-post glass-card rounded-2xl overflow-hidden border border-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="h-32 glass-effect flex items-center justify-center">
                  <div className="text-white text-4xl font-bold opacity-30">
                    {post.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 glass-effect text-gray-300 text-xs font-semibold rounded border border-white/20">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 glass-effect text-blue-300 text-xs rounded border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm cursor-pointer transition-colors">
                      Read →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-300">No articles found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Subscribe to get notified about new articles and insights on web development.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30"
            />
            <button className="px-6 py-3 glass-effect text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
