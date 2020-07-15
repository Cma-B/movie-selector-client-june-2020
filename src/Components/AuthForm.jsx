import React from 'react';

const AuthForm = (props) => {
  let toggleRegistrationElement = props.registration ? 
  'Do you already have an account? Click here' : 'Sign up!'

  return (
    <>
      <form onSubmit={props.authenticate} id='auth-form'>
        <label>Email</label>
        <input name='email' type='email' id='email' />
        <label>Password</label>
        <input name='password' type='password' id='password' />
        {
          props.registration && (
            <>
              <label>Password confirmation</label>
              <input name='passwordConfirmation' type='password' id='password-confirmation' />
            </>
          )
        }
        <button id='submit'>Submit</button>
      </form>
      <button id="toggle" onClick={props.toggleRegistration}>{toggleRegistrationElement}</button>
    </>
  )
}
export default AuthForm