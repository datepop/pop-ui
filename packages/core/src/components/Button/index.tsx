import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import styles from "./styles.module.scss";

export interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
}

export const Button = ({
  children,
  ...props
}: ButtonProps) => {
  return (
    <MantineButton
      type="button"
      className={styles.PopButton}
      {...props}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
