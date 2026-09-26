'use client';

import { Modal as MantineModal } from '@mantine/core';
import { ColorGray600, ColorGray900, IconX } from '@pop-ui/foundation';

import type { IModalProps } from './types';
import type { ModalStylesNames } from '@mantine/core';

// Mantine Modal은 compound 컴포넌트라 styles 타입은 슬롯별 객체만 허용한다.
type TModalStylesRecord = NonNullable<IModalProps['styles']>;

const getDefaultStyles = (fullScreen: boolean): TModalStylesRecord => ({
  // fullScreen이면 Mantine의 radius 0을 인라인 radius로 덮지 않는다.
  ...(fullScreen ? {} : { content: { borderRadius: '12px' } }),
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
    paddingInline: 0,
  },
});

// 슬롯별로 기본 스타일 위에 사용자 스타일을 얹는다(같은 속성은 사용자 값 우선).
const mergeStylesWithDefault = (
  custom: IModalProps['styles'],
  fullScreen: boolean,
): IModalProps['styles'] => {
  // 타입상 불가능하지만 JS 호출부가 함수형을 넘기면 버리지 않고 그대로 전달한다.
  if (typeof custom === 'function') {
    return custom;
  }

  const defaults = getDefaultStyles(fullScreen);
  const merged: TModalStylesRecord = { ...defaults, ...custom };

  (Object.keys(defaults) as ModalStylesNames[]).forEach((slot) => {
    merged[slot] = { ...defaults[slot], ...custom?.[slot] };
  });

  return merged;
};

export const Modal = ({
  size = 'md',
  width,
  withCloseButton = false,
  fullScreen = false,
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
      fullScreen={fullScreen}
      styles={mergeStylesWithDefault(styles, fullScreen)}
      withCloseButton={withCloseButton}
      closeButtonProps={{
        icon: <IconX size={18} color={ColorGray600} />,
      }}
      {...props}
    />
  );
};
