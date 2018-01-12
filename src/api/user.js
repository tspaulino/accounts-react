import axios from 'axios'
import { apiUrl } from '../config'

/**
 * getUser
 *
 * Perform a get user request
 * on the server to retrieve user data
 */
export const getUser = () => axios.get(`${apiUrl}/user`)

/**
 * updateUser
 *
 * Perform an update user request
 * on the server to change user data
 */
export const updateUser = body => axios.post(`${apiUrl}/user`, { ...body })

/**
 * changePassword
 *
 * Perform an update user request
 * on the server to change user data
 */
export const changePassword = body => axios.post(`${apiUrl}/user/change-password`, { ...body })
