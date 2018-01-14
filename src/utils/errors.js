/**
 * Errors util
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

/**
 * getResponseErrors
 */
export const getResponseErrors = (errors) => {
  const keys = Object.keys(errors)
  return keys.map(item => ({ content: errors[item].message, code: errors[item].validator }))
}

export default {}
