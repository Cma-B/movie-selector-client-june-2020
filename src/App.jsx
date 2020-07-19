import React, { Component } from "react";
import Movie from "./component/movie/Movie";
import Auth from "./component/Auth";
import PaymentForm from "./component/PaymentForm";
import { Elements } from "react-stripe-elements";

class App extends Component {
  state = {
    authenticated: false,
    subscriber: false
  };

  setAuthenticated = (subscriber) => {
    this.setState({ authenticated: true, subscriber: subscriber });
  };
  render() {
    let login;
    this.state.authenticated
      ? (login = (
          <>
            <p id="message">
              {" "}
              Welcome, {JSON.parse(sessionStorage.getItem("credentials")).uid} !
            </p>
            {!this.state.subscriber && (
              <Elements>
                <PaymentForm
                userIsSubscriber={this.setState({subscriber: true})}
                />
              </Elements>
            )}
          </>
        ))
      : (login = <Auth setAuthenticated={this.setAuthenticated} />);

    return (
      <>
        <div>{login}</div>
        <div>
          <Movie authenticated={this.state.authenticated} />
        </div>
      </>
    );
  }
}

export default App;
