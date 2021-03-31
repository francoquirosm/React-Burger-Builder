import React, { Component } from "react";
import Layout from "./hoc/Layout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import BurgerBuilder from "./containers/BurguerBuilder";
import Logout from "./containers/Auth/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import asyncComponent from "./hoc/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
  render() {
    const authRoutes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    const nonAuthRoutes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          {this.props.isAuthenticated ? authRoutes : nonAuthRoutes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});
const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignIn: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
