import type { TabsProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface ITabProps extends TabsProps {
  tabList: {
    title: string;
    value: string;
    body: ReactNode;
    icon?: ReactNode;
  }[];
  containerPaddingTop?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
