import {
  Alert as MantineAlert,
  AlertProps as MatineAlertProps,
} from "@mantine/core";
import ic_success from "../../assets/icons/ic_success.svg";
import ic_error from "../../assets/icons/ic_error.svg";
import styles from "./styles.module.scss";

export interface AlertProps extends MatineAlertProps {
  visible: boolean;
  type?: "success" | "error";
  variant?: "fill" | "light";
  title?: string;
}
/**
 * ----- alert props -----
 ** visible: 노출 여부
 ** type: 'success' | 'error'
 ** variant: 'fill' | 'light'
 ** title: alert 타이틀
 ** 기타 props는 mantine alert props 사용: https://v6.mantine.dev/core/alert/?t=props
 */
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
        <img
          src={type === "success" ? ic_success : ic_error}
          alt="alert_icon"
        />
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
