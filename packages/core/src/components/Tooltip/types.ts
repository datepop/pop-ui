import type { TooltipProps as MantineTooltipProps } from '@mantine/core';

export interface ITooltipProps extends MantineTooltipProps {
  title?: string;
  content: string;
}
