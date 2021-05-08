import React from "react";
import { GlobalStyles } from "../src/Global/GlobalStyles";
import Form from "./Components/Form";
import { AuthProvider } from "../src/contex/AuthContex";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/Signup";

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path="/zaloguj" component={SignUp} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
