'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    const cards = cardsRef.current.children;
    tl.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    );
  }, []);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const adminStats = [
    { title: 'Total Users', value: '1,234', change: '+12%', color: 'blue' },
    { title: 'Projects', value: '45', change: '+8%', color: 'green' },
    { title: 'Messages', value: '89', change: '+23%', color: 'purple' },
    { title: 'Revenue', value: '$12,345', change: '+15%', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div ref={containerRef} className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Welcome back, {user?.name}!
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">Administrator</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminStats.map((stat, index) => (
              <Card key={index} variant="glass" className="p-6 hover:scale-105 transition-transform duration-300">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                    <div className={`w-3 h-3 rounded-full bg-${stat.color}-400`}></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm text-${stat.color}-400`}>{stat.change} from last month</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Management */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Active Users</p>
                    <p className="text-gray-400 text-sm">Manage user accounts</p>
                  </div>
                  <Button size="sm" variant="outline">View All</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Pending Approvals</p>
                    <p className="text-gray-400 text-sm">Review new registrations</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            </Card>

            {/* Content Management */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Content Management</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Projects</p>
                    <p className="text-gray-400 text-sm">Manage portfolio projects</p>
                  </div>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Blog Posts</p>
                    <p className="text-gray-400 text-sm">Create and edit articles</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card variant="glass" className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'New user registered', user: 'john@example.com', time: '2 minutes ago' },
                { action: 'Project updated', user: 'admin', time: '1 hour ago' },
                { action: 'Contact form submitted', user: 'visitor', time: '3 hours ago' },
                { action: 'Blog post published', user: 'admin', time: '1 day ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
