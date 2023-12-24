import { useForm, Controller } from "react-hook-form";
import RHFInput from "../../components/UI/RHFInput";
import Button from "../../components/UI/Button";
import React from "react";

export default function ({
  btnTitle = "Submit",
  onSubmit = () => {},
  establishments = [],
  departments = [],
  holidays = [],
  reportForms = [],
  users = [],
  observers = [],
  defaultValues = {},
  loading,
}) {
  const { handleSubmit, control } = useForm({
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
            Assign to
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              validation={`required→true←Select a Assing to!`}
              {...{
                Controller,
                control,
                options: users || [],
                selector: { label: "name", value: "id" },
                // options: establishments.map((item) => item.name),
              }}
              name="user_id"
              type="select"
              placeholder="Enter Establishment"
              // defaultValue="Software Developer"
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
              // validation={`required→true←Select a establishment name!`}
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
              defaultValue={defaultValues["establishment_id"] || ""}
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
            Department Name
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              // validation={`required→true←Select a establishment name!`}
              {...{
                Controller,
                control,
                options: departments || [],
                selector: { label: "name", value: "id" },
                // options: establishments.map((item) => item.name),
              }}
              name="department_id"
              type="select"
              placeholder="Enter department"
              defaultValue={defaultValues["department_id"] || ""}
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
            Assign report form
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              validation={`required→true←Select a report form!`}
              {...{
                Controller,
                control,
                options: reportForms || [],
                selector: { label: "name", value: "id" },
                // options: establishments.map((item) => item.name),
              }}
              name="report_form_id"
              type="select"
              placeholder="Enter Establishment"
              defaultValue={defaultValues["report_form_id"] || ""}
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
            Assign Holiday form (if don't assign, it will be 7 days working days
            in week)
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              // validation={`required→true←Select a holiday!`}
              {...{
                Controller,
                control,
                options: holidays || [],
                selector: { label: "name", value: "id" },
                // options: establishments.map((item) => item.name),
              }}
              name="holiday_id"
              type="select"
              placeholder="Enter Establishment"
              defaultValue={defaultValues["holiday_id"] || ""}
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
            Assign a Observer
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              // validation={`required→true←Select a Observer!`}
              {...{
                Controller,
                control,
                options: observers || [],
                selector: { label: "name", value: "id" },
                // options: establishments.map((item) => item.name),
              }}
              name="observer_id"
              type="select"
              placeholder="Enter Establishment"
              defaultValue={defaultValues["observer_id"] || ""}
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
            Open Submission Date
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              validation={`required→true←Select a Open Submission Date!`}
              {...{
                Controller,
                control,
                // options: establishments.map((item) => item.name),
              }}
              name="open_submission_date"
              type="date"
              placeholder="Enter Establishment"
              defaultValue={defaultValues["open_submission_date"] || ""}
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
            Permission Status
          </label>
          <div className="mt-2 sm:mt-0 sm:col-span-2">
            <RHFInput
              validation={`required→true←Select a permission Status!`}
              {...{
                Controller,
                control,
                options: ["open", "close"],
                // selector: { label: "name", value: "id" },
                // options: establishments.map((item) => item.name),
              }}
              name="status"
              type="select"
              // placeholder="Enter Establishment"
              defaultValue={defaultValues["status"] || ""}
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
