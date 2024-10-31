import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { adminRoutes, publicRoutes } from "./routes";
import config from "./config";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAdmin } = useAuth();

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = route.layout;
          let Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout {...(route.headline && { headline: route.headline })}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {adminRoutes.map((route, index) => {
          let Layout = route.layout;
          let Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  {!isAdmin() ? (
                    <Navigate to={config.routes.public.login} />
                  ) : (
                    <Page />
                  )}
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
