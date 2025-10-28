'use client'

import { Autocomplete, AutocompleteProps, Input, Tooltip } from "@mantine/core";
import ic_tooltip from "../../assets/icons/ic_tooltip.svg";
import ic_input_clear from "../../assets/icons/ic_input_clear.svg";
import ic_search from "../../assets/icons/ic_search.svg";
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
            <img className={tooltipStyle} src={ic_tooltip} alt="tooltip_icon" />
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
            leftSection={<img src={ic_search} />}
            rightSection={
              onClear && textCount > 0 ? (
                <div className={styles.clear_button} onClick={onClear}>
                  <img src={ic_input_clear} />
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
