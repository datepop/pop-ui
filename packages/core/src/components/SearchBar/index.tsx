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

/**
 * ----- search bar props -----
 ** label?: string, 라벨
 ** labelPosition?: "top" | "left", 라벨 위치
 ** size?: "sm" | "md" | "lg"
 ** tooltip?: string, 툴팁
 ** tooltipPosition?: "top" | "bottom" | "left" | "right", 툴팁 위치
 ** description?: string, 상세 텍스트
 ** errorMsg?: string, 에러 메시지
 ** onChange?: (event: any) => void
 ** onClear?: () => void, clear button 노출시 필요
 ** 기타 props는 mantine autocomplete props 사용: https://v6.mantine.dev/core/autocomplete/?t=props
 */
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
            icon={<img src={ic_search} />}
            iconWidth={48}
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
