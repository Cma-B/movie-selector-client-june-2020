import React, { Component } from "react";
import axios from "axios";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import { getAuthHeaders } from "../modules/auth";
import { Button, Form, Segment, Menu } from "semantic-ui-react";

class PaymentForm extends Component {
  state = {
    renderForm: false,
    message: null,
  };

  payWithStripe = async (event) => {
    event.preventDefault();
    let stripeResponse = await this.props.stripe.createToken();

    stripeResponse.token && this.performPayment(stripeResponse.token);
  };

  performPayment = async (stripeToken) => {
    let headers = await getAuthHeaders();
    let response = await axios.post(
      "/subscriptions",
      {
        stripeToken: stripeToken,
      },
      {
        headers: headers,
      }
    );

    if (response.data.paid == true) {
      this.props.userIsSubscriber();
      this.setState({ message: response.data.message });
    }
  };

  render() {
    
    let form = this.state.renderForm ? (
      <Segment inverted floated="right">
    <Menu inverted pointing secondary>
      <Menu.Menu position="right">
      <Form inverted onSubmit={this.payWithStripe} id="payment-form">
      <Form.Field>
        <label>Card number</label>
        <CardNumberElement />
        </Form.Field>
        <Form.Field>
        <label>Expiry Date</label>
        <CardExpiryElement />
        </Form.Field>
        <Form.Field>
        <label>CVC</label>
        <CardCVCElement />
        </Form.Field>
        <Form.Field>

        <Button color='black' id="submit-payment" type="submit">
          Submit
        </Button>
        </Form.Field>
      </Form>
      </Menu.Menu>
        </Menu>
      </Segment>

    ) : (
      <Button color='black'
        id="become-subscriber"
        onClick={() => this.setState({ renderForm: true })}
      >
        Become a subscriber
      </Button>
    );

    let message;

    this.state.message &&
      (message = <p id="payment-message">{this.state.message}</p>);

    return (
      <div>
        {form}
        {message}
      </div>
    );
  }
}
export default injectStripe(PaymentForm);
