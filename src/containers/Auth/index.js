import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import classes from "./styles.css";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner";
import { Redirect } from "react-router";
import { updateObject, checkValidity } from "../../utility";

const Auth = ({
  isBuildingBurger,
  authRedirectPath,
  onAuth,
  loading,
  error,
  isAuthenticated,
  onSetAuthRedirectPath,
}) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!isBuildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [isBuildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      inputtype={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangeHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }

  const authRedirect = isAuthenticated ? (
    <Redirect to={authRedirectPath} />
  ) : null;
  const errorMsg = !!error ? <p>{error}</p> : null;

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMsg}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthHandler}>
        GO TO {isSignUp ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  isBuildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(actions.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

// class Auth extends Component {
//   state = {
//     controls: {
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           placeholder: "Email",
//         },
//         value: "",
//         validation: {
//           required: true,
//           isEmail: true,
//         },
//         valid: false,
//         touched: false,
//       },
//       password: {
//         elementType: "input",
//         elementConfig: {
//           type: "password",
//           placeholder: "Password",
//         },
//         value: "",
//         validation: {
//           required: true,
//           minLength: 6,
//         },
//         valid: false,
//         touched: false,
//       },
//     },
//     isSignUp: true,
//   };

//   componentDidMount() {
//     if (!this.props.isBuildingBurger && this.props.authRedirectPath !== "/") {
//       this.props.onSetAuthRedirectPath();
//     }
//   }

//   inputChangeHandler = (event, controlName) => {
//     const updatedControls = updateObject(this.state.controls, {
//       [controlName]: updateObject(this.state.controls[controlName], {
//         value: event.target.value,
//         valid: checkValidity(
//           event.target.value,
//           this.state.controls[controlName].validation
//         ),
//         touched: true,
//       }),
//     });
//     this.setState({ controls: updatedControls });
//   };

//   submitHandler = (event) => {
//     event.preventDefault();
//     this.props.onAuth(
//       this.state.controls.email.value,
//       this.state.controls.password.value,
//       this.state.isSignUp
//     );
//   };

//   switchAuthHandler = () => {
//     this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
//   };
//   render() {
//     const formElementsArray = [];
//     for (let key in this.state.controls) {
//       formElementsArray.push({
//         id: key,
//         config: this.state.controls[key],
//       });
//     }

//     let form = formElementsArray.map((formElement) => (
//       <Input
//         key={formElement.id}
//         inputtype={formElement.config.elementType}
//         elementConfig={formElement.config.elementConfig}
//         value={formElement.config.value}
//         invalid={!formElement.config.valid}
//         shouldValidate={formElement.config.validation}
//         touched={formElement.config.touched}
//         changed={(event) => this.inputChangeHandler(event, formElement.id)}
//       />
//     ));

//     if (this.props.loading) {
//       form = <Spinner />;
//     }

//     const authRedirect = this.props.isAuthenticated ? (
//       <Redirect to={this.props.authRedirectPath} />
//     ) : null;
//     const errorMsg = !!this.props.error ? <p>{this.props.error}</p> : null;
//     return (
//       <div className={classes.Auth}>
//         {authRedirect}
//         {errorMsg}
//         <form onSubmit={this.submitHandler}>
//           {form}
//           <Button btnType="Success">SUBMIT</Button>
//         </form>
//         <Button btnType="Danger" clicked={this.switchAuthHandler}>
//           GO TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
//         </Button>
//       </div>
//     );
//   }
// }
