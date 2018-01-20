import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import Auth from './Auth'
import SignUpForm from './SignUpForm'

export const SignUp = (props) => {
  const { actions } = props
  const handleSubmit = data => actions.signUp(data)
  const handleSubmitFail = () => actions.emitAlert('submitErrors')

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
