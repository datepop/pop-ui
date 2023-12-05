import { useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { TimeInput, TimeInputProps } from "@mantine/dates";
import ic_clock from "../../assets/icons/ic_clock.svg";
import styles from "./styles.module.scss";

export interface TimePickerProps extends TimeInputProps {
  size?: "sm" | "md" | "lg";
}

/**
 * ----- time picker props -----
 ** size: 'sm' | 'md' | 'lg'
 ** 기타 props는 mantine time input props 사용: https://v6.mantine.dev/dates/time-input/?t=props
 */
export const TimePicker = ({ size = "md", ...props }: TimePickerProps) => {
  const timeInputRef = useRef<HTMLInputElement>(null);

  let sizeStyle = styles.md_textfield;
  let iconSize = 18;
  if (size === "sm") {
    sizeStyle = styles.sm_textfield;
    iconSize = 14;
  } else if (size === "lg") {
    sizeStyle = styles.lg_textfield;
    iconSize = 24;
  }

  return (
    <TimeInput
      ref={timeInputRef}
      className={sizeStyle}
      size={size}
      {...props}
      rightSection={
        <ActionIcon
          onClick={() => {
            if (timeInputRef) {
              timeInputRef?.current?.showPicker();
            }
          }}
        >
          <img width={iconSize} src={ic_clock} alt="clock_icon" />
        </ActionIcon>
      }
    />
  );
};

export default TimePicker;
