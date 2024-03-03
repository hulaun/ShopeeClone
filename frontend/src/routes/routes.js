import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";
import Test from "../pages/Test";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  {
    path: config.routes.test,
    component: Test,
    layout: AuthLayout,
    headline: "Đăng nhập",
  },
  {
    path: config.routes.login,
    component: Login,
    layout: AuthLayout,
    headline: "Đăng nhập",
  },
  {
    path: config.routes.signup,
    component: Signup,
    layout: AuthLayout,
    headline: "Đăng ký",
  },
];
const privateRoutes = [{ path: config.routes.profile, component: Profile }];

export { publicRoutes, privateRoutes };
