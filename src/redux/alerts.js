import uniqueId from 'lodash/uniqueId'
import isString from 'lodash/isString'
import find from 'lodash/find'
import without from 'lodash/without'

import createReducer from '../utils/createReducer'

// Actions
export const EMIT_ALERT = 'EMIT_ALERT'
export const REVOKE_ALERT = 'REVOKE_ALERT'

let alerts = {
  submitErrors: 'Please solve the errors bellow',
  generalError: 'An error ocurred, please try again later',
}

const getAlert = (alert, type) => {
  let { content, code } = alert

  if (!(content && code) && typeof alert === 'string') {
    code = alerts[alert] ? alert : 'generalError'
    content = alerts[code]
  }

  return {
    id: uniqueId('alert_'),
    type: isString(type) ? type : 'error',
    content,
    code,
  }
}

export const addAlerts = (newAlerts = {}) => {
  alerts = Object.assign({}, alerts, newAlerts)
}

// Action creators
export const emitAlert = (alert, type) => ({ type: EMIT_ALERT, payload: getAlert(alert, type) })
export const revokeAlert = id => ({ type: REVOKE_ALERT, payload: { id } })

// Initial state
const initialState = {
  items: []
}

// Reducer
const actionHandlers = {
  [EMIT_ALERT]: (state, { payload }) => ({ items: state.items.concat(payload) }),
  [REVOKE_ALERT]: (state, { payload }) => {
    const row = find(state.items, { id: payload.id })
    const items = (row) ? without(state.items, row) : state.items

    return { items }
  }
}

export default createReducer(initialState, actionHandlers)
