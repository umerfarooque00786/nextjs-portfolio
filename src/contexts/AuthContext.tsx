'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, signupUser, logoutUser } from '@/store/slices/authSlice';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await dispatch(loginUser({ email, password }));
      return loginUser.fulfilled.match(result);
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const result = await dispatch(signupUser({ email, password, name }));
      return signupUser.fulfilled.match(result);
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
