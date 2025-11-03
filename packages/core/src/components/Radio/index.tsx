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
  let sizeStyle = styles["Radio--Medium"];
  if (size === "sm") {
    sizeStyle = styles["Radio--Small"];
  } else if (size === "lg") {
    sizeStyle = styles["Radio--Large"];
  }

  return <MantineRadio className={sizeStyle} size={size} {...props} />;
};

export default Radio;
