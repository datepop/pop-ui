'use client'

import {
  Tooltip as MantineTooltip,
  TooltipProps as MantineTooltipProps,
} from "@mantine/core";
import styles from "./styles.module.scss";

export interface TooltipProps extends MantineTooltipProps {
  title?: string;
  content: string;
}

export const Tooltip = ({
  title,
  content,
  maw = 280,
  multiline = true,
  ...props
}: TooltipProps) => {
  return (
    <MantineTooltip
      {...props}
      maw={maw}
      multiline={multiline}
      label={
        <div className={styles["Tooltip__Body"]}>
          {title && <span className={styles["Tooltip__Title"]}>{title}</span>}
          <span className={styles["Tooltip__Content"]}>{content}</span>
        </div>
      }
    />
  );
};

export default Tooltip;
