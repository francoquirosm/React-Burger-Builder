import React, { useEffect } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
});

export default connect(null, mapDispatchToProps)(Logout);

// class Logout extends Component {
//   componentDidMount() {
//     this.props.onLogout();
//   }
//   render() {
//     return <Redirect to="/" />;
//   }
// }
