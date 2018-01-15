import React, { Fragment } from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import Auth from './Auth'
import SignInForm from './SignInForm'

export const SignIn = (props) => {
  const { actions } = props
  const handleSubmit = data => actions.signIn(data)
  const handleSubmitFail = () => actions.emitAlert('emptyFields')

  return (
    <Fragment>
      <Segment stacked>
        <div className="auth-signin">
          <Header size="large">Sign In</Header>
          <SignInForm onSubmit={handleSubmit} onSubmitFail={handleSubmitFail} />
        </div>
      </Segment>
    </Fragment>
  )
}

SignIn.propTypes = {
  actions: PropTypes.shape({
    signIn: PropTypes.func.isRequired,
    emitAlert: PropTypes.func.isRequired
  }).isRequired
}

export default Auth(SignIn)
