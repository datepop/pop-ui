'use client'

import {
  Alert as MantineAlert,
  AlertProps as MatineAlertProps,
} from "@mantine/core";
import { IconCheckCircle, IconWarningCircle } from "@pop-ui/foundation";
import styles from "./styles.module.scss";

export interface AlertProps extends MatineAlertProps {
  visible: boolean;
  type?: "success" | "error";
  variant?: "fill" | "light";
  title?: string;
}

export const Alert = ({
  visible = false,
  type = "success",
  variant = "light",
  top = 48,
  right = 48,
  ...props
}: AlertProps) => {
  let typeStyle = styles.light_success;
  if (variant === "fill") {
    if (type === "success") {
      typeStyle = styles.fill_success;
    } else if (type === "error") {
      typeStyle = styles.fill_error;
    }
  } else {
    if (type === "success") {
      typeStyle = styles.light_success;
    } else if (type === "error") {
      typeStyle = styles.light_error;
    }
  }

  return visible ? (
    <MantineAlert
      className={typeStyle}
      icon={
        type === "success" ? (
          <IconCheckCircle size={20} />
        ) : (
          <IconWarningCircle size={20} />
        )
      }
      styles={{
        title: {
          marginBottom: !props?.children ? 0 : undefined,
        },
      }}
      pos="fixed"
      top={top}
      right={right}
      {...props}
    />
  ) : null;
};

export default Alert;
