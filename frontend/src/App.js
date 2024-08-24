import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
