import React from 'react';
import { cn } from '@/lib/utils';

interface CustomScrollbarProps {
  visible: boolean;
  thumbPosition: number;
  thumbHeight: number;
  onThumbMouseDown: (e: React.MouseEvent) => void;
  onTrackClick: (e: React.MouseEvent) => void;
  isDragging: boolean;
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  visible,
  thumbPosition,
  thumbHeight,
  onThumbMouseDown,
  onTrackClick,
  isDragging
}) => {
  if (!visible) return null;

  return (
    <div
      className="fixed right-3 w-2 z-50 pointer-events-none"
      style={{
        right: '12px', // Position within the 24px right padding
        top: '120px', // Start below fixed header
        bottom: '0px',
      }}
    >
      {/* Scrollbar track */}
      <div
        className="absolute top-6 bottom-6 w-2 bg-nav-hover bg-opacity-30 rounded-full cursor-pointer pointer-events-auto"
        onClick={onTrackClick}
      >
        {/* Scrollbar thumb */}
        <div
          className={cn(
            "absolute w-2 bg-text-secondary rounded-full transition-colors duration-150 cursor-pointer",
            isDragging ? "bg-text-primary" : "hover:bg-text-primary"
          )}
          style={{
            top: `${thumbPosition}px`,
            height: `${thumbHeight}px`,
          }}
          onMouseDown={onThumbMouseDown}
        />
      </div>
    </div>
  );
};
