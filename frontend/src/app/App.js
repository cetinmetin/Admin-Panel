import React, { useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import setAuthToken from "../helper/SetAuthToken";
import store from "../redux/store";
import { loadUser } from "../redux/actions/auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          {/* <Route exact path='/' element={<LoginScreen />} />
          <Route path="/sign-in" element={<LoginScreen />} />
          <Route path="/sign-up" component={SignUp} /> */}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
