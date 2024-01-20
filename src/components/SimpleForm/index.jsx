import React, { Fragment } from "react";

import { useForm, Controller } from "react-hook-form";
import cn from "../../utils/cn";
import RHFInput from "../UI/RHFInput";
import Button from "../UI/Button";

export default function ({
  fields,
  onSubmit,
  defaultValues,
  button = { title: "Submit", className: "" },
  button_desabled = false,
  autoComplete = "off",
  watch_ref,
  set_error_ref,
  mode = "all",
}) {
  console.log(defaultValues);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    // watch,
    setError,
  } = useForm({
    mode,
    defaultValues: { ...defaultValues },
  });

  const onFocus = ({ target: { name } }) => {
    // let newErr = { ...inputErrors };
    // delete newErr[name];
  };
  React.useEffect(() => {
    if (watch_ref) {
      watch_ref.current = watch_ref;
    }
    if (set_error_ref) {
      set_error_ref.current = setError;
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit((formdata) => onSubmit(formdata, reset))}
      autoComplete={autoComplete}
    >
      <div className="pz_all_input_fields">
        {fields?.map?.((field, i) => (
          <Fragment key={`${i}`}>
            <RHFInput
              {...{
                defaultValue: defaultValues?.[field?.name] || "",
                control,
                Controller,
                // inputErrors,
                ...field,

                onFocus,
              }}
              className=""
            />
          </Fragment>
        ))}
      </div>

      <div className="block sm:flex justify-between mt-5 gap-3">
        <Button
          disabled={
            button_desabled ||
            // Object.keys(inputErrors).length > 0 ||
            Object.keys(errors).length > 0
          }
          type="submit"
          className={cn(`w-full block mb-3 sm:mb-0`, button?.className)}
        >
          {button.title}
        </Button>
      </div>
    </form>
  );
}
