'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { fetchPosts, deletePost, updatePost } from '@/store/slices/cmsSlice';
import { BlogPost } from '@/types/cms';

export default function PostsManagement() {
  const { posts, isLoading } = useAppSelector((state) => state.cms);
  const { canManagePosts, canPublish, user } = usePermissions();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');

  useEffect(() => {
    if (!canManagePosts()) {
      router.push('/cms');
      return;
    }
    dispatch(fetchPosts());
  }, [dispatch, canManagePosts, router]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  const handleStatusChange = async (id: string, status: BlogPost['status']) => {
    dispatch(updatePost({ id, updates: { status } }));
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const getStatusColor = (status: BlogPost['status']) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-500/20';
      case 'draft': return 'text-yellow-400 bg-yellow-500/20';
      case 'archived': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!canManagePosts()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
              <p className="text-gray-400">Manage your blog posts</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/cms')}
              >
                Back to CMS
              </Button>
              <Button
                onClick={() => router.push('/cms/posts/new')}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                New Post
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card variant="glass" className="p-4">
            <div className="flex gap-2">
              {(['all', 'published', 'draft', 'archived'] as const).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={filter === status ? 'default' : 'outline'}
                  onClick={() => setFilter(status)}
                  className="capitalize"
                >
                  {status} ({status === 'all' ? posts.length : posts.filter(p => p.status === status).length})
                </Button>
              ))}
            </div>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {isLoading ? (
              <Card variant="glass" className="p-8 text-center">
                <p className="text-gray-400">Loading posts...</p>
              </Card>
            ) : filteredPosts.length === 0 ? (
              <Card variant="glass" className="p-8 text-center">
                <p className="text-gray-400">No posts found</p>
                <Button
                  className="mt-4"
                  onClick={() => router.push('/cms/posts/new')}
                >
                  Create Your First Post
                </Button>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} variant="glass" className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {post.author.name}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                        {post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex gap-1">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-gray-400">+{post.tags.length - 3} more</span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/cms/posts/${post.id}/edit`)}
                      >
                        Edit
                      </Button>
                      {canPublish() && post.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(post.id, 'published')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Publish
                        </Button>
                      )}
                      {canPublish() && post.status === 'published' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(post.id, 'draft')}
                        >
                          Unpublish
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-400 border-red-400 hover:bg-red-500/20"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
