import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useCustomScrollbar } from '@/hooks/use-custom-scrollbar';
import { CustomScrollbar } from './custom-scrollbar';

interface ScrollableContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  className,
  style
}) => {
  const {
    containerRef,
    scrollbarVisible,
    thumbPosition,
    thumbHeight,
    handleThumbMouseDown,
    handleTrackClick,
    isDragging
  } = useCustomScrollbar();

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          // Hide default scrollbar
          "scrollbar-none overflow-y-auto",
          className
        )}
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
          ...style
        }}
      >
        {children}
      </div>
      
      <CustomScrollbar
        visible={scrollbarVisible}
        thumbPosition={thumbPosition}
        thumbHeight={thumbHeight}
        onThumbMouseDown={handleThumbMouseDown}
        onTrackClick={handleTrackClick}
        isDragging={isDragging}
      />
    </>
  );
};
