import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import { signInValidation } from '../../validation/auth'
import Input from '../common/forms/Input'

export const SignInForm = ({ handleSubmit, pristine, submitting }) => (
  <Form loading={submitting}>
    <Field name="email" component={Input} type="text" label="Email" />
    <Field name="password" component={Input} type="password" label="Password" />

    <Button
      type="submit"
      color="blue"
      onClick={handleSubmit}
      disabled={pristine || submitting}
    >
      Submit
    </Button>

    <Link to="/sign-up" className="ui button teal">Sign Up</Link>
    <Link to="/lost-password" className="ui button teal">Lost Password?</Link>
  </Form>
)

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'signIn',
  validate: signInValidation
})(SignInForm)
