import "dayjs/locale/ko";
import {
  DatePickerInput,
  DatePickerInputProps,
  DateTimePicker,
} from "@mantine/dates";
import ic_calendar from "../../assets/icons/ic_calendar.svg";
import styles from "./styles.module.scss";

export interface DatePickerProps extends DatePickerInputProps {
  size?: "sm" | "md" | "lg";
  type?: "default" | "multiple" | "range";
  withTime?: boolean;
}

/**
 * ----- datepicker props -----
 ** size: 'sm' | 'md' | 'lg'
 ** type:  'default' | 'multiple' | 'range'
 ** withTime: 시간 포함 여부
 ** 기타 props는 mantine datepicker props 사용: https://v6.mantine.dev/dates/date-picker-input/?t=props
 */
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
        rightSection={<img width={iconSize} src={ic_calendar} />}
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
      rightSection={<img width={iconSize} src={ic_calendar} />}
      {...props}
    />
  );
};

export default DatePicker;
