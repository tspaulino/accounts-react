import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { formErrorHandler } from '../../utils/errors'
import Auth from './Auth'
import LostPasswordForm from './LostPasswordForm'

export const LostPassword = (props) => {
  const { actions } = props
  const handleSubmit = ({ email }) => actions.lostPassword(email).then(() => {
    actions.resetForm('lostPassword')
    actions.emitAlert({
      message: 'Please check your email for further instructions to reset your password',
      type: 'success'
    })
  }).catch(formErrorHandler)
  const handleSubmitFail = (validationError, dispatch, submitError) => {
    if (validationError && !submitError) actions.emitAlert('fieldErrors')
    if (validationError.formError) actions.emitAlert({ message: validationError.formError })
    if (validationError.user) actions.emitAlert({ message: validationError.user[0] })
  }

  return (
    <Segment stacked>
      <div className="auth-lostpassword">
        <Header size="large">Lost Password</Header>
        <LostPasswordForm onSubmit={handleSubmit} onSubmitFail={handleSubmitFail} />
      </div>
    </Segment>
  )
}

LostPassword.propTypes = {
  actions: PropTypes.shape({
    lostPassword: PropTypes.func.isRequired,
    emitAlert: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }).isRequired
}

export default Auth(LostPassword)
