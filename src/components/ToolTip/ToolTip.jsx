import React, { useRef, useState, useEffect } from 'react';

const ToolTip = ({
  children,
  className = '',
  position = 'bottom',
  content = 'Default hehre',
}) => {
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipVisibility, setTooltipVisibility] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});

  useEffect(() => {
    const updateTooltipPosition = () => {
      if (!targetRef.current || !tooltipRef.current || !tooltipVisibility) return;

      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const offset = 4;

      let newStyle = { opacity: 1, position: 'fixed', visibility: 'visible' };

      let leftPosition = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      leftPosition = Math.max(offset, Math.min(leftPosition, viewportWidth - tooltipRect.width - offset));
      newStyle.left = `${leftPosition}px`;

      switch (position) {
        case 'bottom':
          newStyle.top = `${targetRect.bottom + window.scrollY + offset}px`;
          break;
        case 'top':
          newStyle.top = `${targetRect.top + window.scrollY - tooltipRect.height - offset}px`;
          break;
        case 'left':
          newStyle.left = `${targetRect.left + window.scrollX - tooltipRect.width - offset}px`;
          newStyle.top = `${targetRect.top + window.scrollY + (targetRect.height / 2) - (tooltipRect.height / 2)}px`;
          break;
        case 'right':
          newStyle.left = `${targetRect.right + window.scrollX + offset}px`;
          newStyle.top = `${targetRect.top + window.scrollY + (targetRect.height / 2) - (tooltipRect.height / 2)}px`;
          break;
        default:
          newStyle.top = `${targetRect.bottom + window.scrollY + offset}px`;
          break;
      }

      setTooltipStyle(newStyle);
    };

    if (tooltipVisibility) {
      updateTooltipPosition();
    }

  }, [position, content, tooltipVisibility]);

  return (
    <div
      className={`tooltip-container ${className} ${isHovered ? 'show-tooltip' : ''}`}
      ref={targetRef}
      onMouseEnter={() => {
        setIsHovered(true);
        setTooltipVisibility(true); 
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setTooltipVisibility(false); 
      }}
    >
      {children}
      {isHovered && (
        <div className="tooltip-content" ref={tooltipRef} style={tooltipStyle}>
          {content}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
