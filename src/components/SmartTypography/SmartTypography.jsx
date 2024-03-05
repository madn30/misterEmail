import React, { useRef, useState, useEffect } from "react";

const SmartTypography = ({ children, className = "", style = {} }) => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (!container) return;

      const isOverflow =
        container.scrollWidth > container.clientWidth ||
        container.scrollHeight > container.clientHeight;
      setIsOverflowing(isOverflow);
    };

    checkOverflow();

    const handleResize = () => {
      checkOverflow();
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  return (
    <div
      className={`smart-typography ${className} ${isOverflowing ? "overflow" : ""}`}
      style={{ position: "relative", ...style }} 
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default SmartTypography;
