'use client';

import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconCloseCircle } from '@pop-ui/foundation';
import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

import type { FileWithPath, DropzoneProps } from '@mantine/dropzone';
import type { ReactNode } from 'react';

export interface IImageUploaderProps extends DropzoneProps {
  width?: number;
  height?: number;
  defaultMsg?: ReactNode;
  file?: string | FileWithPath;
  showClearButton?: boolean;
  onClear?: () => void;
}

export const ImageUploader = ({
  width,
  height,
  defaultMsg = '이미지 업로드',
  file,
  onDrop,
  showClearButton,
  onClear,
  ...props
}: IImageUploaderProps) => {
  const [fileData, setFileData] = useState<string | FileWithPath | undefined>(file);

  const handleFileDataClear = useCallback(() => {
    setFileData(undefined);
    if (onClear) {
      onClear();
    }
  }, [onClear]);

  return (
    <div className={styles['ImageUploader__Wrapper']}>
      {showClearButton && fileData ? (
        <div className={styles['ImageUploader__FileClearButton']} onClick={handleFileDataClear}>
          <IconCloseCircle size={24} />
        </div>
      ) : null}
      <Dropzone
        {...props}
        maxFiles={1}
        className={styles['ImageUploader']}
        accept={IMAGE_MIME_TYPE}
        onDrop={(e) => {
          setFileData(e[0]);
          if (onDrop) {
            onDrop(e);
          }
        }}
        style={{
          width,
          height,
        }}
      >
        <>
          {fileData ? (
            <img
              className={styles['ImageUploader__Preview']}
              src={typeof fileData === 'string' ? fileData : URL.createObjectURL(fileData)}
              alt={`파일명: ${typeof fileData === 'string' ? fileData : fileData.name}`}
              title={`파일명: ${typeof fileData === 'string' ? fileData : fileData.name}`}
            />
          ) : (
            <div>
              <IconPhoto size={48} />
              <span>{defaultMsg}</span>
            </div>
          )}
        </>
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
