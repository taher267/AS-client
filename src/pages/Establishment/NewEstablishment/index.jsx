import { useForm, Controller } from "react-hook-form";
import Button from "../../../components/UI/Button";
import RHFInput from "../../../components/UI/RHFInput";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../../api/axios";

const NewEstablishment = () => {
  const { handleSubmit, control } = useForm();
  const { manageAccessToken } = useAuth();
  const [controller] = React.useState(new AbortController());

  React.useEffect(() => {
    return () => {
      // controller?.abort?.();
    };
  }, []);

  const onSubmit = async (formData) => {
    try {
      const signal = controller?.signal;
      const accessToken = await manageAccessToken();
      const { data } = await axiosPrivate.post(`establishments`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
        // signal,
      });
      toast.success(data.message);
      console.log(data, "===================establisthment");
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">
                New Establishment
              </h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mt-12"
              >
                <div className="space-y-8">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                    <label
                      htmlFor=""
                      className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
                    >
                      Establishment Name
                    </label>
                    <div className="mt-2 sm:mt-0 sm:col-span-2">
                      <RHFInput
                        validation={`required→true←Establishment name is mandatory`}
                        {...{ Controller, control }}
                        name="name"
                        placeholder="Enter Establishment"
                        // defaultValue="Software Developer"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-12">
                  <Button
                    type="submit"
                    className=" text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                  >
                    Add Establishment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewEstablishment;
