import React, { Component } from "react";
import Burger from "../../components/Burger";
import Aux from "../../hoc/Aux";

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build control</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
