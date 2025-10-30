'use client'

import { Input, InputProps, Textarea, TextareaProps, Tooltip } from "@mantine/core";
import {
  IconInfoCircle,
  IconClose,
} from "@pop-ui/foundation";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";

interface CommonTextFieldProps {
  label?: string;
  labelPosition?: "top" | "left";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  description?: string;
  errorMsg?: string;
  maxTextCount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
  onClear?: () => void;
}

export type TextFieldProps = CommonTextFieldProps & (
  | ({ textarea?: false } & Omit<InputProps, keyof CommonTextFieldProps | 'vars'>)
  | ({ textarea: true; minRows?: number } & Omit<TextareaProps, keyof CommonTextFieldProps | 'vars'>)
);

export const TextField = (allProps: TextFieldProps) => {
  const {
    label,
    labelPosition = "top",
    size = "md",
    required,
    tooltip,
    tooltipPosition = "top",
    errorMsg,
    description,
    textarea = false,
    maxTextCount,
    onChange,
    onClear,
    ...otherProps
  } = allProps;

  const minRows = 'minRows' in allProps ? allProps.minRows : undefined;
  const [textCount, setTextCount] = useState<number>(0);

  let labelStyle = styles.md_label;
  let textfieldStyle = styles.md_textfield;
  let tooltipStyle = styles.md_tooltip;
  if (size === "sm") {
    labelStyle = styles.sm_label;
    textfieldStyle = styles.sm_textfield;
    tooltipStyle = styles.sm_tooltip;
  } else if (size === "lg") {
    labelStyle = styles.lg_label;
    textfieldStyle = styles.lg_textfield;
    tooltipStyle = styles.lg_tooltip;
  }

  const onChangeHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      if (maxTextCount) {
        if (event.currentTarget?.value?.length > maxTextCount) {
          return;
        }
        setTextCount(event.currentTarget?.value?.length);
        if (onChange) {
          onChange(event);
        }
      }
      if (onChange) {
        setTextCount(event.currentTarget?.value?.length);
        onChange(event);
      }
    },
    [maxTextCount, onChange],
  );

  return (
    <div
      className={
        labelPosition === "top"
          ? styles.top_label_textfield
          : styles.left_label_textfield
      }
    >
      <div>
        {label && (
          <Input.Label required={required} className={labelStyle}>
            {label}
          </Input.Label>
        )}
        {tooltip && (
          <Tooltip label={tooltip} position={tooltipPosition}>
            <div className={tooltipStyle}>
              <IconInfoCircle size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
            </div>
          </Tooltip>
        )}
      </div>
      <div>
        <div className={styles.textfield_wrapper}>
          {textarea ? (
            <Textarea
              className={styles.textarea}
              size={size}
              minRows={minRows}
              error={errorMsg}
              onChange={onChangeHandler}
              disabled={otherProps?.disabled}
              {...otherProps}
            />
          ) : (
            <Input
              className={textfieldStyle}
              error={errorMsg}
              onChange={onChangeHandler}
              rightSection={
                onClear && textCount > 0 ? (
                  <div className={styles.clear_button} onClick={onClear}>
                    <IconClose size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
                  </div>
                ) : undefined
              }
              {...otherProps}
            />
          )}
          {maxTextCount && maxTextCount > 0 && (
            <span
              className={styles.text_counter}
            >{`${textCount}/${maxTextCount}`}</span>
          )}
        </div>
        {description && (
          <Input.Description className={styles.input_description}>
            {description}
          </Input.Description>
        )}
        {errorMsg && (
          <Input.Error className={styles.input_error_msg}>
            {errorMsg}
          </Input.Error>
        )}
      </div>
    </div>
  );
};

export default TextField;
