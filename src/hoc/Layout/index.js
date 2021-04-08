import React, { useState } from "react";
import Aux from "../Aux";
import classes from "./styles.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => setShowSideDrawer(false);
  const sideDrawerToggleHandler = () => setShowSideDrawer(!showSideDrawer);

  return (
    <Aux>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        isOpen={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children} </main>
    </Aux>
  );
};
// class Layout extends Component {
//   state = {
//     showSideDrawer: false,
//   };

//   sideDrawerClosedHandler = () => {
//     this.setState({ showSideDrawer: false });
//   };

//   sideDrawerToggleHandler = () => {
//     this.setState((prevState) => ({
//       showSideDrawer: !prevState.showSideDrawer,
//     }));
//   };
//   render() {
//     return (
//       <Aux>
//         <Toolbar
//           isAuthenticated={this.props.isAuthenticated}
//           drawerToggleClicked={this.sideDrawerToggleHandler}
//         />
//         <SideDrawer
//           isAuthenticated={this.props.isAuthenticated}
//           isOpen={this.state.showSideDrawer}
//           closed={this.sideDrawerClosedHandler}
//         />
//         <main className={classes.Content}>{this.props.children} </main>
//       </Aux>
//     );
//   }
// }

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});
export default connect(mapStateToProps)(Layout);
