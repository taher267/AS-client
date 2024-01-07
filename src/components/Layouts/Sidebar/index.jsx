import React from "react";
import { Link } from "react-router-dom";
import {
  DASHBOARD_PATH,
  DEPARTMENT_PATH,
  ESTABLISHMENT_PATH,
  HOLIDAY_PATH,
  NEW_PATH,
  REPORT_FORM_PATH,
  REPORT_PERMISSION_PATH,
  USER_PATH,
  WORK_REPORT_PATH,
} from "../../../config";
import { useAuth } from "../../../context/AuthContext";
import DownAngleIcon from "../../../Icons/DownAngleIcon";
import AnalyticsIcon from "../../../Icons/AnalyticsIcon";
import cn from "../../../utils/cn";

export default function Sidebar() {
  const { isAuthorized } = useAuth();
  const [expand, setExpand] = React.useState(-1);
  const dashboard = {
    authorized: false,
    title: "Dashboard",
    Icon: DownAngleIcon,
    href: DASHBOARD_PATH,
  };
  const work_report = {
    title: "Work Report",
    Icon: DownAngleIcon,
    href: "#", // WORK_REPORT_PATH,
    items: [
      {
        title: "Self",
        Icon: <AnalyticsIcon />,
        href: `${WORK_REPORT_PATH}/self`,
      },
    ],
  };
  const report_form = {
    authorized: true,
    title: "Report Form",
    Icon: DownAngleIcon,
    // href: REPORT_FORM_PATH,
    items: [
      {
        authorized: true,
        title: "All",
        Icon: <AnalyticsIcon />,
        href: REPORT_FORM_PATH,
      },
      {
        title: "Self",
        Icon: <AnalyticsIcon />,
        href: `${REPORT_FORM_PATH}/self`,
      },
      {
        authorized: true,
        title: "New",
        Icon: <AnalyticsIcon />,
        href: `${REPORT_FORM_PATH}${NEW_PATH}`,
      },
    ],
  };
  const holiday = {
    title: "Holiday",
    Icon: DownAngleIcon,
    // href: HOLIDAY_PATH,
    items: [
      {
        authorized: true,
        title: "All",
        Icon: <AnalyticsIcon />,
        href: HOLIDAY_PATH,
      },
      {
        title: "Self",
        Icon: <AnalyticsIcon />,
        href: `${HOLIDAY_PATH}/self`,
      },
      {
        authorized: true,
        title: "New",
        Icon: <AnalyticsIcon />,
        href: `${HOLIDAY_PATH}${NEW_PATH}`,
      },
    ],
  };
  const report_permission = {
    title: "Report Permission",
    Icon: DownAngleIcon,
    // href: REPORT_PERMISSION_PATH,
    items: [
      {
        authorized: true,
        title: "All",
        Icon: <AnalyticsIcon />,
        href: REPORT_PERMISSION_PATH,
      },
      {
        title: "Self",
        Icon: <AnalyticsIcon />,
        href: `${REPORT_PERMISSION_PATH}/self`,
      },
      {
        authorized: true,
        title: "New",
        Icon: <AnalyticsIcon />,
        href: `${REPORT_PERMISSION_PATH}${NEW_PATH}`,
      },
    ],
  };
  const commonNavLists = [
    dashboard,
    work_report,
    report_form,
    holiday,
    report_permission,
  ];

  const authNavlink = [
    {
      authorized: true,
      title: "User", //ADMIN PROTECTED
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
      authorized: true,
      title: "Establistment", //ADMIN PROTECTED
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
      authorized: true,
      title: "Department", //ADMIN PROTECTED
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
  ];
  const navList = [...commonNavLists, ...authNavlink]; // ...(isAuthorized ? authNavlink : [])

  return (
    <>
      {navList.map((nav, idx) => {
        if (nav.authorized) {
          if (isAuthorized) {
            return (
              <GroupLink
                key={nav.title}
                {...{ ...nav, isAuthorized, setExpand, expand, idx }}
              />
            );
          }
        } else {
          return (
            <GroupLink
              key={nav.title}
              {...{ ...nav, isAuthorized, setExpand, expand, idx }}
            />
          );
        }
      }) || ""}
    </>
  );
}

const GroupLink = ({
  idx,
  title,
  Icon,
  href,
  items,
  expand,
  setExpand,
  isAuthorized,
}) => (
  <div className={`space-y-4 nav-group-${idx} nav-group-item`}>
    <div
      className="flex-1 space-y-2"
      onClick={() => {
        if (!items?.length) return;
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
        {(Icon && <Icon className={{ "rotate-180": expand === idx }} />) || ""}
      </Link>
    </div>
    <div
      className={cn("transition-all duration-200", {
        block: idx === expand,
        hidden: idx !== expand,
      })}
    >
      {items?.map?.((item) => {
        if (item.authorized) {
          if (isAuthorized) {
            return <LINK key={`${title}.${item.title}`} {...item} />;
          }
        } else return <LINK key={`${title}.${item.title}`} {...item} />;
      })}
    </div>
    <hr className="border-gray-200" />
  </div>
);
const LINK = ({ href, title }) => (
  <Link
    to={href}
    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
  >
    <AnalyticsIcon />
    {title}
  </Link>
);
