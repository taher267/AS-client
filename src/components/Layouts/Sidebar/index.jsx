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
import CubeIcon from "../../../Icons/CubeIcon";
import classes from "./sidebar.module.css";
import DocumentIcon from "../../../Icons/DocumentIcon";
import TableIcon from "../../../Icons/TableIcon";
import BellSlashIcon from "../../../Icons/BellSlashIcon";
import HandRaisedIcon from "../../../Icons/HandRaisedIcon";
import WindowIcon from "../../../Icons/WindowIcon";
import BuildingIcon from "../../../Icons/buildingIcon";
import UsersIcon from "../../../Icons/UsersIcon";

export default function () {
  const { isAuthorized, isObserved } = useAuth();
  const [expand, setExpand] = React.useState(-1);

  const dashboard = {
    authorized: false,
    title: "Dashboard",
    Icon: CubeIcon,
    href: DASHBOARD_PATH,
  };
  const work_report = {
    title: "Work Report",
    Icon: DocumentIcon,
    href: "#", // WORK_REPORT_PATH,
    items: [
      {
        authorized: true,
        title: "All",
        // Icon: <DocumentIcon />,
        href: `${WORK_REPORT_PATH}`,
      },
      {
        title: "Self",
        // Icon: <AnalyticsIcon />,
        href: `${WORK_REPORT_PATH}/self`,
      },
    ],
  };

  const report_form = {
    authorized: true,
    title: "Report Form",
    Icon: TableIcon,
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
    Icon: BellSlashIcon,
    // href: HOLIDAY_PATH,
    items: [
      {
        authorized: true,
        title: "All",
        Icon: <AnalyticsIcon />,
        href: HOLIDAY_PATH,
      },
      // {
      //   title: "Self",
      //   Icon: <AnalyticsIcon />,
      //   href: `${HOLIDAY_PATH}/self`,
      // },
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
    Icon: HandRaisedIcon,
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
        authorized: !isObserved,
        title: "Observer By",
        Icon: <AnalyticsIcon />,
        href: `${REPORT_PERMISSION_PATH}/observe-by`,
      },
      {
        authorized: true,
        title: "New",
        Icon: <AnalyticsIcon />,
        href: `${REPORT_PERMISSION_PATH}${NEW_PATH}`,
      },
    ],
  };
  const commonNavLists = [report_form, holiday, report_permission, work_report];

  const authNavlink = [
    dashboard,
    {
      authorized: true,
      title: "Establistment", //ADMIN PROTECTED
      Icon: BuildingIcon,
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
      Icon: WindowIcon,
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
      authorized: true,
      title: "User", //ADMIN PROTECTED
      Icon: UsersIcon,
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
  ];
  const navList = [...authNavlink, ...commonNavLists]; // ...(isAuthorized ? authNavlink : [])

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
        className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-300 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group ${classes.pz_sidebar_link}`}
      >
        {(Icon && (
          <Icon
            className="mr-1 text-sky-700 
          "
          />
        )) ||
          ""}
        {title}
        <DownAngleIcon className={{ "rotate-180": expand === idx }} />
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
const LINK = ({ href, title, Icon }) => (
  <Link
    to={href}
    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
  >
    {Icon}
    {title}
  </Link>
);
