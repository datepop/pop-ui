import type { ButtonProps as MantineButtonProps } from "@mantine/core";

export type TButtonSize = "sm" | "md" | "lg";
export type TButtonVariant =
  | "primary"
  | "primaryLine"
  | "basic"
  | "danger"
  | "setting"
  | "warning";

export interface IButtonProps extends Omit<MantineButtonProps, 'variant' | 'styles'> {
  onClick?: () => void;
  size?: TButtonSize;
  variant?: TButtonVariant;
  isLoading?: boolean;
}
