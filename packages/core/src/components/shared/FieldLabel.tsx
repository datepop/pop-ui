'use client';

import { Input, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@pop-ui/foundation';

import styles from './FieldLabel.module.scss';

import type { TControlSize } from './controlSize';
import type { IFieldLabelProps } from './field';

const iconSize = { sm: 14, md: 16, lg: 20 } satisfies Record<TControlSize, number>;

export function FieldLabel({
  htmlFor,
  label,
  required,
  size,
  tooltip,
  tooltipPosition = 'top',
}: IFieldLabelProps & { htmlFor: string; required?: boolean; size: TControlSize }) {
  if (!label && !tooltip) return null;
  return (
    <div className={styles.FieldLabel} data-size={size}>
      {label && (
        <Input.Label htmlFor={htmlFor} required={required} className={styles.FieldLabel__Label}>
          {label}
        </Input.Label>
      )}
      {tooltip && (
        <Tooltip
          label={tooltip}
          position={tooltipPosition}
          events={{ hover: true, focus: true, touch: true }}
        >
          <button
            type="button"
            className={styles.FieldLabel__Help}
            aria-label={label ? `${label} 도움말` : '입력 도움말'}
          >
            <IconInfoCircle size={iconSize[size]} />
          </button>
        </Tooltip>
      )}
    </div>
  );
}
