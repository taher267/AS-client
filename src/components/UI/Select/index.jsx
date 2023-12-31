import React from "react";
import cn from "../../../utils/cn";

const Select = ({
  options = [],
  label = "",
  icon,
  error,
  errMsg,
  inputRef,
  className,
  errClassName,
  defaultValue,
  selector = {},
  ...rest
}) => {
  const [isObject, setIsObject] = React.useState(false);
  if (isObject) {
    return (
      <div className="text-red-600">
        Please provide selector(label and value)
      </div>
    );
  }
  return (
    <div className="w-full">
      {(label && (
        <label htmlFor="" className="block text-sm font-bold text-gray-900">
          {label}
        </label>
      )) ||
        ""}
      <div className="relative mt-3">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {icon}
          </div>
        )}
        <select
          {...rest}
          // defaultValue={defaultValue}
          className={cn(
            "block w-full py-3 pr-10 border-gray-300 border rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm mt-2",
            className,
            {
              "pl-2": !icon,
              "pl-12": icon,
              "border-red-500": error,
              "placeholder-red-500": error,
              "focus:border-red-600": error,
              "focus:ring-red-600": error,
            }
          )}
          ref={inputRef}
        >
          <option value="">Select an option</option>
          {(!isObject &&
            options?.map((item, i) => {
              if (
                typeof item === "object" &&
                (!selector?.label || !selector.value)
              ) {
                setIsObject(true);
                return;
              }
              return (
                <option
                  key={i}
                  value={item?.[selector?.value] || item}
                  className="capitalize"
                >
                  {item?.[selector?.label] || item}
                </option>
              );
            })) ||
            ""}
        </select>
      </div>
      {(error && (
        <p
          className={cn("mt-1 text-sm font-medium text-red-500", errClassName)}
        >
          {errMsg}
        </p>
      )) ||
        ""}
    </div>
  );
};

export default Select;

{
  /* <div className="mt-2 sm:mt-0 sm:col-span-2">
<select className="block w-full py-3 pl-4 pr-10 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
  <option>United States</option>
</select>
</div> */
}
