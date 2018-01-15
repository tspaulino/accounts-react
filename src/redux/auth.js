import store from 'store'

import * as api from '../api/auth'
import createReducer from '../utils/createReducer'
import { getResponseErrors } from '../utils/errors'
import { appUrl } from '../config'
import { emitAlert } from './alerts'

// Actions
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST'
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS'
export const RECOVER_PASSWORD_ERROR = 'RECOVER_PASSWORD_ERROR'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'

const storeUser = token => store.set('user', token)

// Action creators
export const signIn = creds => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST })

  return api.signIn(creds).then(({ data }) => {
    storeUser(data.token)

    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: data
    })
  }).catch(({ response }) => {
    const { errors } = response.data
    getResponseErrors(errors).forEach(error => dispatch(emitAlert(error)))
    dispatch({ type: SIGN_IN_ERROR, payload: errors })
  })
}

// export const signUp = (user) => {
//   return (dispatch) => {
//     dispatch({ type: SIGN_UP_REQUEST })

//     return api.signUp(user).then(({ data }) => {
//       storeUser(data.token)

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

export const signOut = () => {
  store.clearAll()
  return { type: SIGN_OUT_SUCCESS }
}

// Initial Store
const initialState = {
  token: null,
  errors: {},
}

// Reducer
const actionHandlers = {
  [SIGN_IN_REQUEST]: () => ({}),
  [SIGN_IN_ERROR]: (state, { payload }) => ({ errors: payload })
}

export default createReducer(initialState, actionHandlers)

