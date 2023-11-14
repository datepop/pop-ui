import { Input, Select, SelectProps, Tooltip } from "@mantine/core";
import ic_tooltip from "../../assets/icons/ic_tooltip.svg";
import ic_chevron_up from "../../assets/icons/ic_chevron_up.svg";
import ic_chevron_down from "../../assets/icons/ic_chevron_down.svg";
import styles from "./styles.module.scss";
import { useState } from "react";

export interface SearchBarProps extends SelectProps {
  label?: string;
  labelPosition?: "top" | "left";
  size?: "sm" | "md" | "lg";
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  description?: string;
  errorMsg?: string;
}

export const Dropdown = ({
  label,
  labelPosition = "top",
  size = "md",
  required,
  tooltip,
  tooltipPosition = "top",
  errorMsg,
  description,
  ...props
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let labelStyle = styles.md_label;
  let selectStyle = styles.md_textfield;
  let tooltipStyle = styles.md_tooltip;
  let chevronSize = 18;
  if (size === "sm") {
    labelStyle = styles.sm_label;
    selectStyle = styles.sm_textfield;
    tooltipStyle = styles.sm_tooltip;
    chevronSize = 14;
  } else if (size === "lg") {
    labelStyle = styles.lg_label;
    selectStyle = styles.lg_textfield;
    tooltipStyle = styles.lg_tooltip;
    chevronSize = 24;
  }

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
        <Select
          {...props}
          size={size}
          error={errorMsg}
          className={selectStyle}
          rightSection={
            isOpen ? (
              <img width={chevronSize} src={ic_chevron_up} />
            ) : (
              <img width={chevronSize} src={ic_chevron_down} />
            )
          }
          onDropdownOpen={() => setIsOpen(true)}
          onDropdownClose={() => setIsOpen(false)}
          styles={() => ({
            item: {
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor: "#e7e7e7",
                  color: "#000000",
                },
              },
            },
          })}
        />
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

export default Dropdown;
