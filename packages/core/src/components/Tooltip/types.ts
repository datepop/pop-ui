import type { TooltipProps as MantineTooltipProps } from '@mantine/core';

export interface ITooltipProps extends Omit<MantineTooltipProps, 'label'> {
  title?: string;
  content: string;
}
