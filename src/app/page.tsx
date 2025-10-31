'use client';

import React from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="scroll-smooth">
        <section id="home">
          <Hero />
        </section>
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
