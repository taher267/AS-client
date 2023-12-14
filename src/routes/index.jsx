import { Navigate, useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";

// const routeStr = '/expired';
export default function ThemeRoutes() {
  const routes = [AuthRoutes, MainRoutes];

  return useRoutes(routes);
}
