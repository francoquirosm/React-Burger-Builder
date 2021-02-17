import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Aux from "../../hoc/Aux";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios-orders";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce(
      (total, current) => total + current,
      0
    );
    this.setState({ purchasable: !!sum });
  }

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
    this.updatePurchaseState(updatedIngredients);
  };
  addIngredientHandler = (type) => {
    this.changeIngredientHandler(type, "+");
  };

  removeIngredientHandler = (type) => {
    this.changeIngredientHandler(type, "-");
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert("You continued");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Franco",
        address: { street: "Av04", zipCode: "555055", country: "Costa Rica" },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
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
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
