import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from "@mantine/core";
import styles from "./styles.module.scss";

export interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  styleType?: "primary" | "primaryline" | "basic" | "danger" | "setting";
}

/**
 * ----- button props -----
 ** size: 'sm' | 'md' | 'lg'
 ** styleType: 'primary' | 'primaryline' | 'basic' | 'danger' | 'setting'
 ** 기타 props는 mantine button props 사용: https://v6.mantine.dev/core/button/?t=props
 */
export const Button = ({
  children,
  size = "md",
  styleType = "primary",
  ...props
}: ButtonProps) => {
  let sizeStyle = styles.md_button;
  if (size === "sm") {
    sizeStyle = styles.sm_button;
  } else if (size === "lg") {
    sizeStyle = styles.lg_button;
  }

  let buttonStyle = styles.primary;
  if (styleType === "basic") {
    buttonStyle = styles.basic;
  } else if (styleType === "primaryline") {
    buttonStyle = styles.primaryline;
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
};

export default Button;
