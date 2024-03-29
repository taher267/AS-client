// import MultiInputList from "../../components/UI/MultiInputList";
// import NewInputField from "./NewReportForm/NewInputField";

import React from "react";
import { axiosPrivate } from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import strReplacer from "../../utils/strReplacer";
// import cn from "../../utils/cn";
// import LeftAngleIcon from "../../Icons/LeftAngleIcon";
// import RightAngleIcon from "../../Icons/RightAngleIcon";
// import Button from "../../components/UI/Button";
import Pagination from "../../components/Pagination";
import { WORK_REPORT_STATUSES } from "../../config";
import ReactSelect from "react-select";
import LoadingIcon from "../../Icons/LoadingIcon";

const WorkReport = () => {
  const { manageAccessToken } = useAuth();
  const [allWorkReport, setAllWorkReports] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [initLoad, setInitLoad] = React.useState(null); //init, up, down
  const [editLoading, setEditLoading] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

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
          `work-reports?${new URLSearchParams({ page, limit })}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal,
          }
        );
        setAllWorkReports(data);
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

  const handlePage = (_page) => {
    setPage(_page);
  };

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
          title: "For submission",
          field: "for_submission_date",
        },
        {
          title: "On Submission",
          field: "createdAt",
        },
        {
          title: "Report",
          field: "fields",
          render: ({ fields, ...item }) => {
            // console.log(item);
            return (
              <div>
                {Object.entries(fields).map(([k, v]) => {
                  return (
                    <div key={k} className="flex justify-between items-center">
                      <div className="capitalize">
                        {strReplacer({
                          str: k,
                          replaceBy: " ",
                          replaceOn: "_",
                        })}
                      </div>
                      <div>{v}</div>
                    </div>
                  );
                })}
              </div>
            );
          },
        },
        {
          title: "Status",
          render: ({ status, id }) => {
            const options = WORK_REPORT_STATUSES.map((sts) => ({
              value: sts,
              label: sts,
            }));
            return (
              <div className="flex items-center gap-2 md:w-[50%] md:inline-block sm:inline-block sm:w-[50%] lg:block lg:w-full relative md:ml-2">
                <ReactSelect
                  className="w-full"
                  isDisabled={Boolean(editId)}
                  defaultValue={{ value: status, label: status }}
                  options={options}
                  onChange={(changed) => {
                    if (status === changed.value) return;
                    const requestObj = {
                      updateData: { status: changed.value },
                      id,
                    };
                    updateItemWithPatch(requestObj);
                  }}
                />
                {(editLoading && editId === id && (
                  <LoadingIcon className={`absolute top-[35%] left-[45%]`} />
                )) ||
                  ""}
              </div>
            );
          },
        },
        {
          title: <span className="sr-only">Actions </span>,
          className: "",
        },
      ],
    };
  }, [editId]);

  const updateItemWithPatch = async ({
    updateData = {},
    id,
    updateOn = "status",
  }) => {
    try {
      if (updateOn === "status") {
        setEditId(id);
      }
      if (!id || !Object.keys(updateData || {}).length) {
        console.log(editId, updateData);
        toast.error(`Update data missing!`);
        return;
      }

      setEditLoading(true);
      const accessToken = await manageAccessToken();
      const {
        data: { data: updatedData },
      } = await axiosPrivate.patch(`work-reports/${id}`, updateData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAllWorkReports((p) => {
        const copy = JSON.parse(JSON.stringify(p));
        copy.data = copy.data.map((item) => {
          if (item.id === updatedData.id) {
            return updatedData;
          }
          return item;
        });
        return copy;
      });
      toast.success(`User has been updated!`);
    } catch (e) {
      let msg = e?.response?.data?.message || e.message;
      toast.error(msg, { duration: 2000 });
      console.log(e);
    } finally {
      if (updateOn === "status") {
        setEditId(null);
      } //else if (updateOn === "roles") {
      // setEditId2(null);
      // }
      setEditLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col flex-1 ">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900">Report Forms</h1>
            </div>
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              <div className="mt-6">
                {/* <p className="text-base font-bold text-gray-900">Profile</p> */}
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
              </div>

              {(initLoad === false && allWorkReport?.data?.length && (
                <Table
                  {...{
                    dataItems: allWorkReport.data,
                    headers,
                    // Action,
                  }}
                />
              )) ||
                ""}
              {(initLoad === false &&
                allWorkReport?.pagination?.totalPage > 1 && (
                  <Pagination
                    {...{ ...allWorkReport?.pagination, handlePage, loading }}
                  />
                )) ||
                ""}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkReport;

// const Action = ({ deleteItem, deleting, item }) => {
//   const { link, ...itemRest } = item;
//   const linkState = {
//     data: itemRest,
//     links: {
//       self: link,
//     },
//   };
//   return (
//     <div className="flex items-center space-x-4">
//       {/* <button
//         type="button"
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         Report Form
//       </button> */}
//       <Link
//         state={linkState}
//         to={`#`}
//         // to={`${WORK_REPORT_PATH}/${item?.id}${REPORT_FORM_SUBMISSION_PATH}`}
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         DEMO
//       </Link>
//       {/* <button
//         onClick={() => {
//           if (deleteItem && id) {
//             deleteItem?.(id);
//           }
//         }}
//         disabled={deleting}
//         type="button"
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         <svg
//           className="w-5 h-5 mr-2 -ml-1"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//         Remove
//       </button> */}
//     </div>
//   );
// };
