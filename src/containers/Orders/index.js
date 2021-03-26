import React, { Component } from "react";
import Order from "../../components/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    let orders = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))
    );

    return <div>{orders}</div>;
  }
}
const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(actions.fetchOrders()),
});
const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
