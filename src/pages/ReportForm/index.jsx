// import MultiInputList from "../../components/UI/MultiInputList";
// import NewInputField from "./NewReportForm/NewInputField";

import React from "react";
import axios, { axiosPrivate } from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Table from "../../components/Table";

const ReportForm = () => {
  const { manageAccessToken } = useAuth();
  const [allReportForm, setAllReportForms] = React.useState({});
  
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        const { data } = await axiosPrivate.get(`report-forms`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal,
        });
        setAllReportForms(data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
        console.log(err);
      }
    })();
    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, []);

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

              {allReportForm?.data?.map((form) => (
                <div
                  key={form.id}
                  className="flex justify-between border-b-1 border-solid border-black"
                >
                  <div>{form.name}</div>
                  <div>
                    {form.fields?.map?.(({ label }) => label).join?.("<=>")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportForm;
