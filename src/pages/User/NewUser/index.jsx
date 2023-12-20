import React from "react";
import DepartmentForm from "../UserForm";
import { axiosPrivate } from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
const NewUser = () => {
  const { manageAccessToken } = useAuth();
  const [limit, setLimit] = React.useState(100);
  const [loading, setLoading] = React.useState(false);
  const [createLoading, setCreateLoading] = React.useState(false);
  const [establishments, setEstablishments] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const accessToken = await manageAccessToken();
        const { data } = await axiosPrivate.get(
          `/establishments?limit=${limit}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setEstablishments(data);
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
      const { data } = await axiosPrivate.post(
        `/departments`,
        { ...formData },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // setEstablishments(data);
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
              {loading ? (
                <></>
              ) : (
                <DepartmentForm
                  onSubmit={onSubmit}
                  establishments={establishments?.data || []}
                  // defaultValues={{
                  //   name: "Taher",
                  //   establishment: "65808706e750347c2485ff24",
                  // }}
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

export default NewUser;
