/* eslint-disable prettier/prettier */
import { lazy } from "react";
// project imports
import Layouts from "../components/Layouts";
import { DASHBOARD_PATH } from "../config";
import AuthGuard from "../utils/route-guard/AuthGuard";
import Loadable from "../components/Loadable";

const Dashboard = Loadable(lazy(() => import("../components/Dashboard")));
const Home = Loadable(lazy(() => import("../components/Home")));
const Form = Loadable(lazy(() => import("../components/Form")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <Layouts />
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
    // {
    //   path: "/paddle",
    //   element: <PaddleDeal />,
    // },
    // {
    //   path: "/deal/edit/:dealId",
    //   element: <UpdateDeal />,
    // },
    // {
    //   path: "/resource/:dealId",
    //   element: <Resource />,
    // },
    // {
    //   path: "/subscription",
    //   element: <Subscription />,
    // },
    // {
    //   path: "/settings",
    //   element: <Settings />,
    // },
    // {
    //   path: "/expired",
    //   element: <Expired />,
    // },
  ],
};

export default MainRoutes;
