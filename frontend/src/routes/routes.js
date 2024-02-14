import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Signup from "../pages/Signup"
import config from "../config"

const publicRoutes = [
  {path: config.routes.home, component: Home},
  {path: config.routes.login, component: Login},
  {path: config.routes.signup, component: Signup},
]
const privateRoutes = [
  {path: config.routes.profile, component: Profile}
]

export {publicRoutes, privateRoutes}
