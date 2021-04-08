import React from "react";
import Modal from "../../components/UI/Modal";
import Aux from "../Aux";
import { useHttpErrorHandler } from "../../hooks";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={error} closeModal={clearError}>
          {error ? error.message : ""}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

// const withErrorHandler = (WrappedComponent, axios) => {
//   return class extends Component {
//     state = {
//       error: null,
//     };
//     componentWillMount() {
//       this.requestInterceptor = axios.interceptors.request.use((request) => {
//         this.setState({ error: null });
//         return request;
//       });
//       this.responseInterceptor = axios.interceptors.response.use(
//         (response) => response,
//         (error) => {
//           this.setState({ error });
//         }
//       );
//     }
//     componentWillUnmount() {
//       axios.interceptors.request.eject(this.requestInterceptor);
//       axios.interceptors.response.eject(this.responseInterceptor);
//     }
//     errorConfirmedHandler = () => {
//       this.setState({ error: null });
//     };
//     render() {
//       return (
//         <Aux>
//           <Modal
//             show={this.state.error}
//             closeModal={this.errorConfirmedHandler}
//           >
//             {this.state.error ? this.state.error.message : ""}
//           </Modal>
//           <WrappedComponent {...this.props} />
//         </Aux>
//       );
//     }
//   };
// };

export default withErrorHandler;
