import React, { Component } from "react";
import axios from "axios";
import { storeAuthCredentials } from "../modules/auth";
import AuthForm from "./AuthForm";
import { Segment, Menu, Button } from "semantic-ui-react";

class Auth extends Component {
  state = {
    renderForm: false,
  };

  authenticate = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post("/auth/sign_in", {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      await storeAuthCredentials(response);
      this.props.setAuthenticated(response.data.data.subscriber);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let button;
    let form;

    this.state.renderForm
      ? (form = <AuthForm authenticate={this.authenticate} />)
      : (button = (
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Menu position="right">
              <Menu.Item as="h4">
                <Button
                  inverted
                  id="login"
                  onClick={() => this.setState({ renderForm: true })}
                >
                  Log-in
                  </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
      ));

    return (
      <div>
        {button}
        {form}
      </div>
    );
  }
}

export default Auth;