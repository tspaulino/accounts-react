import request from '../utils/request'

/**
 * getUser
 *
 * Perform a get user request
 * on the server to retrieve user data
 */
export const getUser = () => request({
  url: 'user',
  authenticated: true
})

/**
 * updateUser
 *
 * Perform an update user request
 * on the server to change user data
 */
export const updateUser = data => request({
  method: 'POST',
  url: 'user',
  data,
  authenticated: true
})

/**
 * changePassword
 *
 * Perform an update user request
 * on the server to change user data
 */
export const changePassword = data => request({
  method: 'POST',
  url: 'user/change-password',
  data,
  authenticated: true
})
