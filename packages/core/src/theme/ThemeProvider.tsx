/**
 * Theme Provider
 *
 * CSS Variables와 Mantine Theme을 통합 관리
 */

import { MantineProvider } from '@mantine/core';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { injectCSSVariables } from './cssVariables';
import { mantineTheme } from './mantineTheme';

import type { TThemeMode } from './cssVariables';

interface IThemeContextValue {
  theme: TThemeMode;
  setTheme: (theme: TThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextValue | undefined>(undefined);

interface IThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: TThemeMode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setTheme] = useState<TThemeMode>(defaultTheme);

  useEffect(() => {
    injectCSSVariables(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
