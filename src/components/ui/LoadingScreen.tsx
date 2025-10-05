'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start exit animation after a brief delay
          setTimeout(() => {
            const tl = gsap.timeline({
              onComplete: () => {
                setIsVisible(false);
                onLoadingComplete();
              }
            });

            tl.to('.loading-screen', {
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut'
            })
            .to('.loading-screen', {
              y: '-100%',
              duration: 0.6,
              ease: 'power2.inOut'
            }, '-=0.4');
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center" suppressHydrationWarning>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" suppressHydrationWarning></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" suppressHydrationWarning></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full animate-spin-slow" suppressHydrationWarning></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center space-y-8" suppressHydrationWarning>
        {/* Logo */}
        <div className="flex justify-center mb-8" suppressHydrationWarning>
          <div className="relative" suppressHydrationWarning>
            <img
              src="/logo.svg"
              alt="Umer Farooque Logo"
              className="h-20 w-auto animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-ping" suppressHydrationWarning></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4" suppressHydrationWarning>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Umer Farooque
            </span>
          </h1>
          <p className="text-xl text-gray-300 animate-pulse">
            Full Stack Developer
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-2" suppressHydrationWarning>
          <div className="flex justify-between text-sm text-gray-400" suppressHydrationWarning>
            <span>Loading Portfolio</span>
            <span suppressHydrationWarning>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden" suppressHydrationWarning>
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
              suppressHydrationWarning
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" suppressHydrationWarning></div>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2" suppressHydrationWarning>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" suppressHydrationWarning></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100" suppressHydrationWarning></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200" suppressHydrationWarning></div>
        </div>
      </div>
    </div>
  );
}
