import React from "react";
import cn from "../../../utils/cn";

const Input = ({
  name = "",
  type = "text",
  label = "",
  labelClassName = "",
  className = "",
  errClassName = "",
  error,
  errMsg = "",
  inputRef,
  ...rest
}) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className={cn("text-sm font-bold text-gray-900", labelClassName)}
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <div className="mt-2">
        <input
          ref={inputRef}
          {...rest}
          id={name}
          type={type}
          className={cn(
            "border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600",
            className
          )}
        />
      </div>
      {(error && (
        <p
          className={cs("mt-1 text-sm font-medium text-red-500", errClassName)}
        >
          {errMsg}
        </p>
      )) ||
        ""}
    </div>
  );
};

export default Input;
