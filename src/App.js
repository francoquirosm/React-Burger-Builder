import React, { Component } from "react";
import Layout from "./hoc/Layout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import BurgerBuilder from "./containers/BurguerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";
import Auth from "./containers/Auth";
import Logout from "./containers/Auth/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
  render() {
    const authRoutes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );

    const nonAuthRoutes = (
      <Switch>
        <Route path="/auth" component={Auth} />
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
