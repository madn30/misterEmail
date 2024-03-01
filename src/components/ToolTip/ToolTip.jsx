import React, { useRef, useState, useEffect } from 'react';

const ToolTip = ({ children, className = '', style = {}, isAbsolute = false }) => {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const updateTooltipPosition = () => {
    if (!targetRef.current) return;
    const targetRect = targetRef.current.getBoundingClientRect();

    let newStyle = { visibility: 'hidden', opacity: 0, position: 'fixed' };

    const availableSpace = {
      bottom: window.innerHeight - targetRect.bottom,
      top: targetRect.top,
      left: targetRect.left,
      right: window.innerWidth - targetRect.right
    };

    if (availableSpace.bottom > 50) { 
      newStyle.top = `${targetRect.bottom + window.scrollY + 10}px`; 
      newStyle.left = `${targetRect.left + window.scrollX}px`; 
    } else if (availableSpace.top > 50) {
      newStyle.bottom = `${window.innerHeight - targetRect.top + window.scrollY + 10}px`; 
      newStyle.left = `${targetRect.left + window.scrollX}px`; 
    } else {
      newStyle.top = `${targetRect.bottom + window.scrollY + 10}px`; 
      newStyle.left = availableSpace.left > availableSpace.right ? `${targetRect.right + window.scrollX}px` : `${targetRect.left + window.scrollX - 100}px`; 
    }

    setTooltipStyle({ ...newStyle, visibility: 'visible', opacity: 1 });
  };

  useEffect(() => {
    window.addEventListener('resize', updateTooltipPosition);
    return () => {
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, []);

  return (
    <div
      className={`tooltip-container ${className} ${isHovered ? 'show-tooltip' : ''}`}
      style={{ position: isAbsolute ? 'absolute' : 'relative', ...style }}
      ref={targetRef}
      onMouseEnter={() => {
        setIsHovered(true);
        updateTooltipPosition();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className="tooltip-content" style={tooltipStyle}>
          Tooltip Content
        </div>
      )}
    </div>
  );
};

export default ToolTip;
