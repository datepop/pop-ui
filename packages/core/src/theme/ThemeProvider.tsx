/**
 * PopUI Provider
 *
 * CSS Variables, Mantine Theme, Notifications를 통합 관리
 * Mantine을 완전히 추상화하여 사용자는 Mantine을 직접 언급하지 않아도 됨
 */

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { injectCSSVariables } from './cssVariables';
import { mantineTheme } from './mantineTheme';

import type { TThemeMode } from './cssVariables';
import type { NotificationsProps } from '@mantine/notifications';

interface IThemeContextValue {
  theme: TThemeMode;
  setTheme: (theme: TThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextValue | undefined>(undefined);

export interface IPopUiProviderProps {
  children: React.ReactNode;
  defaultTheme?: TThemeMode;
  /** Notifications 표시 위치 */
  notificationPosition?: NotificationsProps['position'];
  /** 동시에 표시되는 최대 알림 수 */
  notificationLimit?: number;
  /** 알림 자동 종료 시간 (ms, false로 설정 시 비활성화) */
  notificationAutoClose?: number | false;
  /** Notifications z-index */
  notificationZIndex?: number;
}

export const PopUiProvider: React.FC<IPopUiProviderProps> = ({
  children,
  defaultTheme = 'light',
  notificationPosition = 'bottom-center',
  notificationLimit = 5,
  notificationAutoClose,
  notificationZIndex,
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
      <MantineProvider theme={mantineTheme}>
        <Notifications
          position={notificationPosition}
          limit={notificationLimit}
          autoClose={notificationAutoClose}
          zIndex={notificationZIndex}
        />
        {children}
      </MantineProvider>
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
