import {
  Flex as MantineFlex,
  FlexProps as MantineFlexProps,
} from "@mantine/core";
import styles from "./styles.module.scss";

export interface FlexProps extends MantineFlexProps {}

export const Flex = ({ children, ...props }: FlexProps) => {
  return (
    <MantineFlex className={styles.PopFlex} {...props}>
      {children}
    </MantineFlex>
  );
};

export default Flex;
