import { Fragment, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Button from "../../../../components/UI/Button";
import RHFInput from "../../../../components/UI/RHFInput";

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

const SubmissionForm = ({ fields, onSubmit, defaultValues }) => {
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
    defaultValues: { ...defaultValues },
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

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };

  return (
    <div>
      {processing && <div>LinearProgress</div>}
      <div>
        <p variant="h6">Report Submission</p>
        <div>
          {Object.values(gqlErrs || {})?.map?.((item) => (
            <p sx={{ color: "red" }} key={item}>
              {item}
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="">
            {fields?.map?.((field, i) => (
              <Fragment key={`${i}`}>
                <RHFInput
                  {...{
                    defaultValue: defaultValues?.[field?.name] || "",
                    control,
                    Controller,
                    gqlErrs,
                    setGqlErrs,
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
                processing ||
                // Object.keys(gqlErrs).length > 0 ||
                Object.keys(errors).length > 0
              }
              type="submit"
              className="w-full block mb-3 sm:mb-0"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
