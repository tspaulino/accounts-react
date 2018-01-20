import request from '../utils/request'
import { appUrl } from '../config'

/**
 * signIn
 *
 * Perform a sign in request
 * on the server to retrieve a valid
 * token
 */
export const signIn = data => request({
  method: 'POST',
  url: 'sign-in',
  data
})

/**
 * signUp
 *
 * Perform a sign up request
 * on the server to retrieve a valid
 * token
 */
export const signUp = data => request({
  method: 'POST',
  url: 'sign-up',
  data
})

/**
 * lostPassword
 *
 * Perform a lost password request
 * on the server to start user password reset
 */
export const lostPassword = data => request({
  method: 'POST',
  url: 'lost-password',
  data: { ...data, callbackUrl: `${appUrl}/reset-password` }
})

/**
 * resetPassword
 *
 * Perform a reset password request
 * on the server to reset the user password
 */
export const resetPassword = data => request({
  method: 'POST',
  url: 'reset-password',
  data
})
