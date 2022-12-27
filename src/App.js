import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import PublicRoute from "./helper/PublicRoute";
import PrivateRoute from "./helper/PrivateRoute";
import Landing from "./pages/Landing";
import { Helmet } from "react-helmet";
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <PublicRoute restricted={true} path="/login" component={Login} />
          <PublicRoute restricted={true} path="/landing" component={Landing} />
          <PublicRoute restricted={true} path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <PrivateRoute path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <PublicRoute restricted={true}>
            <Redirect exact from="/" to="/landing" />
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
