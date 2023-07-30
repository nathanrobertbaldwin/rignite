import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CategoryProducts from "./components/CategoryProducts";
import ProductIndex from "./components/ProductIndex";
import ManageUser from "./components/ManageUser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path='/products/all'>
            <ProductIndex />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/category/:id">
            <CategoryProducts />
          </Route>
          <Route exact path="/users/manage">
            <ManageUser />
          </Route>
          <Route exact path="*">
            <h2>"You done goofed."</h2>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
