
import find from 'lodash/find'
import without from 'lodash/without'

import createReducer from '../utils/createReducer'
import getAlert from '../utils/alerts'

// Actions
export const EMIT_ALERT = 'EMIT_ALERT'
export const REVOKE_ALERT = 'REVOKE_ALERT'

// Action creators
export const emitAlert = alert => ({ type: EMIT_ALERT, payload: { alert: getAlert(alert) } })
export const revokeAlert = id => ({ type: REVOKE_ALERT, payload: { id } })

// Initial state
const initialState = {
  items: []
}

// Reducer
const actionHandlers = {
  [EMIT_ALERT]: (state, { alert }) => ({ items: state.items.concat(alert) }),
  [REVOKE_ALERT]: (state, { id }) => {
    const row = find(state.items, { id })
    const items = (row) ? without(state.items, row) : state.items

    return { items }
  }
}

export default createReducer(initialState, actionHandlers)
