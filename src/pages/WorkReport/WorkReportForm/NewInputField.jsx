import { Fragment, useState } from "react";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Button from "../../../components/UI/Button";
import RHFInput from "../../../components/UI/RHFInput";

const valuesInit = { name: "" };
const initFields = {
  label: "",
  name: "",
  type: "",
  // sl_id: "",
  // template: "",
  status: "",
  placeholder: "",
  options: [],
  params: "",
  validation: "",
  // icon: "",
};

const NewInputField = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
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

  useEffect(() => {
    if ("data") {
      // reset();
      // navigate('/dashboard/measurement', { state: 'reload' });
      // console.log(data);
    }
  }, []);

  useEffect(() => {
    if (checkingSL_Id) {
      uniqueSl_ID(watch("fields"));
    }
  }, [checkingSL_Id]);

  const uniqueSl_ID = (data = []) => {
    const mapping = [];
    let k = 0;
    const errs = [];
    for (const { sl_id } of data) {
      if (mapping.includes(sl_id)) {
        errs.push({ k, sl_id });
      }
      mapping.push(sl_id);
      k++;
    }
    if (errs.length) {
      console.log(errs);
      // setError('fields')
    }
  };
  const {
    fields: arrayForm,
    append,
    remove,
  } = useFieldArray({
    name: "fields",
    control,
  });

  const onSubmit = (data) => {
    // setGqlErrs({});
    console.log(data);
    return;

    // const copyData = JSON.parse(JSON.stringify(data));
    if (!data?.existingGroup) delete data?.existingGroup;
    data.fields = data.fields?.map?.((item) => {
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
    // createInputField({ variables: { fields: data } });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };

  return (
    <div>
      {processing && <div>LinearProgress</div>}
      <div>
        <p variant="h6">New Report Form</p>
        <p>
          Instruction for validation syntex=&gt;Validation
          /required→true←message∂
        </p>
        <div>
          {Object.values(gqlErrs || {})?.map?.((item) => (
            <p sx={{ color: "red" }} key={item}>
              {item}
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <RHFInput
            {...{
              control,
              Controller,
              gqlErrs,
              setGqlErrs,
              name: "name",
              errors,
              placeholder: "Name globally unique",
              label: "Form Name (An example: form_01)",
              onFocus,
              validation:
                "required→Name is mandatory!∂pattern→^[a-zA-Z][a-zA-Z0-9_]+$←Invalid value, a to z 0 to 9 and _ allow", //→true←
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
                          <label className="block mb-0 sm:mb-2">&nbsp;</label>
                          <Button
                            className=""
                            key={keye}
                            disabled={arrayForm?.length === 1}
                            onClick={() => remove(keye)}
                          >
                            Del
                          </Button>
                        </div>
                      );

                    return (
                      <Fragment key={`${i}.${j}`}>
                        <RHFInput
                          {...{
                            control,
                            Controller,
                            gqlErrs,
                            setGqlErrs,
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
                // Object.keys(gqlErrs).length > 0 ||
                Object.keys(errors).length > 0
              }
              type="submit"
              className="w-full block mb-3 sm:mb-0"
            >
              Add Form Fields
            </Button>
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
  );
};

export default NewInputField;

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
      "select",
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
    options: ["ACTIVE", "DEACTIVE"],
    validation: "required→Status is mandatrory!",
    // validation: {
    //   required: { value: true, message: `Status is mandatrory!` },
    // },
  },
  options: {
    label: "Options",
    type: "select",
    options: [],
    multiple: true,
    freeSolo: false,
    placeholder: "Write and hit enter key!",
    // validate: function () {
    //   // v, { fields }, idx
    //   console.log(arguments);
    //   // if (fields[idx].type === "multi_select" && !v?.length) return `Options are mandatory for multi_select input type!`;
    // },
  },
  params: {
    label: "Params",
    placeholder: "Params→∂←",
  },

  placeholder: {
    label: "Placeholder",
    placeholder: "Write input placeholder",
  },
  validation: {
    label: "Validation",
    placeholder:
      "required→Field is mandartory!∂pattern→^[A-Za-z_]+$←Name should be Aa to Zz without ",
  },
};
