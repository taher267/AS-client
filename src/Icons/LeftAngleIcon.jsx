import React from "react";
import cn from "../utils/cn";

const LeftAngleIcon = ({ className, style = {} }) => {
  return (
    <svg
      style={style}
      className={cn("flex-shrink-0 w-4 h-4", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

export default LeftAngleIcon;
