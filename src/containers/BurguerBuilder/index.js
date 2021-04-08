import React, { useCallback, useEffect, useState } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Aux from "../../hoc/Aux";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Loader from "../../components/UI/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    []
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce(
      (total, current) => total + current,
      0
    );
    return sum > 0;
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };
  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };
  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = <Loader />;

  let burger = error ? <p>Ingredients could not be loaded </p> : <Loader />;
  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuthenticated={isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={price}
      />
    );
  }
  return (
    <Aux>
      <Modal show={purchasing} closeModal={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);

// export class BurgerBuilder extends Component {
//   state = {
//     purchasing: false,
//   };

//   componentDidMount() {
//     this.props.onInitIngredients();
//   }

//   updatePurchaseState(ingredients) {
//     const sum = Object.values(ingredients).reduce(
//       (total, current) => total + current,
//       0
//     );
//     return sum > 0;
//   }

//   purchaseCancelHandler = () => {
//     this.setState({ purchasing: false });
//   };
//   purchaseContinueHandler = () => {
//     this.props.onInitPurchase();
//     this.props.history.push("/checkout");
//   };
//   purchaseHandler = () => {
//     if (this.props.isAuthenticated) {
//       this.setState({ purchasing: true });
//     } else {
//       this.props.onSetAuthRedirectPath("/checkout");
//       this.props.history.push("/auth");
//     }
//   };
//   render() {
//     const disabledInfo = {
//       ...this.props.ings,
//     };
//     for (let key in disabledInfo) {
//       disabledInfo[key] = disabledInfo[key] <= 0;
//     }

//     let orderSummary = <Loader />;

//     let burger = this.props.error ? (
//       <p>Ingredients could not be loaded </p>
//     ) : (
//       <Loader />
//     );
//     if (this.props.ings) {
//       burger = (
//         <Aux>
//           <Burger ingredients={this.props.ings} />
//           <BuildControls
//             ingredientAdded={this.props.onIngredientAdded}
//             ingredientRemoved={this.props.onIngredientRemoved}
//             disabled={disabledInfo}
//             price={this.props.price}
//             purchasable={this.updatePurchaseState(this.props.ings)}
//             ordered={this.purchaseHandler}
//             isAuthenticated={this.props.isAuthenticated}
//           />
//         </Aux>
//       );
//       orderSummary = (
//         <OrderSummary
//           ingredients={this.props.ings}
//           purchaseCancelled={this.purchaseCancelHandler}
//           purchaseContinued={this.purchaseContinueHandler}
//           price={this.props.price}
//         />
//       );
//     }
//     return (
//       <Aux>
//         <Modal
//           show={this.state.purchasing}
//           closeModal={this.purchaseCancelHandler}
//         >
//           {orderSummary}
//         </Modal>
//         {burger}
//       </Aux>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   ings: state.burgerBuilder.ingredients,
//   price: state.burgerBuilder.totalPrice,
//   error: state.burgerBuilder.error,
//   isAuthenticated: state.auth.token !== null,
// });
// const mapDispatchToProps = (dispatch) => ({
//   onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//   onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//   onInitIngredients: () => {
//     dispatch(actions.initIngredients());
//   },
//   onInitPurchase: () => dispatch(actions.purchaseInit()),
//   onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
// });
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios));
