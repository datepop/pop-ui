'use client';

import { Tooltip as MantineTooltip } from '@mantine/core';

import styles from './styles.module.scss';

import type { TooltipProps as MantineTooltipProps } from '@mantine/core';

export interface ITooltipProps extends MantineTooltipProps {
  title?: string;
  content: string;
}

export const Tooltip = ({
  title,
  content,
  maw = 280,
  multiline = true,
  ...props
}: ITooltipProps) => {
  return (
    <MantineTooltip
      {...props}
      maw={maw}
      multiline={multiline}
      label={
        <div className={styles['Tooltip__Body']}>
          {title && <span className={styles['Tooltip__Title']}>{title}</span>}
          <span className={styles['Tooltip__Content']}>{content}</span>
        </div>
      }
    />
  );
};

export default Tooltip;
