
import * as api from '../api/auth'
import { getUser } from '../api/user'
import createReducer from '../utils/createReducer'
import { requestErrorHandler } from '../utils/errors'
import storage from '../utils/storage'

// Actions
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const LOST_PASSWORD_REQUEST = 'LOST_PASSWORD_REQUEST'
export const LOST_PASSWORD_SUCCESS = 'LOST_PASSWORD_SUCCESS'
export const LOST_PASSWORD_ERROR = 'LOST_PASSWORD_ERROR'
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'
export const SIGN_OUT = 'SIGN_OUT'

const authStatuses = {
  connecting: 'connecting',
  connected: 'connected',
  idle: 'idle',
  disconnected: 'disconnected'
}

// Action creators
export const authenticate = () => async (dispatch) => {
  dispatch({ type: AUTHENTICATE_REQUEST })

  try {
    const { data } = await getUser()
    dispatch({
      type: AUTHENTICATE_SUCCESS,
      payload: data
    })

    return true
  } catch (e) {
    const error = requestErrorHandler(e)
    dispatch({ type: AUTHENTICATE_ERROR, payload: { error } })

    return Promise.reject(error)
  }
}

export const signIn = creds => async (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST })

  try {
    const { data } = await api.signIn(creds)
    storage.set('token', data.token)

    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: data
    })

    return dispatch(authenticate())
  } catch (e) {
    const error = requestErrorHandler(e)
    dispatch({ type: SIGN_IN_ERROR, payload: { error } })

    return Promise.reject(error)
  }
}

export const signUp = user => async (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST })

  try {
    const { data } = await api.signUp(user)
    storage.set('token', data.token)

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: data
    })

    return dispatch(authenticate())
  } catch (e) {
    const error = requestErrorHandler(e)
    dispatch({ type: SIGN_UP_ERROR, payload: { error } })

    return Promise.reject(error)
  }
}

export const lostPassword = email => async (dispatch) => {
  dispatch({ type: LOST_PASSWORD_REQUEST })

  try {
    await api.lostPassword({ email })
    dispatch({ type: LOST_PASSWORD_SUCCESS })

    return true
  } catch (e) {
    const error = requestErrorHandler(e)
    dispatch({ type: LOST_PASSWORD_ERROR, payload: { error } })

    return Promise.reject(error)
  }
}

export const resetPassword = user => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST })

  try {
    await api.resetPassword(user)
    dispatch({ type: RESET_PASSWORD_SUCCESS })

    return true
  } catch (e) {
    const error = requestErrorHandler(e)
    dispatch({ type: RESET_PASSWORD_ERROR, payload: { error } })

    return Promise.reject(error)
  }
}

export const signOut = () => {
  storage.destroy()
  return { type: SIGN_OUT }
}

// Initial Store
const initialState = {
  token: storage.get('token'),
  status: authStatuses.idle,
  currentUser: null,
  error: null
}

// Reducer
const actionHandlers = {
  [AUTHENTICATE_REQUEST]: () => ({
    status: authStatuses.connecting,
    currentUser: null,
    error: null
  }),
  [AUTHENTICATE_SUCCESS]: (state, { user }) => ({
    currentUser: user,
    status: authStatuses.connected
  }),
  [AUTHENTICATE_ERROR]: (state, { error }) => ({
    status: authStatuses.disconnected,
    error
  }),

  [SIGN_IN_REQUEST]: () => ({
    token: null,
    error: null
  }),
  [SIGN_IN_SUCCESS]: (state, { token }) => ({
    token
  }),
  [SIGN_IN_ERROR]: (state, { error }) => ({
    error
  }),

  [SIGN_UP_REQUEST]: () => ({
    token: null,
    error: null
  }),
  [SIGN_UP_SUCCESS]: (state, { token }) => ({
    token
  }),
  [SIGN_UP_ERROR]: (state, { error }) => ({
    error
  }),

  [LOST_PASSWORD_REQUEST]: () => ({
    error: null
  }),
  // [LOST_PASSWORD_SUCCESS]: () => ({}),
  [LOST_PASSWORD_ERROR]: (state, { error }) => ({
    error
  }),

  [RESET_PASSWORD_REQUEST]: () => ({
    error: null
  }),
  // [RESET_PASSWORD_SUCCESS]: () => ({}),
  [RESET_PASSWORD_ERROR]: (state, { error }) => ({
    error
  }),

  [SIGN_OUT]: () => ({
    token: null,
    status: authStatuses.disconnected,
  })
}

export default createReducer(initialState, actionHandlers)

