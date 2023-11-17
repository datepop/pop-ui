import { ReactNode, useState } from "react";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  FileWithPath,
  DropzoneProps,
} from "@mantine/dropzone";
import styles from "./styles.module.scss";
import ic_image_colored from "../../assets/icons/ic_image_colored.svg";

export interface ImageUploaderProps extends DropzoneProps {
  width?: number;
  height?: number;
  defaultMsg?: ReactNode;
  file?: string | FileWithPath;
}

export const ImageUploader = ({
  width,
  height,
  defaultMsg = "이미지 업로드",
  file,
  onDrop,
  ...props
}: ImageUploaderProps) => {
  const [fileData, setFileData] = useState<string | FileWithPath | undefined>(
    file,
  );

  return (
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
    </Dropzone>
  );
};

export default ImageUploader;
