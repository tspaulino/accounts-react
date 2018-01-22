import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { formErrorHandler } from '../../utils/errors'
import Auth from './Auth'
import SignInForm from './SignInForm'

export const SignIn = (props) => {
  const { actions } = props
  const handleSubmit = data => actions.signIn(data).catch(formErrorHandler)
  const handleSubmitFail = (validationError, dispatch, submitError) => {
    if (validationError && !submitError) actions.emitAlert('fieldErrors')
    if (validationError.formError) actions.emitAlert({ message: validationError.formError })
    if (validationError.user) actions.emitAlert({ message: validationError.user[0] })
  }

  return (
    <Segment stacked>
      <div className="auth-signin">
        <Header size="large">Sign In</Header>
        <SignInForm onSubmit={handleSubmit} onSubmitFail={handleSubmitFail} />
      </div>
    </Segment>
  )
}

SignIn.propTypes = {
  actions: PropTypes.shape({
    signIn: PropTypes.func.isRequired,
    emitAlert: PropTypes.func.isRequired
  }).isRequired
}

export default Auth(SignIn)
