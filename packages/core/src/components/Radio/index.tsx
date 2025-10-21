'use client'

import {
  Radio as MantineRadio,
  RadioProps as MantineRadioProps,
} from "@mantine/core";
import styles from "./styles.module.scss";

export interface RadioProps extends MantineRadioProps {
  size?: "sm" | "md" | "lg";
}

export const Radio = ({ size = "md", ...props }: RadioProps) => {
  let sizeStyle = styles.md_radio;
  if (size === "sm") {
    sizeStyle = styles.sm_radio;
  } else if (size === "lg") {
    sizeStyle = styles.lg_radio;
  }

  return <MantineRadio className={sizeStyle} size={size} {...props} />;
};

export default Radio;
