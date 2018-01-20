import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import { resetPasswordValidation } from '../../validation/auth'
import Input from '../common/forms/Input'

export const ResetPasswordForm = ({ handleSubmit, pristine, submitting }) => (
  <Form loading={submitting}>
    <Field name="password" component={Input} type="password" label="Password" />
    <Field name="confirmPassword" component={Input} type="password" label="Confirm Password" />

    <Button
      type="submit"
      color="blue"
      onClick={handleSubmit}
      disabled={pristine || submitting}
    >
      Submit
    </Button>

    <Link to="/sign-up" className="ui button teal">Sign Up</Link>
    <Link to="/sign-In" className="ui button teal">Sign In</Link>
  </Form>
)

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'resetPassword',
  validate: resetPasswordValidation
})(ResetPasswordForm)
