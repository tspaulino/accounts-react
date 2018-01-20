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
