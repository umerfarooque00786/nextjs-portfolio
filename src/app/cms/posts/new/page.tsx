'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { createPost } from '@/store/slices/cmsSlice';
import { BlogPost } from '@/types/cms';

export default function NewPost() {
  const { canManagePosts, user } = usePermissions();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'draft' as BlogPost['status'],
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title
      ...(name === 'title' && { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: formData.status,
        featuredImage: formData.featuredImage || undefined,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        publishedAt: formData.status === 'published' ? new Date().toISOString() : undefined,
        seo: {
          metaTitle: formData.metaTitle || undefined,
          metaDescription: formData.metaDescription || undefined,
          keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : undefined,
        },
      };

      await dispatch(createPost(postData));
      router.push('/cms/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!canManagePosts()) {
    router.push('/cms');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Post</h1>
              <p className="text-gray-400">Write and publish a new blog post</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/cms/posts')}
            >
              Back to Posts
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title"
                  required
                />
                <FormInput
                  label="Slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="post-url-slug"
                  required
                />
                <FormInput
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Technology, Design, etc."
                  required
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <FormInput
                  label="Tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="react, nextjs, typescript (comma separated)"
                />
              </div>
            </Card>

            {/* Content */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Content</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the post..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={12}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your post content here... (Markdown supported)"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Media */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Media</h2>
              <FormInput
                label="Featured Image URL"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </Card>

            {/* SEO */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <FormInput
                  label="Meta Title"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  placeholder="SEO optimized title"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Meta Description</label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SEO meta description..."
                  />
                </div>
                <FormInput
                  label="Keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="seo, keywords, comma, separated"
                />
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/cms/posts')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
