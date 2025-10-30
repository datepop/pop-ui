"use client";

import { Button as MantineButton, Loader } from "@mantine/core";
import { useMemo } from "react";

import { getButtonStyles, LOADER_COLOR_MAP } from "./style";

import type { IButtonProps } from "./type";

export function Button({
  children,
  size = "md",
  variant = "primary",
  isLoading = false,
  disabled = false,
  ...props
}: IButtonProps) {
  const buttonStyles = useMemo(
    () => getButtonStyles(variant, size),
    [variant, size]
  );

  const loaderColor = LOADER_COLOR_MAP[variant];

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
      styles={buttonStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader color={loaderColor} size={loaderSize} /> : children}
    </MantineButton>
  );
}

export default Button;
