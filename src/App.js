import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout';
import {publicRoutes, privateRoutes} from './routes';

function App() {
  return (
  <Router>
    <div className="App">
      <Routes>
        {
          publicRoutes.map((route, index)=>{
            let Layout = DefaultLayout;
            let Page = route.component;
            return(
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page/>
                </Layout>
              }
            />)
          })
        }
      </Routes>
    </div>
  </Router>
  );
}

export default App;
