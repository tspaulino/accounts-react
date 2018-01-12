import axios from 'axios'
import { apiUrl } from '../config'

/**
 * signIn
 *
 * Perform a sign in request
 * on the server to retrieve a valid
 * token
 */
export const signIn = body => axios.post(`${apiUrl}/sign-in`, { ...body })

/**
 * signUp
 *
 * Perform a sign up request
 * on the server to retrieve a valid
 * token
 */
export const signUp = body => axios.post(`${apiUrl}/sign-up`, { ...body })

/**
 * recoverPassword
 *
 * Perform a recover password request
 * on the server to reset user password
 */
export const recoverPassword = body => axios.post(`${apiUrl}/recover-password`, { ...body })
