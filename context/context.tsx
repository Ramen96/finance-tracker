"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Theme = 'light' | 'dark';

 interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
 }

export const ThemeContext = createContext<ThemeContextType | undefined>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState<boolean>(false);


  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as Theme;

    if (saved) {
      setTheme(saved);
      document.body.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.body.setAttribute('data-theme', initial);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute("data-theme", newTheme);
  }

  if (!mounted) return<>{ children }</>;

  return (
    <ThemeContext.Provider value ={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}