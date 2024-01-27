import React from "react";
import cn from "../../../utils/cn";
import Loader from "../../Loader";

const Button = ({
  className = "",
  children,
  type = "button",
  title = "",
  loading = false,
  ...props
}) => {
  const commonClasses =
    "inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";
    
  return (
    <button
      title={title}
      type={type}
      className={cn(commonClasses, className, {
        // "bg-gray-500": loading,
        // "bg-gray-600": !loading,
      })}
      {...props}
    >
      <span className="flex justify-center items-center">{children}</span> {` `}{" "}
      {(loading && (
        <span className="ml-2">
          <Loader />
        </span>
      )) ||
        ""}
    </button>
  );
};

export default Button;
