import React from "react";
import { Switch } from "react-router";
import 'rsuite/dist/styles/rsuite-default.min.css';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import './styles/main.scss';
import { ProfileProvider } from "./context/profile.context";

function App() {
  // ProfileProvider is a context Api that manage the profile
  return (
    <ProfileProvider> 
      <Switch>
        <PublicRoute path="/signin">
          <Signin />
        </PublicRoute>

        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
