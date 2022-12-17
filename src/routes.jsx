import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import ProductDetail from "./components/product/product_detail/ProductDetail";
import ProtectAuthRoutes from "./components/protect/Protect_auth_routes";
import ProtectRoute from "./components/protect/Protect_route";
import Sidebar from "./components/sidebar/Sidebar";
import AddProduct from "./pages/add_product/AddProduct";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Signup from "./pages/auth/Signup";
import EditProduct from "./pages/edit_product/EditProduct";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

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
  {
    path: "/add-product",
    element: (
      <ProtectRoute>
        <Sidebar>
          <Layout>
            <AddProduct />
          </Layout>
        </Sidebar>
      </ProtectRoute>
    ),
  },
  {
    path: "/product/:prodId",
    element: (
      <ProtectRoute>
        <Sidebar>
          <Layout>
            <ProductDetail />
          </Layout>
        </Sidebar>
      </ProtectRoute>
    ),
  },
  {
    path: "/edit-product/:prodId",
    element: (
      <ProtectRoute>
        <Sidebar>
          <Layout>
            <EditProduct />
          </Layout>
        </Sidebar>
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectRoute>
        <Sidebar>
          <Layout>
            <Profile />
          </Layout>
        </Sidebar>
      </ProtectRoute>
    ),
  },
]);

export default routes;
