import React, { useEffect, lazy, Suspense } from "react";
import Layout from "./hoc/Layout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import BurgerBuilder from "./containers/BurguerBuilder";
import Logout from "./containers/Auth/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions";

const Checkout = lazy(() => {
  return import("./containers/Checkout");
});

const Orders = lazy(() => {
  return import("./containers/Orders");
});

const Auth = lazy(() => {
  return import("./containers/Auth");
});

const App = (props) => {
  const { onTryAutoSignIn } = props;
  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn]);
  const authRoutes = (
    <Switch>
      <Route path="/checkout" render={(props) => <Checkout {...props} />} />
      <Route path="/orders" render={(props) => <Orders {...props} />} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/logout" render={(props) => <Logout {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  const nonAuthRoutes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {props.isAuthenticated ? authRoutes : nonAuthRoutes}
        </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});
const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignIn: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
