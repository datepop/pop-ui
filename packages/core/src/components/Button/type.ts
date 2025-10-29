import type { ButtonProps as MantineButtonProps } from "@mantine/core";

export type TButtonSize = "sm" | "md" | "lg";
export type TButtonVariant =
  | "primary"
  | "primaryLine"
  | "basic"
  | "danger"
  | "setting"
  | "warning";

export interface IButtonProps extends MantineButtonProps {
  onClick?: () => void;
  size?: TButtonSize;
  styleType?: TButtonVariant;
  isLoading?: boolean;
}
