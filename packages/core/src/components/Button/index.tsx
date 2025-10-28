"use client";

import { Button as MantineButton } from "@mantine/core";
import styles from "./styles.module.scss";
import type { IButtonProps } from "./type";

export function Button({
  children,
  size = "md",
  styleType = "primary",
  ...props
}: IButtonProps) {
  let sizeStyle = styles.md_button;
  if (size === "sm") {
    sizeStyle = styles.sm_button;
  } else if (size === "lg") {
    sizeStyle = styles.lg_button;
  }

  let buttonStyle = styles.primary;
  if (styleType === "basic") {
    buttonStyle = styles.basic;
  } else if (styleType === "primaryLine") {
    buttonStyle = styles.primaryLine;
  } else if (styleType === "danger") {
    buttonStyle = styles.danger;
  } else if (styleType === "setting") {
    buttonStyle = styles.setting;
  }

  return (
    <MantineButton
      type="button"
      className={`${buttonStyle} ${sizeStyle}`}
      {...props}
    >
      {children}
    </MantineButton>
  );
}

export default Button;
