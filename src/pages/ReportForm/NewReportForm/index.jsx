import { Fragment, useState } from "react";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Button from "../../../components/UI/Button";
import RHFInput from "../../../components/UI/RHFInput";
import { axiosPrivate } from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { REPORT_FORM_PATH } from "../../../config";

const valuesInit = { name: "", status: "active" };
const initFields = {
  label: "",
  name: "",
  type: "",
  // status: "",
  placeholder: "",
  // options: [],
  params: "",
  validation: "",
  // icon: "",
};

const NewReportForm = ({ submitBtnTitle = "Submit" }) => {
  const { manageAccessToken } = useAuth();
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState({});
  const [gqlCommonErr, setGqlCommonErr] = useState({});
  const [checkingSL_Id, setCheckingSL_Id] = useState(false);
  const [processing, setprocessing] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    mode: "all",
    defaultValues: {
      ...valuesInit,
      fields: [initFields],
    },
  });

  const {
    fields: arrayForm,
    append,
    remove,
  } = useFieldArray({
    name: "fields",
    control,
  });

  const onSubmit = async (formData) => {
    try {
      const copyData = JSON.parse(JSON.stringify(formData));
      if (!copyData?.existingGroup) delete copyData?.existingGroup;
      copyData.fields = copyData.fields?.map?.((item) => {
        const { icon, options, type, placeholder, params, validation } = item;
        if (icon) {
          item.icon = JSON.parse(item.icon);
        } else {
          delete item?.icon;
        }
        if (!options?.length) {
          delete item?.options;
        }
        if (!type) {
          delete item?.type;
        }
        if (!placeholder) {
          delete item?.placeholder;
        }
        if (!params) {
          delete item?.params;
        }
        if (!validation) {
          delete item?.validation;
        }
        return item;
      });
      // console.log(copyData.fields);
      const accessToken = await manageAccessToken();
      const { data } = await axiosPrivate.post(`report-forms`, copyData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log(data);
      toast.success(data.message, { duration: 2000 });
      navigate(REPORT_FORM_PATH, { replace: true });
    } catch (e) {
      const msg = e.response?.data?.message || e.message;
      toast.error(msg);
      console.log(e);
    }
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...inputErrors };
    delete newErr[name];
    setInputErrors(newErr);
  };

  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">
                New Department
              </h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mt-12"
                autoComplete="off"
              >
                <RHFInput
                  {...{
                    control,
                    Controller,
                    name: "name",
                    errors,
                    placeholder: "Name globally unique",
                    label: "Form Name (An example: form_01)",
                    onFocus,
                    validation:
                      "required→Name is mandatory!∂pattern→^[a-zA-Z][a-zA-Z0-9_]+$←Invalid value, a to z 0 to 9 and _ allow", //→true←
                  }}
                />
                <RHFInput
                  {...{
                    control,
                    Controller,
                    name: "status",
                    errors,
                    placeholder: "Status",
                    label: "Status",
                    type: "select",
                    options: ["active", "inactive"],
                    onFocus,
                    // validation:"required→Name is mandatory!∂pattern→^[a-zA-Z][a-zA-Z0-9_]+$←Invalid value, a to z 0 to 9 and _ allow", //→true←
                  }}
                />
                <div className="">
                  {arrayForm?.map?.((formItem, i) => (
                    <div key={i} className="w-full">
                      <h5>Item {i + 1}</h5>
                      <div className="block sm:grid grid-cols-2 gap-2">
                        {Object.keys(formItem)?.map?.((keye, j) => {
                          if (keye === "id")
                            return (
                              <div key={j}>
                                <label className="block mb-0 sm:mb-2">
                                  &nbsp;
                                </label>
                                <Button
                                  className=""
                                  key={keye}
                                  disabled={arrayForm?.length === 1}
                                  onClick={() => remove(keye)}
                                >
                                  Delete Fields
                                </Button>
                              </div>
                            );

                          return (
                            <Fragment key={`${i}.${j}`}>
                              <RHFInput
                                {...{
                                  control,
                                  Controller,
                                  inputErrors,
                                  setInputErrors,
                                  name: `fields.${i}.${keye}`,
                                  ...InputFieldValidation?.[keye],
                                  onFocus,
                                }}
                                className=""
                              />
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="block sm:flex justify-between mt-5 gap-3">
                  <Button
                    disabled={
                      processing ||
                      // Object.keys(inputErrors).length > 0 ||
                      Object.keys(errors).length > 0
                    }
                    type="submit"
                    className=""
                  >
                    {submitBtnTitle}
                  </Button>
                  {/* <div className="mt-6 sm:mt-12">
                    <Button
                      type="submit"
                      className="w-full block mb-3 sm:mb-0 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                    >
                      Add Report Form
                    </Button>
                  </div> */}
                  <Button
                    type="button"
                    onClick={() => append(initFields)}
                    className="w-full block"
                  >
                    Add Fields ➕
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewReportForm;

export const InputFieldValidation = {
  label: {
    validation:
      "required→Label is mandartory!∂pattern→^(?!s).*←White space not allow", //→true←
    placeholder: "Enter input label...",
    label: "Label",
  },
  name: {
    // validation: {
    //   required: { value: true, message: `Name is mandartory!` },
    //   pattern: {
    //     value: /^[A-Za-z_]+$/,
    //     message: `Name should be Aa to Zz without space!`,
    //   },
    // },
    validation:
      "required→Name is mandartory!∂pattern→^[A-Za-z_]+$←Name should be Aa to Zz without space!",
    placeholder: "Enter field name...",
    label: "Name",
  },
  type: {
    label: "Type",
    // select: true,
    type: "select",
    options: [
      "text",
      "password",
      // "select",
      // "multi_select",
      "textarea",
      // "checkdiv",
      "radio",
      "button",
      "color",
      "date",
      "datetime-local",
      "email",
      "file",
      "hidden",
      "image",
      "month",
      "number",
      "range",
      "reset",
      "search",
      // "submit",
      "tel",
      "time",
      "url",
      "week",
    ],
  },

  status: {
    label: "Status",
    // select: true,
    type: "select",
    options: ["active", "inactive"],
    validation: "required→Status is mandatrory!",
    // validation: {
    //   required: { value: true, message: `Status is mandatrory!` },
    // },
  },
  // options: {
  //   label: "Options",
  //   type: "custom_multi_select",
  //   options: [],
  //   multiple: true,
  //   placeholder: "Write and hit enter key!",
  //   // validate: function () {
  //   //   // v, { fields }, idx
  //   //   console.log(arguments);
  //   //   // if (fields[idx].type === "multi_select" && !v?.length) return `Options are mandatory for multi_select input type!`;
  //   // },
  // },
  params: {
    label: "Params",
    placeholder: "Params→∂←",
  },

  placeholder: {
    label: "Placeholder",
    placeholder: "Write input placeholder",
  },
  validation: {
    label: "Validation (required→true←Field is mandartory!)",
    placeholder:
      "required→Field is mandartory!∂pattern→^[A-Za-z_]+$←Name should be Aa to Zz without ",
  },
};
