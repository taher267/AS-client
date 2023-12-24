import React from "react";
import ReportPermissionForm from "../ReportPermissionForm";
import { axiosPrivate } from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import moment from "moment";
const NewDepartment = () => {
  const { manageAccessToken } = useAuth();
  const [limit, setLimit] = React.useState(100);
  const [loading, setLoading] = React.useState(false);
  const [createLoading, setCreateLoading] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState({});
  const [allDepartments, setAllDepartments] = React.useState({});
  const [allEstablishments, setAllEstablishments] = React.useState({});
  const [allHolidays, setAllHolidays] = React.useState({});
  const [allReportForms, setAllReportForms] = React.useState({});

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const accessToken = await manageAccessToken();
        const { data: usersData } = await axiosPrivate.get(`/users`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setAllUsers(usersData);
        const { data: establishments } = await axiosPrivate.get(
          `/establishments`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setAllEstablishments(establishments);
        const { data: departments } = await axiosPrivate.get(`/departments`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setAllDepartments(departments);
        const { data: holidays } = await axiosPrivate.get(`/holidays`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setAllHolidays(holidays);
        const { data: reportForms } = await axiosPrivate.get(`/report-forms`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setAllReportForms(reportForms);
      } catch (e) {
        console.log(e);
      } finally {
        // common work
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (formData) => {
    try {
      setCreateLoading(true);
      const accessToken = await manageAccessToken();
      const copy = JSON.parse(JSON.stringify(formData));
      copy.open_submission_date = `${copy.open_submission_date}T00:05:00.000+00:00`;
      const { data } = await axiosPrivate.post(
        `/report-permissions`,
        { ...copy },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // setEstablishments(data);
      console.log(data);
      toast.success(data.message);
    } catch (e) {
      let msg = e?.response?.data?.message || e.message;
      toast.error(msg, { duration: 2000 });
      console.log(e);
    } finally {
      // common work
      setCreateLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">
                New Report Permission
              </h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              {loading ? (
                <></>
              ) : (
                <ReportPermissionForm
                  onSubmit={onSubmit}
                  establishments={allEstablishments?.data || []}
                  departments={allDepartments?.data || []}
                  holidays={allHolidays?.data || []}
                  reportForms={allReportForms?.data || []}
                  users={allUsers?.data || []}
                  observers={allUsers?.data || []}
                  defaultValues={{
                    status: "open",
                    // open_submission_date: moment().format('YYYY-MM-DD'),
                    // establishment: "65808706e750347c2485ff24",
                  }}
                  loading={createLoading}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewDepartment;
