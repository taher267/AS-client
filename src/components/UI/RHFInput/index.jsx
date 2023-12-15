import React from "react";
import Input from "../Input";
import stringToRHFRules from "./stringToRHFRules";
import Select from "../Select";

const RHFInput = ({
  type = "text",
  Controller,
  control,
  name,
  // defaultValue,
  validation,
  options,
  setGqlErrs,
  gqlErrs,
  className,
  ...restProps
}) => {
  if (!Controller || !control) {
    return (
      <div className="text-red-600">Please provide Controller & controll</div>
    );
  }
  const rules = validation ? stringToRHFRules(validation) : {};
  if (
    //["text", "email", "password", "url"]
    inputsTypes.includes(type)
  ) {
    return (
      <div className={className}>
        <Controller
          name={name}
          control={control}
          rules={{
            ...rules,
          }}
          render={({
            field: { value, ref, ...field },
            fieldState: { error },
            ...rest
          }) => {
            return (
              <Input
                {...field}
                {...{
                  error: Boolean(error),
                  errMsg: error?.message,
                  inputRef: ref,
                  type,
                  ...(rules?.required?.value ? { required: true } : {}),
                  ...restProps,
                }}
                // value={value || ""}
              />
            );
          }}
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className={className}>
        <Controller
          name={name}
          control={control}
          rules={{
            ...rules,
          }}
          render={({
            field: { ref, ...field },
            fieldState: { error },
            ...rest
          }) => {
            return (
              <Select
                options={options}
                {...field}
                {...{
                  ...restProps,
                  error: Boolean(error),
                  errMsg: error?.message,
                  inputRef: ref,
                }}
              />
              // <Input
              //   {...field}
              //   {...{
              //     error: Boolean(error),
              //     errMsg: error?.message,
              //     inputRef: ref,
              //     type,
              //     ...(rules?.required?.value ? { required: true } : {}),
              //     ...restProps,
              //   }}
              //   // value={value || ""}
              // />
            );
          }}
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
