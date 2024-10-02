import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { adminRoutes, publicRoutes } from "./routes";

function App() {
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
                  <Page />
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
