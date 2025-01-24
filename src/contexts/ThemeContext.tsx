import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'cyberpunk';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isCyberpunk: boolean;
  toggleCyberpunk: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeMode) || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'cyberpunk');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isCyberpunk = theme === 'cyberpunk';

  const toggleCyberpunk = () => {
    setTheme(prev => prev === 'cyberpunk' ? 'dark' : 'cyberpunk');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isCyberpunk, toggleCyberpunk }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 