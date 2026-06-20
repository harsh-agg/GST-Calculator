// src/hooks/useDarkMode.js
// Custom hook to manage dark mode state and persist preference in localStorage
import { useState, useEffect } from 'react';

/**
 * useDarkMode — persists dark mode preference across sessions.
 * Returns [isDark, toggleDark]
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('gst-dark-mode');
    if (stored !== null) return JSON.parse(stored);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply/remove Tailwind's "dark" class on the <html> element
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('gst-dark-mode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return [isDark, toggleDark];
}
