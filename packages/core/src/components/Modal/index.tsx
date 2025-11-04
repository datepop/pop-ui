'use client'

import {
  Modal as MantineModal
} from "@mantine/core";

import type {
  ModalProps as MantineModalProps} from "@mantine/core";

export interface ModalProps extends MantineModalProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  width?: number;
}

export const Modal = ({
  size = "md",
  width,
  withCloseButton = false,
  ...props
}: ModalProps) => {
  let sizeNumber = 768;
  if (size === "xs") {
    sizeNumber = 360;
  } else if (size === "sm") {
    sizeNumber = 544;
  } else if (size === "lg") {
    sizeNumber = 1000;
  } else if (size === "xl") {
    sizeNumber = 1200;
  }

  return (
    <MantineModal
      size={width || sizeNumber}
      withCloseButton={withCloseButton}
      {...props}
    />
  );
};

export default Modal;
