import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import config from "../config";

import Home from "../pages/Public/Home";
import Login from "../pages/Public/Login";
import Signup from "../pages/Public/Signup";
import Test from "../pages/Test";
import Profile from "../pages/Consumer/Profile";
import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminUsers from "../pages/Admin/Users/Users";
import AdminSettings from "../pages/Admin/Settings/Settings";
import AdminAnalitics from "../pages/Admin/Analitics/Analitics";
import AdminCalendar from "../pages/Admin/Calendar/Calendar";
import AdminMessages from "../pages/Admin/Messages/Messages";

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
  {
    path: config.routes.admin.users,
    component: AdminUsers,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.analitics,
    component: AdminAnalitics,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.calendar,
    component: AdminCalendar,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.messages,
    component: AdminMessages,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.settings,
    component: AdminSettings,
    layout: AdminLayout,
  },
];

export { publicRoutes, consumerRoutes, vendorRoutes, adminRoutes };
