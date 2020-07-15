import React, { Component } from 'react';
import Authentication from "./Components/Authentication";
import MovieSearch from "./Components/MovieSearch";
import PaymentForm from "./Components/PaymentForm";
import { Elements } from "react-stripe-elements";


class App extends Component {
  state = {
    authenticated: false
  }

  setAuthenticated = (subscriber) => {
    this.setState({ authenticated: true, subscriber: subscriber })
  }

  render() {
    let authentication
    this.state.authenticated ? (
      authentication = (
        <>
          <p id="message">You are currently logged in as {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
          {this.state.subscriber ? (
            <p id="payment-message">You currently have an active subscription</p>
          ) : (
              <Elements>
                <PaymentForm
                  userIsSubscriber={() => this.setState({ subscriber: true })}
                />
              </Elements>
            )}
        </>
      )
    ) : (
        authentication = (
          <Authentication
            setAuthenticated={this.setAuthenticated}
          />
        )
      )

    return (
      <>
        {authentication}
        <h1>Movie selector</h1>
        <MovieSearch
          authenticated={this.state.authenticated}
        />
      </>
    );
  };
}
export default App;