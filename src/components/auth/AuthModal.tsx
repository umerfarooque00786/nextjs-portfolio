'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSignup: (email: string, password: string, name: string) => Promise<boolean>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isOpen || !headerRef.current || !formRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
  }, [isOpen, isLoginMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Add loading animation
    if (formRef.current) {
      gsap.to(formRef.current, {
        scale: 0.98,
        duration: 0.2,
        ease: "power2.out"
      });
    }

    try {
      let success = false;
      if (isLoginMode) {
        success = await onLogin(formData.email, formData.password);
      } else {
        success = await onSignup(formData.email, formData.password, formData.name);
      }

      if (success) {
        // Success animation
        if (formRef.current) {
          gsap.to(formRef.current, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              onClose();
              setFormData({ name: '', email: '', password: '' });
            }
          });
        }
      } else {
        setError(isLoginMode ? 'Invalid credentials' : 'Signup failed');
        // Error shake animation
        if (formRef.current) {
          gsap.fromTo(formRef.current,
            { x: 0 },
            {
              x: -10,
              duration: 0.1,
              ease: "power2.out",
              yoyo: true,
              repeat: 3,
              onComplete: () => {
                gsap.set(formRef.current, { x: 0 });
              }
            }
          );
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      // Error shake animation
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { x: 0 },
          {
            x: -10,
            duration: 0.1,
            ease: "power2.out",
            yoyo: true,
            repeat: 3,
            onComplete: () => {
              gsap.set(formRef.current, { x: 0 });
            }
          }
        );
      }
    } finally {
      setIsLoading(false);
      // Reset form scale
      if (formRef.current) {
        gsap.to(formRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLoginMode ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400">
            {isLoginMode ? 'Sign in to your account' : 'Join our community today'}
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {!isLoginMode && (
            <Input
              type="text"
              id="name"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required={!isLoginMode}
              placeholder="Enter your full name"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
          )}

          <Input
            type="email"
            id="auth-email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />

          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
            minLength={6}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-3 animate-pulse">
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <Button
              type="button"
              onClick={toggleMode}
              variant="ghost"
              size="sm"
              className="ml-2"
            >
              {isLoginMode ? 'Sign Up' : 'Sign In'}
            </Button>
          </p>
        </div>
      </div>
    </Modal>
  );
};
