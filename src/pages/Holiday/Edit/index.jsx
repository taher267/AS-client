import React from "react";
import DepartmentForm from "../HolidayForm";
import { axiosPrivate } from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HOLIDAY_PATH } from "../../../config";
import PencilSquareIcon from "../../../Icons/PencilSquareIcon";

const EditHoliday = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { manageAccessToken } = useAuth();
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const [singleItem, setSingleItem] = React.useState(state);
  const [defaultValues, setDefaultValues] = React.useState(state);
  const navigate = useNavigate();
  console.log(state);
  React.useEffect(() => {
    if (state?.id === id) {
      const { name, occasional, weekly } = JSON.parse(JSON.stringify(state));
      setDefaultValues({ name, occasional, weekly });
      setSingleItem(state);
      setLoading(false);
      setEditFormOpen(true);
    } else {
      getHoliday();
    }
  }, []);

  const getHoliday = async () => {
    try {
      const accessToken = await manageAccessToken();
      const {
        data: { data },
      } = await axiosPrivate.get(`/holidays/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSingleItem(data);
      const { name, occasional, weekly } = data;
      setDefaultValues({ name, occasional, weekly });
      setEditFormOpen(false);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message;
      console.log(e);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      let { occasional = [], weekly = [], name } = formData;
      if (!occasional?.length && !weekly?.length) {
        toast.error(`Please provide weekend or occasional holiday!`);
        return;
      }
      // console.log(formData);
      // return;
      const newObject = { name };
      newObject.occasional = occasional.map((item) =>
        new Date(item).toISOString()
      );
      newObject.weekly = weekly.map((item) =>
        typeof item === "object" ? item.value : item
      );
      // console.log(newObject, "=================");
      // return;
      setUpdateLoading(true);
      const accessToken = await manageAccessToken();
      const { data } = await axiosPrivate.put(`/holidays/${id}`, newObject, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // setHolidays(data);
      toast.success(data.message);
      navigate(HOLIDAY_PATH, { replace: true, state: null });
    } catch (e) {
      let msg = e?.response?.data?.message || e.message;
      toast.error(msg, { duration: 2000 });
      console.log(e);
    } finally {
      // common work
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <PencilSquareIcon /> Edit Holiday
              </h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              {!loading && (
                <DepartmentForm
                  onSubmit={onSubmit}
                  // holidays={holidays?.data || [{}]}
                  defaultValues={
                    { ...defaultValues }
                    // {
                    // occasional: ["2023-01-19"],
                    // 2023-12-20T18:09:40.864+00:00
                    // weekly: [0, 1],
                    // }
                  }
                  loading={updateLoading}
                  btnTitle="Update"
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditHoliday;
