import React from "react";
import cn from "../utils/cn";

export default function UpAngleIcon({ className, ...props }) {
  return (
    <svg
      className={cn(
        "w-4 h-6 ml-auto text-gray-400 group-hover:text-white",
        className
      )}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="5" r="2" />
      <path d="M12 5v6a2 2 0 0 0 2 2h5.2a10 10 0 0 1-2.32 6.22" />
      <line x1="12" y1="17" x2="12" y2="17" />

      <path d="M20.94 6.94l-2.33-2.33a10 10 0 0 0-6.22 2.32" />
      <line x1="2" y1="2" x2="6" y2="6" />
    </svg>
  );
}
