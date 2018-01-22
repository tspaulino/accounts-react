/**
 * Errors util
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

/**
 * getValidationErrors
 */
export const getValidationErrors = (errors) => {
  const keys = Object.keys(errors)
  return keys.map(item => ({ content: errors[item].message, code: errors[item].validator }))
}

/**
 * getResponseError
 */
export const getResponseError = error => ({ content: error.message, code: error.statusCode })

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
    type: 'requestError' // requestError, responseError, validationError
  }
  const { response, request } = reqError

  if (response) {
    const { data } = response

    if (data.errors) {
      error.validation = toValidationError(data.errors)
      error.type = 'validationError'
    } else {
      error.message = data.message
      error.type = 'responseError'
    }
  } else if (request) {
    error.message = 'Request error'
  } else {
    error.message = reqError.message
  }

  return error
}
