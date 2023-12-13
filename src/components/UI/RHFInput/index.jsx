import React from "react";
import Input from "../Input";

const RHFInput = ({
  type = "text",
  Controller,
  control,
  name,
  // defaultValue,
  ...restProps
}) => {
  if (!Controller || !control) {
    return (
      <div className="text-red-600">Please provide Controller & controll</div>
    );
  }
  if (
    //["text", "email", "password", "url"]
    inputsTypes.includes(type)
  ) {
    return (
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, ref, ...field } }) => (
            <Input
              {...field}
              {...{ inputRef: ref,type, ...restProps }}
              // value={value || ""}
            />
          )}
        />
      </div>
    );
  }
  return (
    <div className="text-red-800">
      {`Doesn't match any input!`}
      {/* {type} */}
    </div>
  );
};

export default RHFInput;

const inputsTypes = [
  // "checkbox",
  // "button",
  "color",
  "date",
  "datetime-local",
  "email",
  // "file",
  "hidden",
  // "image",
  "month",
  "number",
  "password",
  // "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
];
