import {
  Checkbox as MantineCheckbox,
  CheckboxProps as MantineCheckboxProps,
} from "@mantine/core";
import styles from "./styles.module.scss";

export interface CheckboxProps extends MantineCheckboxProps {}

export const Checkbox = ({ ...props }: CheckboxProps) => {
  return <MantineCheckbox className={styles.PopCheckbox} {...props} />;
};

export default Checkbox;
