import React, { useState } from "react";
import cn from "../../utils/cn";
const data = {
  headers: {
    className:
      "py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500",
    items: [
      {
        title: "Customer",
        field: "customer",
        className: "",
      },
      {
        title: "Email Address",
        field: "email_address",
        className: "",
      },
      {
        title: "Phone Number",
        field: "phone_number",
        className: "",
      },
      {
        title: "Join Date",
        field: "join_date",
        className: "hidden xl:table-cell",
      },
      {
        title: "Country",
        field: "country",
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
  },
};
const Table = ({
  headers = data.headers,
  dataItems = [],
  deleteItem,
  deleting,
}) => {
  console.log(dataItems);
  return (
    <div className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">Customers</p>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipis.
            </p>
          </div>
          <div className="flex items-center justify-start mt-4 sm:justify-end sm:mt-0 sm:space-x-7">
            <button
              type="button"
              className="items-center hidden px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm sm:inline-flex hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="w-4 h-4 mr-1 -ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export to CSV
            </button>
            <div className="inline-flex items-center justify-end">
              <label
                htmlFor="sort"
                className="text-base font-medium text-gray-900 sm:text-sm"
              >
                {" "}
                Sort:{" "}
              </label>
              <select
                id="sort"
                name="sort"
                className="block w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              >
                <option>Popularity</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 lg:mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                <thead className="hidden lg:table-header-group">
                  <tr>
                    {headers?.items?.map(
                      ({
                        className,
                        title,
                        commonClass = "",
                        ignoreComonClass = false,
                      }) => {
                        let addClass = "";
                        if (commonClass) {
                          addClass = commonClass + " ";
                        } else if (!ignoreComonClass) {
                          if (className) {
                            addClass = className + " ";
                          }
                          if (headers?.className) {
                            addClass = headers?.className + " ";
                          }
                        }

                        return (
                          <th key={title} className={cn(addClass)}>
                            {title}
                          </th>
                        );
                      }
                    )}
                  </tr>
                </thead>
                <tbody>
                  {dataItems?.map((item) => (
                    <tr key={item.id} className="bg-white">
                      <td className="px-4 py-4 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                        <div>{item[headers.items[0].title]}</div>
                        <div className="mt-1 space-y-2 font-medium pl-11 lg:hidden">
                          {headers?.items?.map?.((im, k) => {
                            if (k !== 0 || k !== headers?.items?.length - 1) {
                              return (
                                <div
                                  key={`${item.id}${im.title}`}
                                  className="flex items-center"
                                >
                                  {item[im.field]}
                                </div>
                              );
                            }
                          })}
                          <div className="flex items-center pt-3 space-x-4">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit Details
                            </button>
                            <button
                              onClick={() => deleteItem?.(item.id)}
                              disabled={deleting}
                              type="button"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      {headers?.items?.map?.((im, k) => {
                        if (k !== 0 || k !== headers?.items?.length - 1) {
                          return (
                            <td
                              key={`${item.id}.${im.title}`}
                              className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap"
                            >
                              <div className="flex items-center">
                                {item[im.field]}
                              </div>
                            </td>
                          );
                        }
                      })}

                      <td className="hidden px-4 py-4 lg:table-cell whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Edit Details
                          </button>
                          <button
                            onClick={() => deleteItem?.(item.id)}
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
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Table;
