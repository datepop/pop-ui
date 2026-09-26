'use client';

import { Modal as MantineModal } from '@mantine/core';
import { ColorGray600, ColorGray900, IconX } from '@pop-ui/foundation';

import type { IModalProps } from './types';
import type { ModalStylesNames } from '@mantine/core';

// Mantine Modal은 compound 컴포넌트라 styles가 함수형 없이 슬롯별 객체만 받는다.
type TModalStylesRecord = NonNullable<IModalProps['styles']>;

const DEFAULT_STYLES: TModalStylesRecord = {
  content: {
    borderRadius: '12px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '150%',
    color: ColorGray900,
  },
  header: {
    padding: '16px',
  },
  body: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
};

// 슬롯별로 기본 스타일 위에 사용자 스타일을 얹는다(같은 속성은 사용자 값 우선).
const mergeStylesWithDefault = (custom: TModalStylesRecord = {}): TModalStylesRecord => {
  const merged: TModalStylesRecord = { ...DEFAULT_STYLES, ...custom };

  (Object.keys(DEFAULT_STYLES) as ModalStylesNames[]).forEach((slot) => {
    merged[slot] = { ...DEFAULT_STYLES[slot], ...custom[slot] };
  });

  return merged;
};

export const Modal = ({
  size = 'md',
  width,
  withCloseButton = false,
  styles,
  ...props
}: IModalProps) => {
  let sizeNumber = 768;
  if (size === 'xs') {
    sizeNumber = 360;
  } else if (size === 'sm') {
    sizeNumber = 544;
  } else if (size === 'lg') {
    sizeNumber = 1000;
  } else if (size === 'xl') {
    sizeNumber = 1200;
  }

  return (
    <MantineModal
      size={width || sizeNumber}
      styles={mergeStylesWithDefault(styles)}
      withCloseButton={withCloseButton}
      closeButtonProps={{
        icon: <IconX size={18} color={ColorGray600} />,
      }}
      {...props}
    />
  );
};
