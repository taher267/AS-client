import { clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import cn from "../../../utils/cn";

const Button = ({
  className = "",
  children,
  type = "button",
  title = "",
  ...props
}) => {
  const [loading, setLoading] = React.useState(false);
  const commonClasses =
    "inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500";

  return (
    <div>
      <button
        title={title}
        type={type}
        className={cn(commonClasses, className, {
          // "bg-gray-500": loading,
          // "bg-gray-600": !loading,
        })}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
