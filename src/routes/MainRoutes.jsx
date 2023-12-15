/* eslint-disable prettier/prettier */
import { lazy } from "react";
// project imports
import AuthLayout from "../components/Layouts/Auth";
import {
  DASHBOARD_PATH,
  DEPARTMENT_PATH,
  ESTABLISHMENT_PATH,
  NEW_PATH,
} from "../config";
import AuthGuard from "../utils/route-guard/AuthGuard";
import Loadable from "../components/Loadable";

const Dashboard = Loadable(lazy(() => import("../components/Dashboard")));
const Home = Loadable(lazy(() => import("../components/Home")));
const Form = Loadable(lazy(() => import("../components/Form")));
const Establishment = Loadable(lazy(() => import("../pages/Establishment")));
const NewEstablishment = Loadable(
  lazy(() => import("../pages/Establishment/NewEstablishment"))
);
const Department = Loadable(lazy(() => import("../pages/Department")));
const NewDepartment = Loadable(
  lazy(() => import("../pages/Department/NewDepartment"))
);

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
      path: ESTABLISHMENT_PATH,
      element: <Establishment />,
    },
    {
      path: `${ESTABLISHMENT_PATH}${NEW_PATH}/`,
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
    // {
    //   path: "/subscription",
    //   element: <Subscription />,
    // },
    // {
    //   path: "/settings",
    //   element: <Settings />,
    // },
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   path: "/expired",
    //   element: <Expired />,
    // },
  ],
};

export default MainRoutes;
