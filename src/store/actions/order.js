import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: { orderId: id, orderData: orderData },
});

export const purchaseBurgerFailed = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  error: error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const purchaseBurger = (orderData, token) => ({
  type: actionTypes.PURCHASE_BURGER,
  payload: { orderData, token },
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error: error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  payload: { token, userId },
});
