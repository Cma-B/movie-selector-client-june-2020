import React, { Component } from 'react'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import { storeAuthCredentials, getAuthHeaders } from "../modules/auth"
import axios from "axios";


class PaymentForm extends Component {
  state = {
    renderForm: false,
    message: null
  }

  payWithStripe = async (event) => {
    event.preventDefault()
    let stripeResponse = await this.props.stripe.createToken()

    stripeResponse.token && (
      this.performPayment(stripeResponse.token)
    )
  }

  performPayment = async (stripeToken) => {
    let headers = await getAuthHeaders();

    let response = await axios.post("/subscriptions", {
      stripeToken: stripeToken
    }, {
      headers: headers
    })

    if (response.data.paid == true) {
      this.props.userIsSubscriber()
    }
  }

  render() {
    let form = this.state.renderForm ? (
      <form onSubmit={this.payWithStripe} id="payment-form">
        <label>Card number </label>
        <CardNumberElement />

        <label>Expiry Date</label>
        <CardExpiryElement />

        <label>CVC</label>
        <CardCVCElement />

        <button id="submit-payment" type="submit">Submit</button>
      </form>
    ) : (
        <button id="become-subscriber" onClick={() => this.setState({ renderForm: true })}>Become a subsriber!</button>
      )

    return (
      <div>
        {form}
      </div>
    )
  }
}

export default injectStripe(PaymentForm)
