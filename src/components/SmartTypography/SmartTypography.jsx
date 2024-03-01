import React, { useRef, useState, useEffect } from 'react';

const SmartTypography = ({ children, className = '', style = {}, isAbsolute = false }) => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState('bottom');

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (!container) return;

      // Update for any React component or text content
      const isOverflow = container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight;
      setIsOverflowing(isOverflow);
    };

    const updateTooltipPosition = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      let newPosition = 'bottom';
      if (window.innerHeight - rect.bottom < 50) newPosition = 'top';
      if (rect.top < 50) newPosition = rect.left > window.innerWidth / 2 ? 'left' : 'right';

      setTooltipPosition(newPosition);
    };

    checkOverflow();
    updateTooltipPosition();

    // Re-check on window resize
    const handleResize = () => {
      checkOverflow();
      updateTooltipPosition();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [children]);

  return (
    <div
      className={`smart-typography ${className} ${isOverflowing ? 'overflow' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{ position: isAbsolute ? 'absolute' : 'relative', ...style }}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isOverflowing && isHovered && (
        <div className={`smart-typography-tooltip ${tooltipPosition}`}>
          Tooltip Content
        </div>
      )}
    </div>
  );
};

export default SmartTypography;
