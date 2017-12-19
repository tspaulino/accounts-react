import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

import Auth from './Auth'
import SignInForm from './SignInForm'

export const SignIn = () => {
  const handleSubmit = values => console.log(values)

  return (
    <Segment stacked>
      <div className="auth-signin">
        <Header size="large">Sign In</Header>

        <SignInForm onSubmit={handleSubmit} />
      </div>
    </Segment>
  )
}

export default Auth(SignIn)
