interface IDropIndicatorProps {
  position: { top: number; left: number; width: number } | null;
}

export const DropIndicator = ({ position }: IDropIndicatorProps) => {
  if (!position) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        height: '2px',
        backgroundColor: '#0FD3D8',
        pointerEvents: 'none',
        zIndex: 10,
        transform: 'translateY(-1px)',
      }}
    />
  );
};
