import React, { useState } from "react";
import cn from "../../../utils/cn";

const MultiInputList = ({
  onChange,
  // setValues,
  error = false,
  errMsg = "",
  className = "",
  inputClassName = "h-10 p-2",
  labelClassName,
  required = false,
  type = "text",
  inputRef,
  options = [],
  label,
  name,
}) => {
  const wrapperRef = React.useRef();
  const identifyDivRef = React.useRef();
  const [inputValue, setInputValue] = useState("");
  // const [inputWidth, setInputWidth] = useState(10);
  const [selectedValues, setSelectedValues] = useState([...options]);

  const handleInputChange = React.useCallback(()=>(event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  }, []);

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const all = [...selectedValues, inputValue];
      setSelectedValues(all);
      setInputValue("");
      onChange?.(all);
      return;
    }
  };

  const handleRemoveItem = (index, event) => {
    const updatedValues = [...selectedValues];
    updatedValues.splice(index, 1);
    setSelectedValues(updatedValues);
    onChange?.(updatedValues);
  };
  // React.useLayoutEffect(() => {
  //   // setInputWidth()
  //   if (wrapperRef.current && identifyDivRef.current) {
  //     const wrap = wrapperRef.current;
  //     const left = identifyDivRef.current.offsetLeft;
  //     const computedStyle = window.getComputedStyle(wrapperRef.current);
  //     const paddingRight = parseInt(computedStyle.paddingRight);
  //     const marginRight = parseInt(computedStyle.marginRight);
  //     const w =
  //       wrap.offsetLeft -
  //       (wrap.clientWidth - wrap.children[wrap.children.length - 2].offsetLeft);
  //     setInputWidth(w - (paddingRight - marginRight));
  //   }
  // }, [selectedValues?.length]);

  return (
    <div className="w-full">
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
      <div
        className={cn(
          "pz_multi_string_wrapper border-2 border-gray-300 rounded-md flex flex-wrap py-0 px-0.5 mt-2",
          {
            "border-red-600": error,
            "gap-2": selectedValues.length,
            "py-2": selectedValues.length,
          },
          className
        )}
        ref={wrapperRef}
      >
        {selectedValues.map((value, index) => (
          <div
            key={index}
            className="pz_slected_value bg-gray-200 rounded-md flex items-center pl-2"
          >
            {value}
            <button
              onClick={(e) => handleRemoveItem(index, e)}
              className="ml-2 px-2 py-1 text-red-500 hover:text-red-700 focus:outline-none"
            >
              X
            </button>
          </div>
        ))}
        <div id="with_identify" ref={identifyDivRef}></div>

        <input
          ref={inputRef}
          required={required && !selectedValues?.length ? true : false}
          type={type}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          name={name}
          id={name}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !inputValue && selectedValues.length) {
              handleRemoveItem(selectedValues.length - 1, e);
            }
          }}
          className={cn(
            "border-none border-b border-black focus:outline-none w-full",
            inputClassName
          )}
          // style={{ width: `${inputWidth}px` }}
        />
      </div>
    </div>
  );
};

export default MultiInputList;
