import React from "react";
import { FaRegStar as EmptyStarIcon, FaStar as FullStarIcon } from "react-icons/fa";

 function Star({ isStarring }) {
  return isStarring ? <FullStarIcon color="#ffd250" /> : <EmptyStarIcon /> ;
}

export default React.memo(Star)