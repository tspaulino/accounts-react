/**
 * Validate util
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import validateJS from 'validate.js'

// Overwrite validate.js default options
validateJS.options = { fullMessages: false }
validateJS.validators.equality.message = 'does not match'

/**
 * Helper function to validate any
 * form field and return
 * a formated error object
 */
export default rules => values => (validateJS(values, rules) || {})
