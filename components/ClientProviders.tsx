"use client"
import React from 'react'
import { ToastProvider } from './ui/Toast'
import { ThemeProvider } from '@/hooks/useTheme'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}
