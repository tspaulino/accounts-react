import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { formErrorHandler } from '../../utils/errors'
import Auth from './Auth'
import SignUpForm from './SignUpForm'

export const SignUp = (props) => {
  const { actions } = props
  const handleSubmit = data => actions.signUp(data).catch(formErrorHandler)
  const handleSubmitFail = (validationError, dispatch, submitError) => {
    if (validationError && !submitError) actions.emitAlert('fieldErrors')
    if (validationError.formError) actions.emitAlert({ message: validationError.formError })
    if (validationError && submitError && !validationError.formError) actions.emitAlert('fieldErrors')
  }

  return (
    <Segment stacked>
      <div className="auth-signup">
        <Header size="large">Sign Up</Header>
        <SignUpForm onSubmit={handleSubmit} onSubmitFail={handleSubmitFail} />
      </div>
    </Segment>
  )
}

SignUp.propTypes = {
  actions: PropTypes.shape({
    signUp: PropTypes.func.isRequired,
    emitAlert: PropTypes.func.isRequired
  }).isRequired
}

export default Auth(SignUp)
