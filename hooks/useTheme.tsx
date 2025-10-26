"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const t = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(t as Theme);
  }, []);
  function toggle() {
    document.documentElement.classList.toggle('dark');
    setTheme((s) => (s === 'light' ? 'dark' : 'light'));
  }
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
