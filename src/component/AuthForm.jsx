import React from "react";
import { Button, Form, Segment, Menu, Checkbox } from "semantic-ui-react";

const AuthForm = (props) => {
  let toggleRegistrationElement = props.registration ? 
  'Do you already have an account? Click here' : 'Sign up!'

  return (
    <>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Menu position="right">
            <Menu.Item as="h4">
              <Button inverted>Log-out</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
      <Segment inverted floated="right">
        <Menu inverted pointing secondary>
          <Menu.Menu position="right">
            <Form inverted onSubmit={props.authenticate} id="login-form">
              <Form.Field>
                <label id="label">Email</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                />
              </Form.Field>
              <Form.Field>
                <label id="label">Password</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {
                    props.registration && (
                      <>
                        <label>Password confirmation</label>
                        <input name='passwordConfirmation' type='password' id='password-confirmation' />
                      </>
                    )
                }
              </Form.Field>
              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" />
              </Form.Field>
              <Form.Field>
                <Button inverted id="submit">
                  Submit
                </Button>
              </Form.Field>
            </Form>
            <button id="toggle" onClick={props.toggleRegistration}>{toggleRegistrationElement}</button>
          </Menu.Menu>
        </Menu>
      </Segment>
    </>
  );
};

export default AuthForm;
