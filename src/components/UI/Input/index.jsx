import cn from "../../../utils/cn";

const Input = ({
  label = "",
  labelClassName = "",
  className = "",
  ...rest
}) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={rest.name}
          className={cn("text-sm font-bold text-gray-900", labelClassName)}
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <div className="mt-2">
        <input
          {...rest}
          id={rest.name}
          className={cn(
            "border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600",
            className
          )}
        />
      </div>
    </div>
  );
};

export default Input;
