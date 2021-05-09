import React, { Suspense } from "react";
import { GlobalStyles } from "../src/Global/GlobalStyles";
import Form from "./Components/Form";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "../src/contex/AuthContex";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const SignUp = React.lazy(() => import("./Components/Signup"));
const LogIn = React.lazy(() => import("./Components/LogIn"));
const ForgotPassword = React.lazy(() => import("./Components/ForgotPassword"));

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <AuthProvider>
          <Switch>
            <Suspense fallback={<div>Wczytywanie...</div>}>
              <PrivateRoute exact path="/" component={Form} />
              <Route path="/rejestracja" component={SignUp} />
              <Route path="/logowanie" component={LogIn} />
              <Route path="/reset-hasla" component={ForgotPassword} />
            </Suspense>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
