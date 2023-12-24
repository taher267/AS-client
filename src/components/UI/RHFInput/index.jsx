import React from "react";
import Input from "../Input";
import stringToRHFRules from "./stringToRHFRules";
import Select from "../Select";
import MultiInputList from "../MultiInputList";

const RHFInput = ({
  type = "text",
  Controller,
  control,
  name,
  defaultValue = "",
  validation,
  options,
  multiple=false,
  setGqlErrs,
  gqlErrs,
  selector = {},
  // className,
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
                name,
                defaultValue,
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
    );
  } else if (type === "select") {
    return (
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
                defaultValue,
                multiple,
                name,
                selector,
                ...restProps,
                error: Boolean(error),
                errMsg: error?.message,
                inputRef: ref,
                required: Boolean(rules?.required?.value),
              }}
            />
          );
        }}
      />
    );
  } else if (type === "custom_multi_select") {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
        }}
        render={({
          field: { ref, onChange, value, ...field },
          fieldState: { error },
          ...rest
        }) => {
          return (
            <MultiInputList
              options={options}
              {...field}
              {...{
                ...restProps,
                error: Boolean(error),
                errMsg: error?.message,
                inputRef: ref,
              }}
              // onChange={(data) => {
              //   onChange(data);
              //   return data;
              // }}
            />
          );
        }}
      />
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
