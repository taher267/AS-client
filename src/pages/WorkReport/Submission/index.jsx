// import MultiInputList from "../../components/UI/MultiInputList";
// import NewInputField from "./NewReportForm/NewInputField";

import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { axiosPrivate } from "../../../api/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import keyValueValidation from "../../../utils/validation/keyValueValidation";
import filteringRequiredKeys from "../../../utils/validation/filteringRequiredKeys";
import { WORK_REPORT_PATH } from "../../../config";
import SimpleForm from "../../../components/SimpleForm";

const Submission = () => {
  const { id: permited_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { manageAccessToken } = useAuth();
  const [permitedForm, setPermitedForm] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  const form_fields = permitedForm?.data?.report_form?.fields;
  //   console.log(permitedForm?.data?.open_submission_date);

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const { state } = location;
    if (permited_id && permited_id !== state?.data?.id) {
      (async () => {
        try {
          const accessToken = await manageAccessToken();
          const { data } = await axiosPrivate.get(
            `report-permissions/${permited_id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
              signal,
            }
          );
          setPermitedForm(data);
        } catch (err) {
          const msg = err.response?.data?.message || err.message;
          toast.error(msg);
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    } else if (permited_id === state?.data?.id && !permitedForm) {
      const fm = location.state;
      setPermitedForm(fm);
      console.log(fm, "fm");
      setLoading(false);
    }
    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [location?.state?.id, permited_id]);
  // console.log(new Date().toISOString())
  const onSubmit = async (form_data, reset) => {
    try {
      const validationCheck = keyValueValidation({
        keys: filteringRequiredKeys({ values: form_fields }),
        values: [form_data],
      });
      if (!validationCheck) {
        toast.error(`Please fillup with valid field data!`);
        return;
      }
      const { for_submission_date, ...rest_form_data } = form_data;
      const request_data = {
        fields: rest_form_data,
        for_submission_date: `${for_submission_date}T00:05:00.000+00:00`, //T12:00:00.000Z
        report_permission_id: permited_id,
      };
      // console.log(request_data);
      // // T00:05:00.000+00:00
      // return;
      const accessToken = await manageAccessToken();
      await axiosPrivate.post(`work-reports`, request_data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success(`Successfully, submited`);
      const redirect = `${WORK_REPORT_PATH}/self`;
      navigate(redirect, { replace: true });
      // console.log(filteringRequiredKeys({ values: form_fields }));
    } catch (e) {
      const msg = e?.response?.data?.message || e.message;
      toast.error(msg);
    }
  };
  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">Report Forms</h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              {!loading && form_fields?.length && (
                <SimpleForm
                  {...{
                    button_desabled: loading,
                    onSubmit,
                    fields: [
                      {
                        // name: "open_submission_date",
                        name: "for_submission_date",
                        label: "For Submission Date",
                        type: "date",
                        max:
                          permitedForm?.data?.open_submission_date?.slice?.(
                            0,
                            10
                          ) || "",
                        validation:
                          "required→true←For submission date is mandatory",
                      },
                      ...form_fields,
                    ],
                    defaultValues: {
                      for_submission_date:
                        permitedForm?.data?.open_submission_date?.slice?.(
                          0,
                          10
                        ) || "",
                    },
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Submission;
