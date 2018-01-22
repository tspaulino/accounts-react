import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import qString from 'query-string'

import { formErrorHandler } from '../../utils/errors'
import Auth from './Auth'
import ResetPasswordForm from './ResetPasswordForm'

export const ResetPassword = (props) => {
  const { actions, location, history } = props
  const { token } = qString.parse(location.search)
  const handleSubmit = data => actions.resetPassword({ ...data, token }).then(() => {
    actions.emitAlert({
      message: 'Password reset successfully',
      type: 'success'
    })
    history.push('/sign-in')
  }).catch(formErrorHandler)
  const handleSubmitFail = (validationError, dispatch, submitError) => {
    if (validationError && !submitError) actions.emitAlert('fieldErrors')
    if (validationError.formError) actions.emitAlert({ message: validationError.formError })
    if (validationError.token) actions.emitAlert({ message: validationError.token[0] })
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
