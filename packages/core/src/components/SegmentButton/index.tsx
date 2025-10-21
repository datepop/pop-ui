'use client'

import { SegmentedControl, SegmentedControlProps } from "@mantine/core";
import styles from "./styles.module.scss";

export interface SegmentButtonProps extends SegmentedControlProps {
  size?: "sm" | "md" | "lg";
  radius?: number | "xs" | "sm" | "md" | "lg" | "xl";
}

export const SegmentButton = ({
  size = "md",
  radius = 6,
  ...props
}: SegmentButtonProps) => {
  let sizeStyle = styles.md_segment_button;
  if (size === "sm") {
    sizeStyle = styles.sm_segment_button;
  } else if (size === "lg") {
    sizeStyle = styles.lg_segment_button;
  }

  return (
    <SegmentedControl
      className={sizeStyle}
      size={size}
      radius={radius}
      styles={{
        control: {
          borderWidth: "0 !important",
        },
      }}
      {...props}
    />
  );
};

export default SegmentButton;
