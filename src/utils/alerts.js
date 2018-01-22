/**
 * Alerts util
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import uniqueId from 'lodash/uniqueId'
import isString from 'lodash/isString'


const alerts = {
  fieldErrors: { message: 'Please solve the errors bellow', type: 'error' },
  generalError: { message: 'An error ocurred, please try again later', type: 'error' },
  notAuthenticated: { message: 'Please sign in to continue', type: 'error' }
}

export default (alert) => {
  const id = uniqueId('alert')

  if (isString(alert)) {
    return {
      id,
      ...(alerts[alert] || alerts.generalError)
    }
  }

  return { id, type: 'error', ...alert }
}
