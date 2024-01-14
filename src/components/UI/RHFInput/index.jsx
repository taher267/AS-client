import React from "react";
import Input from "../Input";
import Select from "../Select";
import ReactSelect from "react-select";
import MultiInputList from "../MultiInputList";
import stringToRHFRules from "../../../utils/validation/stringToRHFRules";

const RHFInput = ({
  type = "text",
  Controller,
  control,
  name,
  defaultValue = "",
  validation,
  options,
  multiple = false,
  inputErrors,
  selector = {},
  closeMenuOnSelect = true,
  // className,
  ...restProps
}) => {
  if (!Controller || !control) {
    return (
      <div className="text-red-600">Please provide Controller & controll</div>
    );
  }
  const rules = validation ? stringToRHFRules({ data: validation }) : {};
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
          const { className, style = {} } = restProps;
          const opts = [];
          const one = options?.[0];

          for (const item of options) {
            if (typeof item === "object") {
              const label = item?.[selector?.label];
              const value = item?.[selector?.value];
              opts.push({ label, value, ...item });
            } else {
              opts.push({ label: item, value: item });
            }
          }

          return (
            <ReactSelect
              isMulti={multiple}
              {...{ options: opts, ...field, closeMenuOnSelect }}
              styles={{
                control: (baseStyles) => {
                  return {
                    ...baseStyles,
                    borderColor: error ? "red" : "",
                    ...style,
                  };
                },
              }}
              classNames={{
                control: (state) => className || "",
              }}
            />
          );
          // return (
          //   <Select
          //     options={options}
          //     {...field}
          //     {...{
          //       defaultValue,
          //       multiple,
          //       name,
          //       selector,
          //       ...restProps,
          //       error: Boolean(error),
          //       errMsg: error?.message,
          //       inputRef: ref,
          //       required: Boolean(rules?.required?.value),
          //     }}
          //   />
          // );
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
          const opts = [];
          for (const item of options) {
            const label = item?.[selector.label];
            const value = item?.[selector.value];
            opts.push({ label, value, ...item });
          }
          return (
            <ReactSelect isMulti={multiple} {...{ onChange, options: opts }} />
          );
        }}
      />
    );
  }
  return (
    <div className="text-red-800">
      {`${type}, Doesn't match any input!`}
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
  "textarea",
  "time",
  "url",
  "week",
];

/**
 * if (type === "select") {
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
  }
 */
