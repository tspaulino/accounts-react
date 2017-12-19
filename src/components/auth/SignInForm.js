import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import validate from '../../utils/validate'
import { signIn as signInValidation } from '../../validation/auth'
import Input from '../common/Input'

export const SignInForm = ({ handleSubmit, pristine, submitting }) => (
  <Form>
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
    <Link to="/auth/sign-up" className="ui button teal">Sign Up</Link>
  </Form>
)

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({ form: 'signIn', validate: validate(signInValidation) })(SignInForm)
