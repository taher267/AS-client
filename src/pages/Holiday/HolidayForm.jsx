import { useForm, Controller } from "react-hook-form";
import RHFInput from "../../components/UI/RHFInput";
import Button from "../../components/UI/Button";
import React from "react";

export default function ({
  btnTitle = "Submit",
  onSubmit = () => {},
  holidays = [],
  defaultValues = {},
  loading,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { ...defaultValues },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mt-12">
      <div className="space-y-8">
        <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
          <label
            htmlFor=""
            className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
          >
            Weekend
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              validation={`required→true←Department name is mandatory`}
              {...{ Controller, control, type: "date" }}
              name="name"
              placeholder="Enter Department"
              defaultValue={defaultValues["name"] || ""}
            />
          </div>
        </div>
      </div>
      <div className="space-y-8 mt-2">
        <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
          <label
            htmlFor=""
            className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
          >
            Weekend
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              className="h-11"
              validation={`required→true←Select a establishment name!`}
              {...{
                Controller,
                control,
                options: [
                  // { name: "Sunday", id: 0 },
                  // { name: "Monday", id: 1 },
                  // { name: "Tuesday", id: 2 },
                  // { name: "Wednesday", id: 3 },
                  // { name: "Thursday", id: 4 },
                  // { name: "Friday", id: 5 },
                  // { name: "Saturday", id: 6 },
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                closeMenuOnSelect: false,
                multiple: true,
                selector: { label: "name", value: "id" },
                // options: holidays.map((item) => item.name),
              }}
              name="weekly"
              type="select"
              // type="custom_multi_select"
              placeholder="Enter Establishment"
              // defaultValue="Software Developer"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-12">
        <Button
          disabled={loading || Object.keys(errors || {}).length}
          loading={loading}
          type="submit"
          className=" text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
        >
          {btnTitle}
        </Button>
      </div>
    </form>
  );
}
