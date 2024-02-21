// import MultiInputList from "../../components/UI/MultiInputList";
// import NewInputField from "./NewReportForm/NewInputField";

import React from "react";
import { axiosPrivate } from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { WORK_REPORT_PATH } from "../../config";

const ObserveBy = () => {
  const { manageAccessToken } = useAuth();
  const [allSelfReportPermission, setAllSelfReportPermission] =
    React.useState();

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        const { data } = await axiosPrivate.get(
          `report-permissions/observe-by?${new URLSearchParams({
            expands: "user_id,report_form",
          }).toString()}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal,
          }
        );
        setAllSelfReportPermission(data);
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

  const headers = React.useMemo(() => {
    return {
      className:
        "py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500",
      items: [
        {
          title: "ID",
          field: "id",
        },
        {
          title: "User",
          field: "user_id",
          render: ({ user_id: { name, id, profilePic } }) => (
            <div className="xs:gap-3 sm:gap-2 items-center sm:flex">
              <img
                src={profilePic}
                alt={name}
                loading="lazy"
                style={{ borderRadius: "50%", height: "35px", width: "35px" }}
              />
              <div>
                <h4>{name}</h4>
                <p className="text-gray-400">{id}</p>
              </div>
            </div>
          ),
        },
        //

        {
          title: <span className="sr-only">Actions </span>,
          className: "",
        },
      ],
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
          {(allSelfReportPermission?.data?.length && (
            <Table
              {...{
                dataItems: allSelfReportPermission.data,
                headers,
                Action,
              }}
            />
          )) ||
            ""}
        </div>
      </div>
    </main>
  );
};

export default ObserveBy;

const Action = ({ deleteItem, deleting, item }) => {
  const { link, ...itemRest } = item;
  const linkState = {
    data: itemRest,
    links: {
      self: link,
    },
  };
  return (
    <div className="flex items-center space-x-4">
      <Link
        state={linkState}
        to={`${WORK_REPORT_PATH}/report-permission/${item.id}/report-form/${
          item?.report_form_id?.id || item?.report_form_id
        }`}
        // to={`${WORK_REPORT_PATH}/${item?.id}${REPORT_FORM_SUBMISSION_PATH}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Report
      </Link>
      {/* <button
        onClick={() => {
          if (deleteItem && id) {
            deleteItem?.(id);
          }
        }}
        disabled={deleting}
        type="button"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="w-5 h-5 mr-2 -ml-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Remove
      </button> */}
    </div>
  );
};
