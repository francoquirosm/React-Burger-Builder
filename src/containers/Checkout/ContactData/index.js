import React, { useState } from "react";
import Button from "../../../components/UI/Button";
import classes from "./styles.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner";
import Input from "../../../components/UI/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler";
import * as actions from "../../../store/actions";
import { updateObject, checkValidity } from "../../../utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      value: "fastest",
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangeHandler = (event, inputId) => {
    const updatedFormElement = updateObject(orderForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputId].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputId]: updatedFormElement,
    });
    updatedOrderForm[inputId] = updatedFormElement;

    let formValidity = true;
    for (let inputId in updatedOrderForm) {
      formValidity = updatedOrderForm[inputId].valid && formValidity;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formValidity);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = props.loading ? (
    <Spinner />
  ) : (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
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
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});
const mapaDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token)),
});
export default connect(
  mapStateToProps,
  mapaDispatchToProps
)(withErrorHandler(ContactData, axios));

// class ContactData extends Component {
//   state = {
//     orderForm: {
//       name: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Your name",
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//       street: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Street",
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//       zipCode: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "ZIP",
//         },
//         value: "",
//         validation: {
//           required: true,
//           minLength: 5,
//           maxLength: 5,
//         },
//         valid: false,
//         touched: false,
//       },
//       country: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Country",
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           placeholder: "Email",
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//       deliveryMethod: {
//         elementType: "select",
//         elementConfig: {
//           options: [
//             { value: "fastest", displayValue: "Fastest" },
//             { value: "cheapest", displayValue: "Cheapest" },
//           ],
//         },
//         validation: {},
//         value: "fastest",
//         valid: true,
//       },
//     },

//     formIsValid: false,
//   };

//   orderHandler = (event) => {
//     event.preventDefault();
//     const formData = {};
//     for (let formElementIdentifier in this.state.orderForm) {
//       formData[formElementIdentifier] = this.state.orderForm[
//         formElementIdentifier
//       ].value;
//     }
//     const order = {
//       ingredients: this.props.ings,
//       price: this.props.price,
//       orderData: formData,
//       userId: this.props.userId,
//     };
//     this.props.onOrderBurger(order, this.props.token);
//   };

//   inputChangeHandler = (event, inputId) => {
//     const updatedFormElement = updateObject(this.state.orderForm[inputId], {
//       value: event.target.value,
//       valid: checkValidity(
//         event.target.value,
//         this.state.orderForm[inputId].validation
//       ),
//       touched: true,
//     });

//     const updatedOrderForm = updateObject(this.state.orderForm, {
//       [inputId]: updatedFormElement,
//     });
//     updatedOrderForm[inputId] = updatedFormElement;

//     let formValidity = true;
//     for (let inputId in updatedOrderForm) {
//       formValidity = updatedOrderForm[inputId].valid && formValidity;
//     }

//     this.setState({ orderForm: updatedOrderForm, formIsValid: formValidity });
//   };

//   render() {
//     const formElementsArray = [];
//     for (let key in this.state.orderForm) {
//       formElementsArray.push({
//         id: key,
//         config: this.state.orderForm[key],
//       });
//     }
//     let form = this.props.loading ? (
//       <Spinner />
//     ) : (
//       <form onSubmit={this.orderHandler}>
//         {formElementsArray.map((formElement) => (
//           <Input
//             key={formElement.id}
//             inputtype={formElement.config.elementType}
//             elementConfig={formElement.config.elementConfig}
//             value={formElement.config.value}
//             invalid={!formElement.config.valid}
//             shouldValidate={formElement.config.validation}
//             touched={formElement.config.touched}
//             changed={(event) => this.inputChangeHandler(event, formElement.id)}
//           />
//         ))}
//         <Button btnType="Success" disabled={!this.state.formIsValid}>
//           ORDER
//         </Button>
//       </form>
//     );
//     return (
//       <div className={classes.ContactData}>
//         <h4>Enter your contact data</h4>
//         {form}
//       </div>
//     );
//   }
// }
