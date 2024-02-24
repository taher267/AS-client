import { useForm, Controller } from "react-hook-form";
import RHFInput from "../../components/UI/RHFInput";
import Button from "../../components/UI/Button";
import React from "react";

export default function ({
  btnTitle = "Submit",
  onSubmit = () => {},
  establishments = [],
  defaultValues = {},
  loading,
}) {
  const { handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: { ...defaultValues },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mt-12">
      <div className="space-y-8 mb-2">
        <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
          <label
            htmlFor=""
            className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
          >
            Department Name
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              validation={`required→true←Department name is mandatory`}
              {...{ Controller, control }}
              name="name"
              placeholder="Enter Department"
              defaultValue={defaultValues["name"] || ""}
            />
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
          <label
            htmlFor=""
            className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
          >
            Establishment Name
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              validation={`required→true←Select a establishment name!`}
              {...{
                Controller,
                control,
                options: establishments || [],
                selector: { label: "name", value: "id" },
                // options: establishments.map((item) => item.name),
              }}
              name="establishment_id"
              type="select"
              placeholder="Enter Establishment"
              // defaultValue="Software Developer"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-12">
        <Button
          disabled={loading}
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
