"use client";
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const t = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(t as any);
  }, []);
  function toggle() {
    document.documentElement.classList.toggle('dark');
    setTheme((s) => (s === 'light' ? 'dark' : 'light'));
  }
  return { theme, toggle };
}
