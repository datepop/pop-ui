'use client'

import "dayjs/locale/ko";
import {
  DatePickerInput,
  DateTimePicker,
} from "@mantine/dates";
import { IconCalendar } from "@pop-ui/foundation";

import styles from "./styles.module.scss";

import type {
  DatePickerInputProps} from "@mantine/dates";

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
  let sizeStyle = styles["DatePicker--Medium"];
  let iconSize = 18;
  if (size === "sm") {
    sizeStyle = styles["DatePicker--Small"];
    iconSize = 14;
  } else if (size === "lg") {
    sizeStyle = styles["DatePicker--Large"];
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
