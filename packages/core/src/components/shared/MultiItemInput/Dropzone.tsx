'use client';

import { Dropzone as MantineDropzone } from '@mantine/dropzone';

import styles from './styles.module.scss';

import type { ReactNode } from 'react';

// Accept type mirrors Mantine Dropzone's accept prop
type TAccept = Record<string, string[]> | string[];

interface IPlaceholderDropzoneProps {
  width: number;
  height: number;
  isError: boolean;
  isLoading?: boolean;
  accept: TAccept;
  multiple: boolean;
  onDrop: (files: File[]) => void;
  children?: ReactNode;
}

export function PlaceholderDropzone({
  width,
  height,
  isError,
  isLoading,
  accept,
  multiple,
  onDrop,
  children,
}: IPlaceholderDropzoneProps) {
  return (
    <div className={styles.DropzoneOuter}>
      <MantineDropzone
        onDrop={onDrop}
        accept={accept}
        multiple={multiple}
        disabled={isLoading}
        className={isError ? styles.PlaceholderError : styles.Placeholder}
        style={{ width, height }}
      >
        {children}
      </MantineDropzone>
    </div>
  );
}
