import React, { Component } from "react";
import Layout from "./hoc/Layout";
import { Route, Switch } from "react-router-dom";
import BurgerBuilder from "./containers/BurguerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
