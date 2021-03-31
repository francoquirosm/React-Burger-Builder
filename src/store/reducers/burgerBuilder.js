import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const addIngredient = (state, ingredient) => {
  const ai_updatedIngredient = {
    [ingredient]: state.ingredients[ingredient] + 1,
  };
  const ai_updatedIngredients = updateObject(
    state.ingredients,
    ai_updatedIngredient
  );
  const ai_updatedState = {
    ingredients: ai_updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredient],
    building: true,
  };
  return updateObject(state, ai_updatedState);
};

const removeIngredient = (state, ingredient) => {
  const ri_updatedIngredient = {
    [ingredient]: state.ingredients[ingredient] - 1,
  };
  const ri_updatedIngredients = updateObject(
    state.ingredients,
    ri_updatedIngredient
  );
  const ri_updatedState = {
    ingredients: ri_updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredient],
    building: true,
  };
  return updateObject(state, ri_updatedState);
};

const setIngredients = (state, ingredients) => {
  return updateObject(state, {
    ingredients: ingredients,
    error: false,
    totalPrice: initialState.totalPrice,
    building: false,
  });
};

const fetchIngredientsFailed = (state) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action.payload);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action.payload);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action.payload);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
