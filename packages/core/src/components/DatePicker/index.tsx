'use client'

import "dayjs/locale/ko";
import {
  DatePickerInput,
  DatePickerInputProps,
  DateTimePicker,
} from "@mantine/dates";
import { IconCalendar } from "@pop-ui/foundation";
import styles from "./styles.module.scss";

export interface DatePickerProps extends DatePickerInputProps {
  size?: "sm" | "md" | "lg";
  type?: "default" | "multiple" | "range";
  withTime?: boolean;
}

export const DatePicker = ({
  size = "md",
  type = "default",
  withTime,
  ...props
}: DatePickerProps) => {
  let sizeStyle = styles.md_textfield;
  let iconSize = 18;
  if (size === "sm") {
    sizeStyle = styles.sm_textfield;
    iconSize = 14;
  } else if (size === "lg") {
    sizeStyle = styles.lg_textfield;
    iconSize = 24;
  }

  if (withTime) {
    return (
      <DateTimePicker
        className={sizeStyle}
        size={size}
        locale="ko"
        firstDayOfWeek={0}
        monthLabelFormat={"YYYY년 MM월"}
        valueFormat="YYYY-MM-DD | a hh:mm"
        rightSection={<IconCalendar size={iconSize} />}
        {...props}
      />
    );
  }

  return (
    <DatePickerInput
      className={sizeStyle}
      type={type}
      size={size}
      locale="ko"
      firstDayOfWeek={0}
      monthLabelFormat={"YYYY년 MM월"}
      valueFormat="YYYY-MM-DD"
      rightSection={<IconCalendar size={iconSize} />}
      {...props}
    />
  );
};

export default DatePicker;
