'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loadUserFromStorage } from '@/store/slices/authSlice';

export function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load user from localStorage on app initialization
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null; // This component doesn't render anything
}
