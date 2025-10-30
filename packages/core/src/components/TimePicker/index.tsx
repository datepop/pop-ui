'use client'

import { useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { TimeInput, TimeInputProps } from "@mantine/dates";
import { IconClock } from "@pop-ui/foundation";
import styles from "./styles.module.scss";

export interface TimePickerProps extends TimeInputProps {
  size?: "sm" | "md" | "lg";
}

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
          <IconClock size={iconSize} />
        </ActionIcon>
      }
    />
  );
};

export default TimePicker;
