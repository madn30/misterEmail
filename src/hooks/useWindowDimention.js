import { useState, useEffect } from 'react';

const deviceBreakpoints = {
  mobileMaxWidth: 600,
  tabletMaxWidth: 1024, 
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  const isMobile = width <= deviceBreakpoints.mobileMaxWidth ;
  const isTablet = width > deviceBreakpoints.mobileMaxWidth && width <= deviceBreakpoints.tabletMaxWidth;
  const isLaptop = width > deviceBreakpoints.tabletMaxWidth;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isLaptop,
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
