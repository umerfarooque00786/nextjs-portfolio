'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { fetchProjects, deleteProject, updateProject } from '@/store/slices/cmsSlice';
import { Project } from '@/types/cms';

export default function ProjectsManagement() {
  const { projects, isLoading } = useAppSelector((state) => state.cms);
  const { canManageProjects, user } = usePermissions();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('all');

  useEffect(() => {
    if (!canManageProjects()) {
      router.push('/cms');
      return;
    }
    dispatch(fetchProjects());
  }, [dispatch, canManageProjects, router]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  const handleStatusChange = async (id: string, status: Project['status']) => {
    dispatch(updateProject({ id, updates: { status } }));
  };

  const handleFeaturedToggle = async (id: string, featured: boolean) => {
    dispatch(updateProject({ id, updates: { featured } }));
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'archived': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!canManageProjects()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Projects</h1>
              <p className="text-gray-400">Manage your portfolio projects</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/cms')}
              >
                Back to CMS
              </Button>
              <Button
                onClick={() => router.push('/cms/projects/new')}
                className="bg-gradient-to-r from-green-600 to-blue-600"
              >
                New Project
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card variant="glass" className="p-4">
            <div className="flex gap-2">
              {(['all', 'active', 'completed', 'archived'] as const).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={filter === status ? 'default' : 'outline'}
                  onClick={() => setFilter(status)}
                  className="capitalize"
                >
                  {status} ({status === 'all' ? projects.length : projects.filter(p => p.status === status).length})
                </Button>
              ))}
            </div>
          </Card>

          {/* Projects List */}
          <div className="space-y-4">
            {isLoading ? (
              <Card variant="glass" className="p-8 text-center">
                <p className="text-gray-400">Loading projects...</p>
              </Card>
            ) : filteredProjects.length === 0 ? (
              <Card variant="glass" className="p-8 text-center">
                <p className="text-gray-400">No projects found</p>
                <Button
                  className="mt-4"
                  onClick={() => router.push('/cms/projects/new')}
                >
                  Create Your First Project
                </Button>
              </Card>
            ) : (
              filteredProjects.map((project) => (
                <Card key={project.id} variant="glass" className="p-6">
                  <div className="flex gap-6">
                    {/* Project Image */}
                    {project.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    {/* Project Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>By {project.author.name}</span>
                        <span>•</span>
                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{project.category}</span>
                      </div>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.slice(0, 5).map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="text-gray-400 text-xs">+{project.technologies.length - 5} more</span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex gap-2">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/cms/projects/${project.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleFeaturedToggle(project.id, !project.featured)}
                        className={project.featured ? 'text-yellow-400 border-yellow-400' : ''}
                      >
                        {project.featured ? 'Unfeature' : 'Feature'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(project.id)}
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
