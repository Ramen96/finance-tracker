"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export const ThemeContext = createContext<{ theme: 'light' | 'dark'; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const stored = localStorage.getItem('theme');
  const prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");


  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    document.documentElement.classList.toggle("dark");
  };

  function handleThemeChange(event) {
    if (event.matches) {
      setTheme('dark')
    } else {
      setTheme('light');
    }
  }

  useEffect(() => {
    prefersDarkQuery.addEventListener('change', handleThemeChange);
  }, []);

  return (
    <ThemeContext.Provider value ={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);