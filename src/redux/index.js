/**
 * Reducers
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './auth'
import alerts from './alerts'

// Export default reducers that
// are going to be added on the
// initial data load.
export default combineReducers({
  form,
  auth,
  alerts
})
