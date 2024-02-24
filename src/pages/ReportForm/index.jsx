// import MultiInputList from "../../components/UI/MultiInputList";
// import NewInputField from "./NewReportForm/NewInputField";

import React from "react";
import { axiosPrivate } from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const ReportForm = () => {
  const { manageAccessToken } = useAuth();
  const [allReportForm, setAllReportForms] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [initLoad, setInitLoad] = React.useState(null); //init, up, down
  // const [editLoading, setEditLoading] = React.useState(false);
  // const [editId, setEditId] = React.useState(null);

  const handlePage = (_page) => {
    setPage(_page);
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const accessToken = await manageAccessToken();
        if (initLoad === null) {
          setInitLoad(true);
        }
        setLoading(true);
        const { data } = await axiosPrivate.get(
          `report-forms?${new URLSearchParams({ page, limit })}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal,
          }
        );
        setAllReportForms(data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
        console.log(err);
      } finally {
        setLoading(false);
        setInitLoad(false);
      }
    })();
    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [page]);

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
          title: "Name",
          field: "name",
        },
        {
          title: "Fields",
          field: "fields",
          render: ({ fields }) => {
            const keys = ["label", "name", "type", "validation"];
            return (
              <div>
                {fields?.map?.((field, k) => {
                  return (
                    <div
                      key={k}
                      className="flex justify-between items-center mb-2"
                    >
                      {keys.map((keye) => (
                        <div key={`${k}.${keye}`}>{field[keye]}</div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          },
        },
        {
          title: "Created On",
          field: "createdAt",
        },
        // {
        //   title: <span className="sr-only">Actions</span>
        // }
      ],
    };
  }, []); // editId
  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">
                All Report Forms
              </h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>
              {(initLoad === false && allReportForm?.data?.length && (
                <Table
                  {...{
                    dataItems: allReportForm.data,
                    headers,
                    // Action,
                  }}
                />
              )) ||
                ""}
              {(initLoad === false &&
                allReportForm?.pagination?.totalPage > 1 && (
                  <Pagination
                    {...{ ...allReportForm?.pagination, handlePage, loading }}
                  />
                )) ||
                ""}
              {/* {allReportForm?.data?.map((form) => (
                <div
                  key={form.id}
                  className="flex justify-between border-b-1 border-solid border-black"
                >
                  <div>{form.name}</div>
                  <div>
                    {form.fields?.map?.(({ label }) => label).join?.("<=>")}
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportForm;
