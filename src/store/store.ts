import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cmsReducer from './slices/cmsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cms: cmsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
