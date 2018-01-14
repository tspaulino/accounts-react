import uniqueId from 'lodash/uniqueId'
import isString from 'lodash/isString'
import find from 'lodash/find'
import without from 'lodash/without'

import createReducer from '../utils/createReducer'

// Actions
export const EMIT_ALERT = 'EMIT_ALERT'
export const REVOKE_ALERT = 'REVOKE_ALERT'

let alerts = {
  EMPTY_FIELDS: 'Please solve the errors bellow',
  GENERAL_ERROR: 'An error ocurred, please try again later'
}

const getAlert = (codeId, type) => {
  const code = alerts[codeId] ? codeId : 'GENERAL_ERROR'

  return {
    id: uniqueId('alert_'),
    type: isString(type) ? type : 'error',
    content: alerts[code],
    code,
  }
}

export const addAlerts = (newAlerts = {}) => {
  alerts = Object.assign({}, alerts, newAlerts)
}

// Action creators
export const emitAlert = (code, type) => ({ type: EMIT_ALERT, payload: getAlert(code, type) })
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
