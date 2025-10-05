import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'author' | 'user';
  permissions?: any[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Demo credentials for testing
      const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
        setTimeout(() => {
          // Admin credentials
          if (credentials.email === 'admin@portfolio.com' && credentials.password === 'admin123') {
            resolve({
              user: {
                id: 'admin-1',
                name: 'Umer Farooque (Admin)',
                email: credentials.email,
                avatar: '/avatar.jpg',
                role: 'admin'
              },
              token: 'admin-jwt-token-12345'
            });
          }
          // User credentials
          else if (credentials.email === 'user@portfolio.com' && credentials.password === 'user123') {
            resolve({
              user: {
                id: 'user-1',
                name: 'Portfolio User',
                email: credentials.email,
                avatar: '/avatar.jpg',
                role: 'user'
              },
              token: 'user-jwt-token-12345'
            });
          }
          // Editor credentials
          else if (credentials.email === 'editor@portfolio.com' && credentials.password === 'editor123') {
            resolve({
              user: {
                id: 'editor-1',
                name: 'Content Editor',
                email: credentials.email,
                avatar: '/avatar.jpg',
                role: 'editor'
              },
              token: 'editor-jwt-token-12345'
            });
          }
          // Author credentials
          else if (credentials.email === 'author@portfolio.com' && credentials.password === 'author123') {
            resolve({
              user: {
                id: 'author-1',
                name: 'Content Author',
                email: credentials.email,
                avatar: '/avatar.jpg',
                role: 'author'
              },
              token: 'author-jwt-token-12345'
            });
          }
          // Demo user for testing
          else if (credentials.email === 'demo@test.com' && credentials.password === 'demo123') {
            resolve({
              user: {
                id: 'demo-1',
                name: 'Demo User',
                email: credentials.email,
                avatar: '/avatar.jpg',
                role: 'user'
              },
              token: 'demo-jwt-token-12345'
            });
          }
          else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });

      // Store token in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API call for signup
      const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
        setTimeout(() => {
          if (userData.email && userData.password && userData.name) {
            resolve({
              user: {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                avatar: '/avatar.jpg',
                role: 'user'
              },
              token: 'demo-jwt-token-' + Date.now()
            });
          } else {
            reject(new Error('Invalid user data'));
          }
        }, 1000);
      });

      // Store token in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // You can also call logout API here
      // await axios.post('/api/auth/logout');
      
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { clearError, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
