import React from "react";
import Input from "../Input";
import Select from "../Select";
import ReactSelect from "react-select";
import MultiInputList from "../MultiInputList";
import stringToRHFRules from "../../../utils/validation/stringToRHFRules";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import cn from "../../../utils/cn";
// import classes from "./input.module.css";

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
  if (inputsTypes.includes(type)) {
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
  } else if (type === "date") {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
        }}
        render={({
          field: { value, ref, onChange, ...field },
          fieldState: { error },
          // ...rest
        }) => {
          const valueSetter = ({ values, isMultiple }) => {
            if (isMultiple) {
              if (typeof values === "object" && values?.length) {
                return values?.map?.((item) => new Date(item)) || [];
              } else if (values) {
                return new Date(values);
              }
            } else {
              if (typeof values === "object" && values?.length) {
                return new Date(values[0]);
              } else if (values) {
                return new Date(values);
              }
            }
          };
          return (
            <>
              <DatePicker
                placeholder={restProps?.placeholder}
                containerClassName={cn("w-full", {
                  "border-red-500": Boolean(error),
                })}
                inputClass={cn("w-full p-2 border border-gray-300 rounded", {
                  "border-red-500": Boolean(error),
                })}
                // format="YYYY-mm-ddTHH:mm:ssZ"
                format="YYYY-MM-DD"
                // multiple={multiple}
                plugins={[<DatePanel />]}
                {...field}
                value={
                  value === undefined && defaultValue
                    ? valueSetter({
                        values: defaultValue,
                        isMultiple: multiple,
                      })
                    : valueSetter({ values: value, isMultiple: multiple })
                }
                onChange={(_, { validatedValue }) => onChange(validatedValue)}
              />
              {(error && (
                <p className="text-red-500 text-base">{error.message}</p>
              )) ||
                ""}
            </>
          );
          // return (
          //   <Input
          //     {...field}
          //     {...{
          //       name,
          //       defaultValue,
          //       error: Boolean(error),
          //       errMsg: error?.message,
          //       inputRef: ref,
          //       type,
          //       ...(rules?.required?.value ? { required: true } : {}),
          //       ...restProps,
          //     }}
          //     // value={value || ""}
          //   />
          // );
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
          field: { ref, value, ...field },
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
            <>
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
                defaultValue={
                  defaultValue
                    ? defaultValueSetter({
                        defaultOptions: defaultValue,
                        OPTIONS: opts,
                        isMultiple: multiple,
                      })
                    : ``
                }
              />
              {(error && (
                <p className="text-red-500 text-base">{error.message}</p>
              )) ||
                ""}
            </>
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
  // "date",
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

const defaultValueSetter = ({
  isMultiple = false,
  defaultOptions,
  OPTIONS = [],
}) => {
  // const optionsVals = OPTIONS.map((item) => item.value);
  if (isMultiple) {
    if (Array.isArray(defaultOptions)) {
      const vals = defaultOptions.map((item) => item?.value || item);
      const filtered = OPTIONS.filter((item) => {
        if (typeof item === "object") {
          if (vals.includes(item?.value)) {
            return true;
          }
          return false;
        } else if (vals.includes(item?.value)) {
          return true;
        }
        return false;
      });

      return filtered;
    } else if (typeof defaultOptions === "object") {
      return OPTIONS.filter((item) => item.value === defaultOptions?.value)[0];
    } else if (defaultOptions) {
      return OPTIONS.filter((item) => item.value === defaultOptions)[0];
    } else return "";
  } else if (defaultOptions) {
    if (typeof defaultOptions === "object") {
      return OPTIONS.filter((item) => item.value === defaultOptions?.value)[0];
    } else if (defaultOptions) {
      return OPTIONS.filter((item) => item.value === defaultOptions)[0];
    } else return "";
  }
};
