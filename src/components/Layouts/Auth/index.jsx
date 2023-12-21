import { Link, Outlet } from "react-router-dom";
import cn from "../../../utils/cn";
import {
  DASHBOARD_PATH,
  DEPARTMENT_PATH,
  ESTABLISHMENT_PATH,
  HOLIDAY_PATH,
  NEW_PATH,
  REPORT_FORM_PATH,
  REPORT_PERMISSION_PATH,
  USER_PATH,
} from "../../../config";
import { useAuth } from "../../../context/AuthContext";
import React from "react";

const AuthLayout = () => {
  const { user } = useAuth();
  const [expand, setExpand] = React.useState(-1);
  const navLists = [
    {
      title: "Dashboard",
      Icon: DownAngleIcon,
      href: DASHBOARD_PATH,
    },
    {
      title: "User",
      Icon: DownAngleIcon,
      // href: USER_PATH,
      items: [
        {
          title: "All",
          Icon: <AnalyticsIcon />,
          href: USER_PATH,
        },
        {
          title: "New",
          Icon: <AnalyticsIcon />,
          href: `${USER_PATH}${NEW_PATH}`,
        },
      ],
    },
    {
      title: "Establistment",
      Icon: DownAngleIcon,
      // href: ESTABLISHMENT_PATH,
      items: [
        {
          title: "All",
          Icon: <AnalyticsIcon />,
          href: ESTABLISHMENT_PATH,
        },
        {
          title: "New",
          Icon: <AnalyticsIcon />,
          href: `${ESTABLISHMENT_PATH}${NEW_PATH}`,
        },
      ],
    },

    {
      title: "Department",
      Icon: DownAngleIcon,
      // href: DEPARTMENT_PATH,
      items: [
        {
          title: "All",
          Icon: <AnalyticsIcon />,
          href: DEPARTMENT_PATH,
        },
        {
          title: "New",
          Icon: <AnalyticsIcon />,
          href: `${DEPARTMENT_PATH}${NEW_PATH}`,
        },
      ],
    },
    {
      title: "Report Form",
      Icon: DownAngleIcon,
      // href: REPORT_FORM_PATH,
      items: [
        {
          title: "All",
          Icon: <AnalyticsIcon />,
          href: REPORT_FORM_PATH,
        },
        {
          title: "New",
          Icon: <AnalyticsIcon />,
          href: `${REPORT_FORM_PATH}${NEW_PATH}`,
        },
      ],
    }, {
      title: "Holiday",
      Icon: DownAngleIcon,
      // href: HOLIDAY_PATH,
      items: [
        {
          title: "All",
          Icon: <AnalyticsIcon />,
          href: HOLIDAY_PATH,
        },
        {
          title: "New",
          Icon: <AnalyticsIcon />,
          href: `${HOLIDAY_PATH}${NEW_PATH}`,
        },
      ],
    },
    {
      title: "Report Permission",
      Icon: DownAngleIcon,
      // href: REPORT_PERMISSION_PATH,
      items: [
        {
          title: "All",
          Icon: <AnalyticsIcon />,
          href: REPORT_PERMISSION_PATH,
        },
        {
          title: "New",
          Icon: <AnalyticsIcon />,
          href: `${REPORT_PERMISSION_PATH}${NEW_PATH}`,
        },
      ],
    },
  ];
  // React.useEffect(() => {
  //   const eles = document.querySelectorAll(".nav-group-item");
  //   if (eles?.length) {

  //     eles.forEach((ele, i) => {
  //       // console.log(ele.classList.add('expand'));
  //     });
  //   }
  // }, []);
  return (
    <div className="flex flex-1 bg-gray-50">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="w-auto h-8"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
              alt=""
            />
          </div>
          <div className="px-4 mt-8">
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
            {navLists.map(({ title, Icon, href, items }, idx) => (
              <div
                key={title}
                className={`space-y-4 nav-group-${idx} nav-group-item`}
              >
                <div
                  className="flex-1 space-y-2"
                  onClick={() => {
                    if (idx === expand) {
                      setExpand(-1);
                      return;
                    }
                    setExpand(idx);
                  }}
                >
                  <Link
                    to={href || "#"}
                    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                  >
                    <AnalyticsIcon />
                    {title}
                    {(Icon && (
                      <Icon className={{ "rotate-180": expand === idx }} />
                    )) ||
                      ""}
                  </Link>
                </div>
                <div
                  className={cn("transition-all duration-200", {
                    block: idx === expand,
                    hidden: idx !== expand,
                  })}
                >
                  {items?.map?.((item) => (
                    <Link
                      key={`${title}.${item.title}`}
                      to={item.href}
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <AnalyticsIcon />
                      {item.title}
                    </Link>
                  ))}
                </div>
                <hr className="border-gray-200" />
              </div>
            )) || ""}

            <div className="pb-4 mt-20">
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
              >
                <img
                  className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                  src={user?.profilePic}
                  alt=""
                />
                {user?.name}
                <AnalyticsIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
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

const SearchIcon = ({ className }) => (
  <svg
    className={cn("w-5 h-5 text-gray-400", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const HomeIcon = ({ className }) => (
  <svg
    className={cn("flex-shrink-0 w-5 h-5 mr-4 text-white", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const DownAngleIcon = ({ className }) => (
  <svg
    className={cn(
      "w-4 h-6 ml-auto text-gray-400 group-hover:text-white",
      className
    )}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const UpAngleIcon = ({ className }) => (
  <svg
    className={cn(
      "w-4 h-6 ml-auto text-gray-400 group-hover:text-white",
      className
    )}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="M12 5v6a2 2 0 0 0 2 2h5.2a10 10 0 0 1-2.32 6.22" />
    <line x1="12" y1="17" x2="12" y2="17" />

    <path d="M20.94 6.94l-2.33-2.33a10 10 0 0 0-6.22 2.32" />
    <line x1="2" y1="2" x2="6" y2="6" />
  </svg>
);
const AnalyticsIcon = ({ className }) => (
  <svg
    className={cn("flex-shrink-0 w-5 h-5 mr-4", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);
