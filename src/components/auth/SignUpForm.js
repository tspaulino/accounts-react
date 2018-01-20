import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import { signUpValidation } from '../../validation/auth'
import Input from '../common/forms/Input'

export const SignUpForm = ({ handleSubmit, pristine, submitting }) => (
  <Form loading={submitting}>
    <Field name="name" component={Input} type="text" label="Name" />
    <Field name="email" component={Input} type="text" label="Email" />
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

    <Link to="/sign-in" className="ui button teal">Sign In</Link>
    <Link to="/recover-password" className="ui button teal">Lost Password?</Link>
  </Form>
)

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'signUp',
  validate: signUpValidation
})(SignUpForm)
