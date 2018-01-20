import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import Auth from './Auth'
import LostPasswordForm from './LostPasswordForm'

export const LostPassword = (props) => {
  const { actions } = props
  const handleSubmit = ({ email }) => actions.lostPassword(email).then(() => {
    actions.resetForm('lostPassword')
  })
  const handleSubmitFail = (submitError) => {
    if (submitError) actions.emitAlert('submitErrors')
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
