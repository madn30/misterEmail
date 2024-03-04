import React from "react";
import {
  FaRegStar as EmptyStarIcon,
  FaStar as FullStarIcon,
} from "react-icons/fa";

function Star({ isStarring, className }) {
  return (
    <div className={`flex align-center  ${className}`}>
      {isStarring ? <FullStarIcon color="#ffd250" /> : <EmptyStarIcon />}
    </div>
  );
}

export default React.memo(Star);
