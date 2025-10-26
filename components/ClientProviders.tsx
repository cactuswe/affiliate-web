"use client";
import React from 'react';
import { ThemeProvider } from '../hooks/useTheme';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
