import { Fragment, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Button from "../../../../components/UI/Button";
import RHFInput from "../../../../components/UI/RHFInput";

export default function ({ fields, onSubmit, defaultValues }) {
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
    defaultValues: { ...defaultValues },
  });

  const onFocus = ({ target: { name } }) => {
    // let newErr = { ...inputErrors };
    // delete newErr[name];
    // setInputErrors(newErr);
  };

  return (
    <div>
      {processing && <div>LinearProgress</div>}
      <div>
        <p variant="h6">Report Submission</p>
        <div>
          {Object.values(inputErrors || {})?.map?.((item) => (
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
                    inputErrors,
                    // setInputErrors,
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
                // Object.keys(inputErrors).length > 0 ||
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
}
