
import * as api from '../api/auth'
import { getUser } from '../api/user'
import createReducer from '../utils/createReducer'
import { getResponseErrors } from '../utils/errors'
import { appUrl } from '../config'
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
export const SIGN_OUT = 'SIGN_OUT'

const authStatuses = {
  connecting: 'connecting',
  connected: 'connected',
  idle: 'idle',
  disconnected: 'disconnected'
}

// Action creators
export const authenticate = () => (dispatch) => {
  dispatch({ type: AUTHENTICATE_REQUEST })

  return getUser().then(({ data }) => {
    dispatch({
      type: AUTHENTICATE_SUCCESS,
      payload: data
    })
  }).catch(() => {
    dispatch(emitAlert('notAuthenticated'))
    dispatch({ type: AUTHENTICATE_ERROR })
  })
}

export const signIn = creds => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST })

  return api.signIn(creds).then(({ data }) => {
    storage.set('token', data.token)

    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: data
    })

    return dispatch(authenticate())
  }).catch(({ response }) => {
    const { errors } = response.data
    getResponseErrors(errors).forEach(error => dispatch(emitAlert(error)))
    dispatch({ type: SIGN_IN_ERROR })
  })
}

// export const signUp = (user) => {
//   return (dispatch) => {
//     dispatch({ type: SIGN_UP_REQUEST })

//     return api.signUp(user).then(({ data }) => {
//       setToken(data.token)

//       dispatch({
//         type: SIGN_UP_SUCCESS,
//         payload: data
//       })
//     }).catch(({ data }) => {
//       dispatch({ type: SIGN_UP_ERROR, payload: data.error })
//     })
//   }
// }

// export const recoverPassword = (email) => {
//   return (dispatch) => {
//     dispatch({ type: RECOVER_PASSWORD_REQUEST })

//     return api.recoverPassword({ email, callbackUrl: appUrl }).then(() => {
//       dispatch({
//         type: RECOVER_PASSWORD_SUCCESS
//       })
//     }).catch(({ data }) => {
//       dispatch({ type: RECOVER_PASSWORD_ERROR, payload: data.error })
//     })
//   }
// }

export const signOut = () => (dispatch) => {
  storage.destroy()
  dispatch({ type: SIGN_OUT })
}

// Initial Store
const initialState = {
  token: storage.get('token'),
  status: authStatuses.idle,
  currentUser: {}
}

// Reducer
const actionHandlers = {
  [AUTHENTICATE_REQUEST]: () => ({
    status: authStatuses.connecting,
    currentUser: {}
  }),
  [AUTHENTICATE_SUCCESS]: (state, { payload }) => ({
    currentUser: payload.user,
    status: authStatuses.connected
  }),
  [AUTHENTICATE_ERROR]: () => ({
    status: authStatuses.disconnected,
  }),
  [SIGN_IN_REQUEST]: () => ({
    token: null
  }),
  [SIGN_IN_SUCCESS]: (state, { payload }) => ({
    token: payload.token,
  }),
  [SIGN_IN_ERROR]: () => ({}),
  [SIGN_OUT]: () => ({
    token: null,
    status: authStatuses.disconnected,
  })
}

export default createReducer(initialState, actionHandlers)

