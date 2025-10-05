export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  technologies: string[];
  category: string;
  status: 'active' | 'completed' | 'archived';
  featured: boolean;
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  endDate?: string;
}

export interface CMSUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author' | 'user';
  permissions: Permission[];
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: 'posts' | 'projects' | 'users' | 'settings' | 'media';
  actions: ('create' | 'read' | 'update' | 'delete' | 'publish')[];
}

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
  alt?: string;
  caption?: string;
  uploadedBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  tags?: string[];
}

export interface CMSSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo?: string;
  favicon?: string;
  socialMedia: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  seo: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    defaultKeywords: string[];
  };
  email: {
    contactEmail: string;
    notificationEmail: string;
  };
}

export interface CMSStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalProjects: number;
  activeProjects: number;
  totalUsers: number;
  activeUsers: number;
  totalMedia: number;
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  user: {
    id: string;
    name: string;
  };
  timestamp: string;
  details?: any;
}
