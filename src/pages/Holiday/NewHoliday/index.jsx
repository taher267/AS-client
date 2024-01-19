import React from "react";
import DepartmentForm from "../HolidayForm";
import { axiosPrivate } from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HOLIDAY_PATH } from "../../../config";

const NewDepartment = () => {
  const { manageAccessToken } = useAuth();
  const [createLoading, setCreateLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {}, []);

  const onSubmit = async (formData) => {
    try {
      let { occasional, weekly, name } = formData;
      if (!occasional?.length && !weekly?.length) {
        toast.error(`Please provide weekend or occasional holiday!`);
        return;
      }
      const newObject = { name };
      if (occasional?.length) {
        newObject.occasional = occasional.map((item) =>
          new Date(item).toISOString()
        );
      }
      if (weekly?.length) {
        newObject.weekly = weekly.map((item) =>
          typeof item === "object" ? item.value : item
        );
      }
      // console.log(newObject, "=================");
      // return;
      setCreateLoading(true);
      const accessToken = await manageAccessToken();
      const { data } = await axiosPrivate.post(`/holidays`, newObject, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // setHolidays(data);
      toast.success(data.message);
      navigate(HOLIDAY_PATH, { replace: true });
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
              <h1 className="text-2xl font-bold text-gray-900">New Holiday</h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              <DepartmentForm
                onSubmit={onSubmit}
                // holidays={holidays?.data || [{}]}
                defaultValues={{
                  // occasional: ["2023-01-19"],
                  // 2023-12-20T18:09:40.864+00:00
                  weekly: [0, 1],
                }}
                loading={createLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewDepartment;
