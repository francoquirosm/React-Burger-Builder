import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};
const purchaseInit = (state) => {
  return updateObject(state, {
    purchased: false,
  });
};
const purchaseBurgerSuccess = (state, data) => {
  const newOrder = updateObject(data.orderData, {
    id: data.id,
  });
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};
const purchaseBurgerFailed = (state) => {
  return updateObject(state, { loading: false });
};
const purchaseBurgerStart = (state) => {
  return updateObject(state, { loading: true });
};
const fetchOrdersStart = (state) => {
  return updateObject(state, { loading: true });
};
const fetchOrdersSuccess = (state, orders) => {
  return updateObject(state, { orders, loading: false });
};
const fetchOrdersFailed = (state) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action.payload);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action.payload);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state);
    default:
      return state;
  }
};

export default reducer;
