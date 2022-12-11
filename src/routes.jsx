import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import ProtectAuthRoutes from "./components/protect/Protect_auth_routes";
import ProtectRoute from "./components/protect/Protect_route";
import Sidebar from "./components/sidebar/Sidebar";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <ProtectAuthRoutes>
        <Login />
      </ProtectAuthRoutes>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <ProtectAuthRoutes>
        <ResetPassword />
      </ProtectAuthRoutes>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ProtectAuthRoutes>
        <ForgotPassword />
      </ProtectAuthRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectAuthRoutes>
        <Signup />
      </ProtectAuthRoutes>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRoute>
        <Sidebar>
          <Layout>
            <Dashboard />
          </Layout>
        </Sidebar>
      </ProtectRoute>
    ),
  },
]);

export default routes;
