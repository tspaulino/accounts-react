import React from 'react'
import PropTypes from 'prop-types'
import { Form, List } from 'semantic-ui-react'
import upperFirst from 'lodash/upperFirst'

const Input = (props) => {
  const {
    input,
    label,
    type,
    placeholder,
    meta: { touched, visited, error }
  } = props

  const isDirty = touched || visited
  const showErrors = isDirty && !!error
  const errors = showErrors && error.map(item => (
    <List.Item className="error-item" key={item}>
      {upperFirst(item)}
    </List.Item>
  ))

  return (
    <Form.Field>
      <Form.Input
        label={label}
        {...input}
        placeholder={placeholder || label}
        type={type}
        error={showErrors}
      />

      {errors}
    </Form.Field>
  )
}

Input.defaultProps = {
  placeholder: ''
}

Input.propTypes = {
  input: PropTypes.shape({
    checked: PropTypes.boolean,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    error: PropTypes.array,
    touched: PropTypes.bool,
  }).isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default Input
