import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Aux from "../../hoc/Aux";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2,
    },
    totalPrice: 4,
  };

  changeIngredientHandler = (type, operator) => {
    let op;
    switch (operator) {
      case "+":
        op = (a, b) => a + b;
        break;
      case "-":
        op = (a, b) => a - b;
        break;
      default:
        op = (a, b) => a + b;
        break;
    }

    const oldCount = this.state.ingredients[type];
    if (operator === "-" && oldCount === 0) {
      return;
    }
    const updatedCount = op(oldCount, 1);
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const ingredientPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = op(oldPrice, ingredientPrice);
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };
  addIngredientHandler = (type) => {
    this.changeIngredientHandler(type, "+");
  };

  removeIngredientHandler = (type) => {
    this.changeIngredientHandler(type, "-");
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
