import { Link, Outlet } from "react-router-dom";
import cn from "../../../utils/cn";

import { useAuth } from "../../../context/AuthContext";
import React from "react";
import Sidebar from "../Sidebar";
import SearchIcon from "../../../Icons/SearchIcon";
import AnalyticsIcon from "../../../Icons/AnalyticsIcon";
import LeftArrowCircleIcon from "../../../Icons/LeftArrowCircleIcon";

const AuthLayout = () => {
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = React.useState(true);
  React.useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Attach the event listener when component mounts
    // window.addEventListener("resize", handleResize);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
    // Detach the event listener when component unmounts
    return () => {
      // window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex flex-1 bg-gray-50">
      <div
        className={cn("md:w-64 transition-all duration-400 ease-out", {
          //md:flex md:w-64 md:flex-col
          flex: showSidebar,
          hidden: !showSidebar,
        })}
      >
        {/* hidden */}
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
          {/* <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="w-auto h-8"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
              alt=""
            />
          </div> */}
          <div className="px-4 mt-0">
            <label htmlFor="" className="sr-only">
              {" "}
              Search{" "}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="search"
                name=""
                id=""
                className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                placeholder="Search here"
              />
            </div>
          </div>
          <div className="px-4 mt-6">
            <hr className="border-gray-200" />
          </div>
          <div className="flex flex-col flex-1 px-3 mt-6">
            <Sidebar />

            <div className="pb-4 mt-20">
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
              >
                <img
                  loading="lazy"
                  className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                  src={user?.profilePic}
                  alt={user?.name}
                />
                {user?.name}
                <AnalyticsIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 relative">
        <span
          className={`absolute left-[-5px] top-[-5px] text-2xl cursor-pointer transform rotate-${
            showSidebar ? `0` : "180"
          }`}
          onClick={() => setShowSidebar((p) => !p)}
        >
          <LeftArrowCircleIcon className={`w-8 h-8`} />
        </span>
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <Outlet />
              {/* ADD YOUR CONTENT HERE */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AuthLayout;
