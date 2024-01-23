import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../../api/axios";

export default function () {
  const { report_prmission_id, report_form_id } = useParams();
  const { manageAccessToken } = useAuth();
  const [wrokReports, setWrokReports] = React.useState();

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        const { data } = await axiosPrivate.get(
          `work-reports/report-permission/${report_prmission_id}/report-form/${report_form_id}/?${new URLSearchParams(
            {
              expands: "user_id,report_form",
            }
          ).toString()}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal,
          }
        );

        // http://localhost:4003/api/v1/work-reports/report-permission/65888277a5b2f7bed1785bed/report-form/657f157b8f57f1abcc44a504
        console.log(data, `==========================================`);
        setWrokReports(data);
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
    <main className="flex flex-col flex-1 ">
      <div className="py-6">
        <div className="px-4 mx-auto sm:px-6 md:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Observe By Me</h1>
        </div>
        <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
          <div className="mt-6">
            {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
            <p className="mt-1 text-sm font-medium text-gray-500">
              Form allocated to me
            </p>
          </div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          praesentium sapiente amet reprehenderit culpa voluptas, facilis
          aliquam commodi, numquam quod ut alias obcaecati, neque pariatur
          voluptate expedita odio laudantium modi?
        </div>
      </div>
    </main>
  );
}
