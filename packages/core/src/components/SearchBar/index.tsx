'use client'

import { Autocomplete, AutocompleteProps, Input, Tooltip } from "@mantine/core";
import {
  IconInfoCircle,
  IconClose,
  IconSearch,
} from "@pop-ui/foundation";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";

export interface SearchBarProps extends AutocompleteProps {
  label?: string;
  labelPosition?: "top" | "left";
  size?: "sm" | "md" | "lg";
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  description?: string;
  errorMsg?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
  onClear?: () => void;
}

export const SearchBar = ({
  label,
  labelPosition = "top",
  size = "md",
  required,
  tooltip,
  tooltipPosition = "top",
  errorMsg,
  description,
  onChange,
  onClear,
  ...props
}: SearchBarProps) => {
  const [textCount, setTextCount] = useState<number>(0);

  let labelStyle = styles.md_label;
  let searchBarStyle = styles.md_textfield;
  let tooltipStyle = styles.md_tooltip;
  if (size === "sm") {
    labelStyle = styles.sm_label;
    searchBarStyle = styles.sm_textfield;
    tooltipStyle = styles.sm_tooltip;
  } else if (size === "lg") {
    labelStyle = styles.lg_label;
    searchBarStyle = styles.lg_textfield;
    tooltipStyle = styles.lg_tooltip;
  }

  const onChangeHandler = useCallback(
    (value: string) => {
      if (onChange) {
        setTextCount(value?.length);
        onChange(value);
      }
    },
    [onChange],
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
          <Autocomplete
            {...props}
            size={size}
            error={errorMsg}
            className={searchBarStyle}
            onChange={onChangeHandler}
            leftSection={<IconSearch size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />}
            rightSection={
              onClear && textCount > 0 ? (
                <div className={styles.clear_button} onClick={onClear}>
                  <IconClose size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
                </div>
              ) : undefined
            }
          />
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

export default SearchBar;
