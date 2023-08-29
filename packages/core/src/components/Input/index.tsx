import {
  Input as MantineInput,
  InputProps as MantineInputProps,
} from "@mantine/core";
import styles from "./styles.module.scss";

export interface InputProps extends MantineInputProps {}

export const Input = ({ ...props }: InputProps) => {
  return <MantineInput className={styles.PopInput} {...props} />;
};

export default Input;
