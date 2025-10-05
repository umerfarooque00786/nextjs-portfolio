'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/ui/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { user: reduxUser } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (reduxUser?.role === 'admin') {
      router.push('/admin');
    }
  }, [reduxUser, router]);

  useEffect(() => {
    if (!headerRef.current || !cardsRef.current || !activityRef.current || !actionsRef.current) return;

    const tl = gsap.timeline();
    const cards = cardsRef.current.children;
    const activities = activityRef.current.querySelectorAll('.activity-item');

    // Header animation
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Cards stagger animation
    tl.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.4"
    );

    // Activity items animation
    tl.fromTo(activities,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1
      },
      "-=0.3"
    );

    // Actions animation
    tl.fromTo(actionsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <Navigation />

        <main className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div ref={headerRef} className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Your Dashboard
              </h1>
              <p className="text-xl text-gray-400">
                Hello, {user?.name}! Here's your portfolio overview.
              </p>
            </div>

            {/* Dashboard Content */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Stats Cards */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white">1,234</h3>
                    <p className="text-gray-400">Profile Views</p>
                  </div>
                </div>
              </Card>

              <Card variant="glass" className="p-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                    🚀
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white">24</h3>
                    <p className="text-gray-400">Projects</p>
                  </div>
                </div>
              </Card>

              <Card variant="glass" className="p-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                    ⚙️
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white">89</h3>
                    <p className="text-gray-400">Messages</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card ref={activityRef} variant="glass" className="p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">📈</span>
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="activity-item flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Successfully logged in</p>
                    <p className="text-gray-400 text-sm">Just now</p>
                  </div>
                  <span className="text-xl">✅</span>
                </div>
                <div className="activity-item flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Accessed dashboard</p>
                    <p className="text-gray-400 text-sm">2 minutes ago</p>
                  </div>
                  <span className="text-xl">🏠</span>
                </div>
                <div className="activity-item flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Profile updated</p>
                    <p className="text-gray-400 text-sm">1 hour ago</p>
                  </div>
                  <span className="text-xl">✏️</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Edit Profile
                </button>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Add Project
                </button>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
