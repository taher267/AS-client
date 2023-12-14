/* eslint-disable prettier/prettier */
import { lazy } from "react";
// project imports
import { SIGNIN_PATH, SIGNUP_PATH } from "../config";
import GuestGuard from "../utils/route-guard/GuestGuard";
import Loadable from "../components/Loadable";
import Layouts from "../components/Layouts";

const Signup = Loadable(lazy(() => import("../components/Signup")));
const Signin = Loadable(lazy(() => import("../components/Signin")));

// ==============================|| AUTH ROUTING ||============================== //

const AuthRoutes = {
  path: "/",
  element: (
    <>
      {/* <NavMotion> */}
      <GuestGuard>
        <Layouts />
      </GuestGuard>
      {/* </NavMotion> */}
    </>
  ),
  children: [
    {
      path: SIGNIN_PATH,
      element: <Signin />,
    },
    {
      path: SIGNUP_PATH,
      element: <Signup />,
    },
  ],
};

export default AuthRoutes;
