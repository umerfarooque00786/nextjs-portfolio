import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost, Project, CMSUser, MediaFile, CMSStats, Permission } from '@/types/cms';

export interface CMSState {
  posts: BlogPost[];
  projects: Project[];
  users: CMSUser[];
  media: MediaFile[];
  permissions: Permission[];
  stats: CMSStats | null;
  isLoading: boolean;
  error: string | null;
  currentPost: BlogPost | null;
  currentProject: Project | null;
}

const initialState: CMSState = {
  posts: [],
  projects: [],
  users: [],
  media: [],
  permissions: [],
  stats: null,
  isLoading: false,
  error: null,
  currentPost: null,
  currentProject: null,
};

// Default permissions
const defaultPermissions: Permission[] = [
  {
    id: 'posts-full',
    name: 'Posts Management',
    description: 'Full access to blog posts',
    resource: 'posts',
    actions: ['create', 'read', 'update', 'delete', 'publish']
  },
  {
    id: 'projects-full',
    name: 'Projects Management',
    description: 'Full access to projects',
    resource: 'projects',
    actions: ['create', 'read', 'update', 'delete', 'publish']
  },
  {
    id: 'users-full',
    name: 'User Management',
    description: 'Full access to user management',
    resource: 'users',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'media-full',
    name: 'Media Management',
    description: 'Full access to media files',
    resource: 'media',
    actions: ['create', 'read', 'update', 'delete']
  }
];

// Async thunks for CMS operations
export const fetchPosts = createAsyncThunk(
  'cms/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API
      const savedPosts = localStorage.getItem('cms_posts');
      const posts = savedPosts ? JSON.parse(savedPosts) : [];
      return posts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'cms/createPost',
  async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to localStorage - replace with actual API
      const savedPosts = localStorage.getItem('cms_posts');
      const posts = savedPosts ? JSON.parse(savedPosts) : [];
      posts.push(newPost);
      localStorage.setItem('cms_posts', JSON.stringify(posts));

      return newPost;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'cms/updatePost',
  async ({ id, updates }: { id: string; updates: Partial<BlogPost> }, { rejectWithValue }) => {
    try {
      const savedPosts = localStorage.getItem('cms_posts');
      const posts = savedPosts ? JSON.parse(savedPosts) : [];
      
      const postIndex = posts.findIndex((post: BlogPost) => post.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }

      posts[postIndex] = {
        ...posts[postIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('cms_posts', JSON.stringify(posts));
      return posts[postIndex];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'cms/deletePost',
  async (id: string, { rejectWithValue }) => {
    try {
      const savedPosts = localStorage.getItem('cms_posts');
      const posts = savedPosts ? JSON.parse(savedPosts) : [];
      
      const filteredPosts = posts.filter((post: BlogPost) => post.id !== id);
      localStorage.setItem('cms_posts', JSON.stringify(filteredPosts));
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'cms/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const savedProjects = localStorage.getItem('cms_projects');
      const projects = savedProjects ? JSON.parse(savedProjects) : [];
      return projects;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  'cms/createProject',
  async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const newProject: Project = {
        ...projectData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const savedProjects = localStorage.getItem('cms_projects');
      const projects = savedProjects ? JSON.parse(savedProjects) : [];
      projects.push(newProject);
      localStorage.setItem('cms_projects', JSON.stringify(projects));

      return newProject;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'cms/updateProject',
  async ({ id, updates }: { id: string; updates: Partial<Project> }, { rejectWithValue }) => {
    try {
      const savedProjects = localStorage.getItem('cms_projects');
      const projects = savedProjects ? JSON.parse(savedProjects) : [];
      
      const projectIndex = projects.findIndex((project: Project) => project.id === id);
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }

      projects[projectIndex] = {
        ...projects[projectIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('cms_projects', JSON.stringify(projects));
      return projects[projectIndex];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'cms/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      const savedProjects = localStorage.getItem('cms_projects');
      const projects = savedProjects ? JSON.parse(savedProjects) : [];
      
      const filteredProjects = projects.filter((project: Project) => project.id !== id);
      localStorage.setItem('cms_projects', JSON.stringify(filteredProjects));
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserPermissions = createAsyncThunk(
  'cms/updateUserPermissions',
  async ({ userId, permissions }: { userId: string; permissions: Permission[] }, { rejectWithValue }) => {
    try {
      const savedUsers = localStorage.getItem('cms_users');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      
      const userIndex = users.findIndex((user: CMSUser) => user.id === userId);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      users[userIndex] = {
        ...users[userIndex],
        permissions,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('cms_users', JSON.stringify(users));
      return users[userIndex];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost | null>) => {
      state.currentPost = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    initializePermissions: (state) => {
      state.permissions = defaultPermissions;
    },
  },
  extraReducers: (builder) => {
    builder
      // Posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      // Projects
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      // Users
      .addCase(updateUserPermissions.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { clearError, setCurrentPost, setCurrentProject, initializePermissions } = cmsSlice.actions;
export default cmsSlice.reducer;
