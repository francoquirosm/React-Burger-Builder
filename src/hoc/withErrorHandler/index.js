import React, { Component } from "react";
import Modal from "../../components/UI/Modal";
import Aux from "../Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      axios.interceptors.request.use(() => {
        this.setState({ error: null });
      });
      axios.interceptors.response.use(
        (_) => {},
        (error) => {
          this.setState({ error });
        }
      );
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            closeModal={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : ""}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
