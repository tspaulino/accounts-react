/**
 * Errors util
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import { SubmissionError } from 'redux-form'

/**
 * toValidationError
 */
const toValidationError = (errors) => {
  const keys = Object.keys(errors)
  return keys.reduce((obj, item) => ({ ...obj, ...{ [item]: [errors[item].message] } }), {})
}

/**
 * requestErrorHandler
 */
export const requestErrorHandler = (reqError) => {
  const error = {
    type: 'request' // request, response, validation
  }
  const { response, request } = reqError

  if (response) {
    const { data } = response

    if (data.errors) {
      error.validation = toValidationError(data.errors)
      error.type = 'validation'
    } else {
      error.message = data.message
      error.type = 'response'
    }
  } else if (request) {
    error.message = 'Request error'
  } else {
    error.message = reqError.message
  }

  return error
}

/**
 * formErrorHandler
 */
export const formErrorHandler = (err) => {
  const error = new SubmissionError({
    ...(err.type === 'validation' ? err.validation : {}),
    ...(err.message && { formError: err.message })
  })
  return Promise.reject(error)
}
