'use client';

import { Group, Stack } from '@mantine/core';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

import { Button } from '../Button';
import { Modal } from '../Modal';

import type { ImageInputItem } from './types';
import type { Area, Point } from 'react-easy-crop';

// ─── Canvas crop utility ──────────────────────────────────────────────────────

async function getCroppedImage(item: ImageInputItem, pixelCrop: Area): Promise<File | null> {
  const src = item.url ?? '';
  if (!src) return null;

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  const originalName = item.file?.name ?? item.url?.split('/').pop() ?? 'image';

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(new File([blob], `cropped_${originalName}`, { type: 'image/jpeg' }));
      } else {
        reject(new Error('Failed to create blob'));
      }
    }, 'image/jpeg');
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

interface IImageInputCropModalProps {
  item: ImageInputItem | null;
  isOpen: boolean;
  aspect?: number;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

export function ImageInputCropModal({
  item,
  isOpen,
  aspect = 1,
  onClose,
  onSubmit,
}: IImageInputCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!croppedAreaPixels || !item) return;
    setIsLoading(true);
    try {
      const file = await getCroppedImage(item, croppedAreaPixels);
      if (file) onSubmit(file);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      key={item?.id}
      opened={isOpen && !!item}
      onClose={onClose}
      size="md"
      title="이미지 수정"
      withCloseButton
    >
      <Stack>
        <div style={{ position: 'relative', height: 320, background: '#fff' }}>
          <Cropper
            image={item?.url ?? ''}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            minZoom={0.5}
            maxZoom={10}
            objectFit="cover"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
            style={{ containerStyle: { backgroundColor: '#ffffff' } }}
          />
        </div>
        <Group justify="flex-end" style={{ padding: '0 16px' }}>
          <Button variant="basic" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" isLoading={isLoading} onClick={handleSubmit}>
            적용하기
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
