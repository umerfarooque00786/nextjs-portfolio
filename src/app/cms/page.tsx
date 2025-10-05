'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { fetchPosts, fetchProjects, initializePermissions } from '@/store/slices/cmsSlice';

export default function CMSDashboard() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { posts, projects, isLoading } = useAppSelector((state) => state.cms);
  const { canManagePosts, canManageProjects, canManageUsers, isAdmin, isEditor, isAuthor } = usePermissions();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Only allow users with content management permissions
    if (!isAuthor()) {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    dispatch(initializePermissions());
    dispatch(fetchPosts());
    dispatch(fetchProjects());
  }, [dispatch]);

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

  if (!isAuthenticated || !isAuthor()) {
    return null;
  }

  const stats = [
    { 
      title: 'Blog Posts', 
      value: posts.length, 
      published: posts.filter(p => p.status === 'published').length,
      color: 'blue',
      canManage: canManagePosts()
    },
    { 
      title: 'Projects', 
      value: projects.length, 
      published: projects.filter(p => p.status === 'active').length,
      color: 'green',
      canManage: canManageProjects()
    },
    { 
      title: 'Media Files', 
      value: 0, 
      published: 0,
      color: 'purple',
      canManage: true
    },
    { 
      title: 'Users', 
      value: 1, 
      published: 1,
      color: 'orange',
      canManage: canManageUsers()
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div ref={containerRef} className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Content Management System
            </h1>
            <p className="text-xl text-gray-300">
              Welcome back, {user?.name}!
            </p>
            <div className="flex justify-center gap-2">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-blue-300 text-sm font-medium capitalize">{user?.role}</span>
              </div>
              {isAdmin() && (
                <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
                  <span className="text-red-300 text-sm font-medium">Full Access</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} variant="glass" className="p-6 hover:scale-105 transition-transform duration-300">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                    <div className={`w-3 h-3 rounded-full bg-${stat.color}-400`}></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm text-${stat.color}-400`}>
                      {stat.published} published
                    </p>
                    {!stat.canManage && (
                      <p className="text-xs text-red-400">No permission</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content Management */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Content Management</h2>
              <div className="space-y-4">
                {canManagePosts() && (
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Blog Posts</p>
                      <p className="text-gray-400 text-sm">Create and manage blog posts</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => router.push('/cms/posts')}
                      >
                        Manage
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => router.push('/cms/posts/new')}
                      >
                        New Post
                      </Button>
                    </div>
                  </div>
                )}
                
                {canManageProjects() && (
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Projects</p>
                      <p className="text-gray-400 text-sm">Manage portfolio projects</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => router.push('/cms/projects')}
                      >
                        Manage
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => router.push('/cms/projects/new')}
                      >
                        New Project
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Media Library</p>
                    <p className="text-gray-400 text-sm">Upload and manage media files</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push('/cms/media')}
                  >
                    Browse
                  </Button>
                </div>
              </div>
            </Card>

            {/* User Management (Admin Only) */}
            {isAdmin() && (
              <Card variant="glass" className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Users & Permissions</p>
                      <p className="text-gray-400 text-sm">Manage user roles and permissions</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => router.push('/cms/users')}
                    >
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Site Settings</p>
                      <p className="text-gray-400 text-sm">Configure site settings</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => router.push('/cms/settings')}
                    >
                      Settings
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Recent Activity */}
            {!isAdmin() && (
              <Card variant="glass" className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Your Permissions</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-white text-sm">Manage Posts</span>
                    <span className={`text-xs px-2 py-1 rounded ${canManagePosts() ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {canManagePosts() ? 'Allowed' : 'Denied'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-white text-sm">Manage Projects</span>
                    <span className={`text-xs px-2 py-1 rounded ${canManageProjects() ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {canManageProjects() ? 'Allowed' : 'Denied'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-white text-sm">Manage Users</span>
                    <span className={`text-xs px-2 py-1 rounded ${canManageUsers() ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {canManageUsers() ? 'Allowed' : 'Denied'}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
