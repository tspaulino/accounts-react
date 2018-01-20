import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import { lostPasswordValidation } from '../../validation/auth'
import Input from '../common/forms/Input'

export const LostPasswordForm = ({ handleSubmit, pristine, submitting }) => (
  <Form loading={submitting}>
    <Field name="email" component={Input} type="text" label="Email" />

    <Button
      type="submit"
      color="blue"
      onClick={handleSubmit}
      disabled={pristine || submitting}
    >
      Send
    </Button>

    <Link to="/sign-up" className="ui button teal">Sign Up</Link>
    <Link to="/sign-In" className="ui button teal">Sign In</Link>
  </Form>
)

LostPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'lostPassword',
  validate: lostPasswordValidation
})(LostPasswordForm)
