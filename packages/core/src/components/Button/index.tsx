"use client";

import { Button as MantineButton, Loader } from "@mantine/core";
import { useMemo } from "react";

import styles from "./styles.module.scss";
import type { IButtonProps } from "./type";
import {
  TextColorButtonTextPrimaryDefault,
  TextColorButtonTextPrimarylineDefault,
  TextColorButtonTextBasicDefault,
} from "../../tokens/colors";

const LOADER_COLOR_MAP = {
  primary: TextColorButtonTextPrimaryDefault,
  primaryLine: TextColorButtonTextPrimarylineDefault,
  basic: TextColorButtonTextBasicDefault,
  danger: TextColorButtonTextPrimaryDefault,
  setting: TextColorButtonTextPrimaryDefault,
  warning: TextColorButtonTextPrimaryDefault,
} as const;

export function Button({
  children,
  size = "md",
  styleType = "primary",
  isLoading = false,
  disabled = false,
  ...props
}: IButtonProps) {
  const buttonClassName = useMemo(() => {
    const sizeMap = {
      lg: "baseButton--sizeLg",
      md: "baseButton--sizeMd",
      sm: "baseButton--sizeSm",
    };

    const variantMap = {
      primary: "baseButton--primary",
      primaryLine: "baseButton--primaryLine",
      basic: "baseButton--basic",
      danger: "baseButton--danger",
      setting: "baseButton--setting",
      warning: "baseButton--warning",
    };

    return `${styles.baseButton} ${styles[sizeMap[size]]} ${styles[variantMap[styleType]]}`;
  }, [size, styleType]);

  const loaderColor = LOADER_COLOR_MAP[styleType];

  const loaderSize = useMemo(() => {
    switch (size) {
      case "lg":
        return 18;
      case "sm":
        return 14;
      case "md":
      default:
        return 16;
    }
  }, [size]);

  return (
    <MantineButton
      type="button"
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader color={loaderColor} size={loaderSize} /> : children}
    </MantineButton>
  );
}

export default Button;
