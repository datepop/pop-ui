'use client'

import {
  Checkbox as MantineCheckbox,
  CheckboxProps as MantineCheckboxProps,
} from "@mantine/core";
import styles from "./styles.module.scss";

export interface CheckboxProps extends MantineCheckboxProps {
  size?: "sm" | "md" | "lg";
}

export const Checkbox = ({ size = "md", ...props }: CheckboxProps) => {
  let sizeStyle = styles.md_checkbox;
  let sizeNumber = 24;
  if (size === "sm") {
    sizeStyle = styles.sm_checkbox;
    sizeNumber = 18;
  } else if (size === "lg") {
    sizeStyle = styles.lg_checkbox;
    sizeNumber = 32;
  }

  return (
    <MantineCheckbox
      className={sizeStyle}
      styles={{
        inner: {
          width: sizeNumber,
          height: sizeNumber,
        },
      }}
      {...props}
    />
  );
};

export default Checkbox;
