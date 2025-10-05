"use client";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      // Reveal animations
      gsap.to(".hero-line", { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" });
      gsap.to([".hero-description", ".hero-buttons", ".hero-avatar"], { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.5 });
      // Section fade-ups
      [".about .container", ".skills .container", ".projects .container", ".contact .container"].forEach((sel) => {
        gsap.from(sel, { y: 60, opacity: 0, duration: 0.8, scrollTrigger: { trigger: sel, start: "top 80%" } });
      });
    })();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-line">Hello, I'm</span>
              <span className="hero-line hero-name">Your Name</span>
              <span className="hero-line">Full Stack Developer</span>
            </h1>
            <p className="hero-description">Creating amazing digital experiences with modern technologies</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image"><div className="hero-avatar" /></div>
        </div>
        <div className="scroll-indicator"><span>Scroll Down</span><div className="scroll-arrow" /></div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>I'm a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications.</p>
              <p>With years of experience in both frontend and backend development, I bring ideas to life through clean code and innovative solutions.</p>
              <div className="about-stats">
                <div className="stat"><h3>50+</h3><p>Projects Completed</p></div>
                <div className="stat"><h3>3+</h3><p>Years Experience</p></div>
                <div className="stat"><h3>100%</h3><p>Client Satisfaction</p></div>
              </div>
            </div>
            <div className="about-image"><div className="about-avatar" /></div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skill-items">
                <span className="skill-item">HTML5</span>
                <span className="skill-item">CSS3</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">React</span>
                <span className="skill-item">GSAP</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skill-items">
                <span className="skill-item">Node.js</span>
                <span className="skill-item">Python</span>
                <span className="skill-item">MongoDB</span>
                <span className="skill-item">PostgreSQL</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <div className="skill-items">
                <span className="skill-item">Git</span>
                <span className="skill-item">Docker</span>
                <span className="skill-item">AWS</span>
                <span className="skill-item">Figma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card"><div className="project-image" /><div className="project-content"><h3>E-Commerce Platform</h3><p>React, Node, MongoDB</p></div></div>
            <div className="project-card"><div className="project-image" /><div className="project-content"><h3>Task Management App</h3><p>Vue, Express, Socket.io</p></div></div>
            <div className="project-card"><div className="project-image" /><div className="project-content"><h3>Portfolio Website</h3><p>HTML, CSS, GSAP</p></div></div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's work together</h3>
              <p>I'm always interested in new opportunities and exciting projects.</p>
              <div className="contact-details">
                <div className="contact-item"><i className="fas fa-envelope"></i><span>your.email@example.com</span></div>
                <div className="contact-item"><i className="fas fa-phone"></i><span>+1 (555) 123-4567</span></div>
                <div className="contact-item"><i className="fas fa-map-marker-alt"></i><span>Your City, Country</span></div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-github" /></a>
                <a href="#" className="social-link"><i className="fab fa-linkedin" /></a>
                <a href="#" className="social-link"><i className="fab fa-twitter" /></a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group"><input type="text" placeholder="Your Name" required /></div>
              <div className="form-group"><input type="email" placeholder="Your Email" required /></div>
              <div className="form-group"><input type="text" placeholder="Subject" required /></div>
              <div className="form-group"><textarea placeholder="Your Message" rows={5} required /></div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

