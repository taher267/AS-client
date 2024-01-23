/* eslint-disable prettier/prettier */
import { lazy } from "react";
// project imports
import AuthLayout from "../components/Layouts/Auth";
import {
  DASHBOARD_PATH,
  DEPARTMENT_PATH,
  ESTABLISHMENT_PATH,
  HOLIDAY_PATH,
  NEW_PATH,
  REPORT_FORM_PATH,
  REPORT_FORM_SUBMISSION_PATH,
  REPORT_PERMISSION_PATH,
  USER_PATH,
  WORK_REPORT_PATH,
} from "../config";
import AuthGuard from "../utils/route-guard/AuthGuard";
import Loadable from "../components/Loadable";
import NotFound from "../pages/Error/404";

const Dashboard = Loadable(lazy(() => import("../components/Dashboard")));
const Home = Loadable(lazy(() => import("../components/Home")));
const Form = Loadable(lazy(() => import("../components/Form")));

const User = Loadable(lazy(() => import("../pages/User")));
const NewUser = Loadable(lazy(() => import("../pages/User/NewUser")));

const Establishment = Loadable(lazy(() => import("../pages/Establishment")));
const NewEstablishment = Loadable(
  lazy(() => import("../pages/Establishment/NewEstablishment"))
);
const Department = Loadable(lazy(() => import("../pages/Department")));
const NewDepartment = Loadable(
  lazy(() => import("../pages/Department/NewDepartment"))
);
const ReportForm = Loadable(lazy(() => import("../pages/ReportForm")));
const SelfReportForm = Loadable(
  lazy(() => import("../pages/ReportForm/SelfReportForm"))
);
const NewReportForm = Loadable(
  lazy(() => import("../pages/ReportForm/NewReportForm"))
);
const WorkReportSubmission = Loadable(
  lazy(() => import("../pages/WorkReport/Submission"))
);
const SelfWorkReport = Loadable(lazy(() => import("../pages/WorkReport/Self")));
const WorkReport = Loadable(lazy(() => import("../pages/WorkReport")));
const ReportPermission = Loadable(
  lazy(() => import("../pages/ReportPermission"))
);
const NewReportPermission = Loadable(
  lazy(() => import("../pages/ReportPermission/NewReportPermission"))
);
const SelfReportPermission = Loadable(
  lazy(() => import("../pages/ReportPermission/Self"))
);
const ObserveByReportPermission = Loadable(
  lazy(() => import("../pages/ReportPermission/ObserveBy"))
);
const SingleReportPermissionWorkReport = Loadable(
  lazy(() => import("../pages/WorkReport/SingleReportPermissionWorkReport"))
);
const Holiday = Loadable(lazy(() => import("../pages/Holiday")));
const NewHoliday = Loadable(lazy(() => import("../pages/Holiday/NewHoliday")));

// const NotFound = Loadable(lazy(() => import("../pages/Error/404")));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <AuthLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: DASHBOARD_PATH, // this url adjusted with after subscribe redirect
      element: <Dashboard />,
    },
    {
      path: "/form",
      element: <Form />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: USER_PATH,
      element: <User />,
    },
    {
      path: `${USER_PATH}${NEW_PATH}/`,
      element: <NewUser />,
    },
    {
      path: ESTABLISHMENT_PATH,
      element: <Establishment />,
    },
    {
      path: `${ESTABLISHMENT_PATH}${NEW_PATH}`,
      element: <NewEstablishment />,
    },

    {
      path: DEPARTMENT_PATH,
      element: <Department />,
    },
    {
      path: `${DEPARTMENT_PATH}${NEW_PATH}`,
      element: <NewDepartment />,
    },
    {
      path: REPORT_FORM_PATH,
      element: <ReportForm />,
    },
    {
      path: `${REPORT_FORM_PATH}/self`,
      element: <SelfReportForm />,
    },
    {
      path: `${REPORT_FORM_PATH}${NEW_PATH}`,
      element: <NewReportForm />,
    },
    {
      path: `${REPORT_FORM_PATH}/self`,
      element: <SelfReportForm />,
    },
    {
      path: REPORT_PERMISSION_PATH,
      element: <ReportPermission />,
    },
    {
      path: `${REPORT_PERMISSION_PATH}/self`,
      element: <SelfReportPermission />,
    },
    {
      path: `${REPORT_PERMISSION_PATH}${NEW_PATH}`,
      element: <NewReportPermission />,
    },
    {
      path: `${REPORT_PERMISSION_PATH}${`/observe-by`}`,
      element: <ObserveByReportPermission />,
    },

    {
      path: WORK_REPORT_PATH,
      element: <WorkReport />,
    },
    {
      path: `${WORK_REPORT_PATH}/self`,
      element: <SelfWorkReport />,
    },
    {
      path: `${WORK_REPORT_PATH}/:id${REPORT_FORM_SUBMISSION_PATH}`,
      element: <WorkReportSubmission />,
    },
    {
      path: `${WORK_REPORT_PATH}/report-permission/:report_prmission_id/report-form/:report_form_id`,
      element: <SingleReportPermissionWorkReport />,
    },
    {
      path: HOLIDAY_PATH,
      element: <Holiday />,
    },
    {
      path: `${HOLIDAY_PATH}${NEW_PATH}`,
      element: <NewHoliday />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    // {
    //   path: "/expired",
    //   element: <Expired />,
    // },
  ],
};

export default MainRoutes;
