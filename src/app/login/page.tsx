'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  // Clear errors on component mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const tl = gsap.timeline();

    // Initial animations
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
    .fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Floating animation for title
    gsap.to(titleRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    dispatch(clearError());

    try {
      const result = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(result)) {
        // Direct redirect to home without animation delay
        router.push('/');
      } else {
        // Error shake animation
        if (containerRef.current) {
          gsap.fromTo(containerRef.current,
            { x: 0 },
            {
              x: -10,
              duration: 0.1,
              ease: "power2.out",
              yoyo: true,
              repeat: 3,
              onComplete: () => {
                gsap.set(containerRef.current, { x: 0 });
              }
            }
          );
        }
      }
    } catch (err) {
      // Error shake animation
      if (containerRef.current) {
        gsap.fromTo(containerRef.current,
          { x: 0 },
          {
            x: -10,
            duration: 0.1,
            ease: "power2.out",
            yoyo: true,
            repeat: 3,
            onComplete: () => {
              gsap.set(containerRef.current, { x: 0 });
            }
          }
        );
      }
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* iOS-style Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/20 via-purple-500/10 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Title - Logo removed */}
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-6xl font-bold text-center text-white mb-4"
        >
          Welcome Back
        </h1>
        <p className="text-center text-gray-300 mb-8 text-base">
          Sign in to continue your journey
        </p>

        {/* Login Card with iOS Glass Effect */}
        <div ref={containerRef} className="glass-card rounded-3xl p-8 border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              {...register('email')}
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            <FormInput
              {...register('password')}
              type="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              showPasswordToggle
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
              className="w-full shadow-lg hover:shadow-xl"
              size="lg"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">
                Demo credentials: admin@example.com / password
              </p>
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => router.push('/signup')}
                  className="text-blue-400 hover:text-blue-300 underline cursor-pointer font-medium transition-colors"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Demo credentials section removed (component not defined) */}
    </div>
  );
}
