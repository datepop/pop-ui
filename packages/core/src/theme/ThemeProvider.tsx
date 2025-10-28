/**
 * Theme Provider
 *
 * CSS Variables와 Mantine Theme을 통합 관리
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { ThemeMode, injectCSSVariables } from './cssVariables';
import { mantineTheme } from './mantineTheme';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);

  useEffect(() => {
    injectCSSVariables(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <MantineProvider theme={mantineTheme}>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
