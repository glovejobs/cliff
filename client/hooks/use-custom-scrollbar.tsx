import { useEffect, useRef, useState } from 'react';

export const useCustomScrollbar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartScrollTop, setDragStartScrollTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      const maxThumbPosition = clientHeight - thumbHeight;
      
      setThumbPosition(scrollRatio * maxThumbPosition);
      setScrollbarVisible(scrollHeight > clientHeight);
      
      // Calculate thumb height as a percentage of visible area
      const thumbHeightRatio = clientHeight / scrollHeight;
      setThumbHeight(Math.max(30, clientHeight * thumbHeightRatio));
    };

    const handleScroll = () => {
      if (!isDragging) {
        updateScrollbar();
      }
    };

    const handleResize = () => {
      updateScrollbar();
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    updateScrollbar();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDragging, thumbHeight]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartScrollTop(containerRef.current?.scrollTop || 0);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const deltaY = e.clientY - dragStartY;
      const container = containerRef.current;
      const { scrollHeight, clientHeight } = container;
      const maxScrollTop = scrollHeight - clientHeight;
      const maxThumbPosition = clientHeight - thumbHeight;
      
      // Convert mouse movement to scroll position
      const scrollRatio = deltaY / maxThumbPosition;
      const newScrollTop = dragStartScrollTop + (scrollRatio * maxScrollTop);
      
      container.scrollTop = Math.max(0, Math.min(maxScrollTop, newScrollTop));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartY, dragStartScrollTop, thumbHeight]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const container = containerRef.current;
    const { scrollHeight, clientHeight } = container;
    const maxScrollTop = scrollHeight - clientHeight;
    
    // Calculate target scroll position
    const scrollRatio = (clickY - thumbHeight / 2) / (clientHeight - thumbHeight);
    const targetScrollTop = Math.max(0, Math.min(maxScrollTop, scrollRatio * maxScrollTop));
    
    container.scrollTop = targetScrollTop;
  };

  return {
    containerRef,
    scrollbarVisible,
    thumbPosition,
    thumbHeight,
    handleThumbMouseDown,
    handleTrackClick,
    isDragging
  };
};
