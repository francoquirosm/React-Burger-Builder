import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Aux from "../../hoc/Aux";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Loader from "../../components/UI/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    //   axios
    //     .get(
    //       "https://react-my-burger-9dcde-default-rtdb.firebaseio.com/ingredients.json"
    //     )
    //     .then((response) => {
    //       this.setState({ ingredients: response.data });
    //     })
    //     .catch((error) => {
    //       this.setState({ error: true });
    //     });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce(
      (total, current) => total + current,
      0
    );
    return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Loader />;

    let burger = this.state.error ? (
      <p>Ingredients could not be loaded </p>
    ) : (
      <Loader />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = this.state.loading ? (
        <Loader />
      ) : (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ings: state.ingredients,
  price: state.totalPrice,
});
const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) =>
    dispatch({ type: actionTypes.ADD_INGREDIENTS, payload: ingName }),
  onIngredientRemoved: (ingName) =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENTS, payload: ingName }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
