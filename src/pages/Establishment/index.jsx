import React from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../api/axios";
import Table from "../../components/Table";

const Establishment = () => {
  const { manageAccessToken } = useAuth();
  const [allEstablishments, setAllEstablishments] = React.useState({});

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        const { data } = await axiosPrivate.get(`establishments`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal,
        });
        setAllEstablishments(data);
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
              <h1 className="text-2xl font-bold text-gray-900">
                Establishment
              </h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              <Table {...{ headers, dataItems: allEstablishments?.data || [] }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Establishment;

const headers = {
  className:
    "py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500",
  items: [
    {
      title: "Name",
      className: "",
    },
    {
      title: <span className="sr-only"> Actions </span>,
      className: "",

      //     <th className="relative py-3.5 pl-4 pr-4 md:pr-0">
      //     <span className="sr-only"> Actions </span>
      //   </th>
    },
  ],
};
