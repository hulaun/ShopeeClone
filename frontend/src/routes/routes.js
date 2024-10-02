import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import config from "../config";

import Home from "../pages/Consumer/Home";
import Login from "../pages/Consumer/Login";
import Profile from "../pages/Consumer/Profile";
import Signup from "../pages/Consumer/Signup";
import Test from "../pages/Test";
import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";

const publicRoutes = [
  { path: config.routes.public.home, component: Home, layout: DefaultLayout },
  {
    path: config.routes.public.test,
    component: Test,
    layout: AuthLayout,
    headline: "Đăng nhập",
  },
  {
    path: config.routes.public.login,
    component: Login,
    layout: AuthLayout,
    headline: "Đăng nhập",
  },
  {
    path: config.routes.public.signup,
    component: Signup,
    layout: AuthLayout,
    headline: "Đăng ký",
  },
];
const consumerRoutes = [
  { path: config.routes.consumer.profile, component: Profile },
];

const vendorRoutes = [];

const adminRoutes = [
  {
    path: config.routes.admin.dashboard,
    component: AdminDashboard,
    layout: AdminLayout,
  },
];

export { publicRoutes, consumerRoutes, vendorRoutes, adminRoutes };
