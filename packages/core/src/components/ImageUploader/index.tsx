import { ReactNode, useCallback, useState } from "react";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  FileWithPath,
  DropzoneProps,
} from "@mantine/dropzone";
import styles from "./styles.module.scss";
import ic_image_colored from "../../assets/icons/ic_image_colored.svg";
import ic_cancel_circle from "../../assets/icons/ic_cancel_circle.svg";

export interface ImageUploaderProps extends DropzoneProps {
  width?: number;
  height?: number;
  defaultMsg?: ReactNode;
  file?: string | FileWithPath;
  showClearButton?: boolean;
  onClear?: () => void;
}

/**
 * ----- image uploader props -----
 ** width: number
 ** height: number
 ** defaultMsg: ReactNode, placeholder 대체
 ** file: string | FileWithPath
 ** showClearButton: boolean, 업로드 파일 clear 버튼 노출 여부
 ** onClear: () => void, 업로드 파일 clear시 실행될 함수
 ** 기타 props는 mantine dropzone props 사용: https://v6.mantine.dev/others/dropzone/?t=props
 */
export const ImageUploader = ({
  width,
  height,
  defaultMsg = "이미지 업로드",
  file,
  onDrop,
  showClearButton,
  onClear,
  ...props
}: ImageUploaderProps) => {
  const [fileData, setFileData] = useState<string | FileWithPath | undefined>(
    file,
  );

  const handleFileDataClear = useCallback(() => {
    setFileData(undefined);
    if (onClear) {
      onClear();
    }
  }, [onClear]);

  return (
    <div className={styles.image_uploader_wrapper}>
      {showClearButton && fileData ? (
        <div className={styles.file_clear_button} onClick={handleFileDataClear}>
          <img src={ic_cancel_circle} alt="clear_file_data" />
        </div>
      ) : null}
      <Dropzone
        {...props}
        maxFiles={1}
        className={styles.image_uploader}
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
              className={styles.preview}
              src={
                typeof fileData === "string"
                  ? fileData
                  : URL.createObjectURL(fileData)
              }
              alt={`파일명: ${
                typeof fileData === "string" ? fileData : fileData.name
              }`}
              title={`파일명: ${
                typeof fileData === "string" ? fileData : fileData.name
              }`}
            />
          ) : (
            <div>
              <img src={ic_image_colored} alt="ic_image_colored" />
              <span>{defaultMsg}</span>
            </div>
          )}
        </>
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
