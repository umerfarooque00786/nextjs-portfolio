"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import emailjs from '@emailjs/browser';
import { useScrollAnimation, useMagnetic } from "@/hooks/useGSAP";
// Using direct data attributes for Locomotive Scroll
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "@/types";
import { cn, isValidEmail } from "@/lib/utils";

// Initialize EmailJS
emailjs.init('2jMePI2n3IvItjHNL'); // EmailJS public key

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Animations
  useScrollAnimation(titleRef, "fadeInUp", {
    scrollTrigger: {
      start: "top 80%",
    },
  });

  useScrollAnimation(formRef, "fadeInUp", {
    delay: 0.2,
    scrollTrigger: {
      start: "top 80%",
    },
  });

  // Magnetic effect for submit button
  useMagnetic(submitButtonRef, {
    strength: 0.2,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Email to User (Confirmation)
      const userEmailParams = {
        name: formData.name,
        title: formData.subject || 'New Contact Form Submission',
        email: formData.email,
        message: formData.message,
        to_email: formData.email, // Send to user
      };

      // Email to Admin (Notification)
      const adminEmailParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'New Contact Form Submission',
        message: formData.message,
        to_email: PERSONAL_INFO.email, // Send to admin
      };

      // Send email to user
      await emailjs.send(
        'service_vypdyug', // EmailJS service ID
        'template_6jyt8gx', // EmailJS template ID (user confirmation)
        userEmailParams
      );

      // Send email to admin
      await emailjs.send(
        'service_vypdyug', // EmailJS service ID
        'template_qkw39tz', // Admin notification template
        adminEmailParams
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2
              ref={titleRef}
              className="text-4xl lg:text-5xl font-bold text-white"
            >
              Let's Work Together
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed">
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question or just want to say hi, I'll try my
              best to get back to you!
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 glass-card-enhanced rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 glass-card-enhanced rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white font-medium">
                    03003024283
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 glass-card-enhanced rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-medium">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-gray-400 mb-4">Follow me on</p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-12 h-12 glass-effect rounded-xl flex items-center justify-center",
                      "text-gray-300 hover:text-white hover:bg-white/20",
                      "transition-all duration-300 transform hover:scale-110 border border-white/20"
                    )}
                    aria-label={link.name}
                  >
                    <SocialIcon icon={link.icon} className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card-enhanced rounded-3xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 glass-effect rounded-xl",
                      "text-white placeholder-gray-400",
                      "focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30",
                      "transition-all duration-300 hover:bg-white/10"
                    )}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 glass-effect rounded-xl",
                      "text-white placeholder-gray-400",
                      "focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30",
                      "transition-all duration-300 hover:bg-white/10"
                    )}
                    placeholder="00.umer786@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg",
                    "text-white placeholder-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "transition-all duration-300"
                  )}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={cn(
                    "w-full px-4 py-3 glass-effect rounded-xl",
                    "text-white placeholder-gray-400 resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30",
                    "transition-all duration-300 hover:bg-white/10"
                  )}
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                ref={submitButtonRef}
                type="submit"
                disabled={isSubmitting}
                  className={cn(
                    "w-full px-8 py-4 text-lg font-semibold rounded-2xl",
                    "glass-effect text-white hover:bg-white/20",
                    "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent",
                    "transform transition-all duration-300 hover:scale-105",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <p className="text-green-400 text-center">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
