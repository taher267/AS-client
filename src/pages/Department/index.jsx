import React from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../api/axios";

const Department = () => {
  const { manageAccessToken } = useAuth();
  const [allDepartments, setAllDepartments] = React.useState({});

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        const { data } = await axiosPrivate.get(`departments`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal,
        });
        setAllDepartments(data);
        // console.log(data, "===================");
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
              <h1 className="text-2xl font-bold text-gray-900">Department</h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              <form action="#" method="POST" className="max-w-3xl mt-12">
                <div className="space-y-8">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                    <label
                      htmlFor=""
                      className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
                    >
                      Department Name
                    </label>
                    <div className="mt-2 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue="Software Developer"
                        className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-12">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Department;
