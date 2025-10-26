"use client";
import React from 'react';
import { ToastProvider } from './ui/Toast';
import { ThemeProvider } from '@/hooks/useTheme';

// Compose providers here. Theme wraps Toast so theme toggles can affect toasts.
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
