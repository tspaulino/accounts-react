
import * as api from '../api/auth'
import { getUser } from '../api/user'
import createReducer from '../utils/createReducer'
import { getValidationErrors, requestErrorHandler } from '../utils/errors'
import { emitAlert } from './alerts'
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
export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST'
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS'
export const RECOVER_PASSWORD_ERROR = 'RECOVER_PASSWORD_ERROR'
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
  } catch (e) {
    const error = requestErrorHandler(e)
    dispatch({ type: AUTHENTICATE_ERROR, payload: error })

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
    dispatch({ type: SIGN_IN_ERROR, payload: error })

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
    dispatch({ type: SIGN_UP_ERROR, payload: error })

    return Promise.reject(error)
  }
}

export const lostPassword = email => (dispatch) => {
  dispatch({ type: RECOVER_PASSWORD_REQUEST })

  return api.lostPassword({ email }).then(() => {
    dispatch({ type: RECOVER_PASSWORD_SUCCESS })

    dispatch(emitAlert({
      content: 'Please check your email for further instructions',
      code: 'checkEmail',
    }, 'success'))
  }).catch(({ response }) => {
    const { errors } = response.data
    getValidationErrors(errors).forEach(error => dispatch(emitAlert(error)))
    dispatch({ type: RECOVER_PASSWORD_ERROR })

    return Promise.reject()
  })
}

export const resetPassword = user => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST })

  return api.resetPassword(user).then(() => {
    dispatch({ type: RECOVER_PASSWORD_SUCCESS })

    dispatch(emitAlert({
      content: 'Password reset successfully',
      code: 'resetPassword'
    }, 'success'))
  }).catch(({ response }) => {
    const { errors } = response.data
    getValidationErrors(errors).forEach(error => dispatch(emitAlert(error)))
    dispatch({ type: RESET_PASSWORD_ERROR })

    return Promise.reject()
  })
}

export const signOut = () => (dispatch) => {
  storage.destroy()
  dispatch({ type: SIGN_OUT })
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
  [AUTHENTICATE_SUCCESS]: (state, { payload }) => ({
    currentUser: payload.user,
    status: authStatuses.connected
  }),
  [AUTHENTICATE_ERROR]: (state, { payload }) => ({
    status: authStatuses.disconnected,
    error: payload
  }),

  [SIGN_IN_REQUEST]: () => ({
    token: null,
    error: null
  }),
  [SIGN_IN_ERROR]: (state, { payload }) => ({
    error: payload
  }),
  [SIGN_IN_SUCCESS]: (state, { payload }) => ({
    token: payload.token,
  }),

  [SIGN_UP_REQUEST]: () => ({
    token: null,
    error: null
  }),
  [SIGN_UP_SUCCESS]: (state, { payload }) => ({
    token: payload.token,
  }),
  [SIGN_UP_ERROR]: (state, { payload }) => ({
    error: payload
  }),
  // [RECOVER_PASSWORD_REQUEST]: () => ({}),
  // [RECOVER_PASSWORD_SUCCESS]: () => ({}),
  // [RECOVER_PASSWORD_ERROR]: () => ({}),
  // [RESET_PASSWORD_REQUEST]: () => ({}),
  // [RESET_PASSWORD_SUCCESS]: () => ({}),
  // [RESET_PASSWORD_ERROR]: () => ({}),
  [SIGN_OUT]: () => ({
    token: null,
    status: authStatuses.disconnected,
  })
}

export default createReducer(initialState, actionHandlers)

