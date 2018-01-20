import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import qString from 'query-string'

import Auth from './Auth'
import ResetPasswordForm from './ResetPasswordForm'

export const ResetPassword = (props) => {
  const { actions, location, history } = props
  const { token } = qString.parse(location.search)
  const handleSubmit = data => actions.resetPassword({ ...data, token }).then(() => {
    history.push('/sign-in')
  })
  const handleSubmitFail = (submitError) => {
    if (submitError) actions.emitAlert('submitErrors')
  }

  return (
    <Segment stacked>
      <div className="auth-resetpassword">
        <Header size="large">Reset Password</Header>
        <ResetPasswordForm onSubmit={handleSubmit} onSubmitFail={handleSubmitFail} />
      </div>
    </Segment>
  )
}

ResetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    resetPassword: PropTypes.func.isRequired,
    emitAlert: PropTypes.func.isRequired
  }).isRequired
}

export default Auth(ResetPassword)
