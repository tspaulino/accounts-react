import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import storage from '../utils/storage'
import { apiUrl, env } from '../config'

// https://github.com/axios/axios/issues/305
if (env === 'test') axios.defaults.adapter = httpAdapter

export default ({ authenticated, ...rest }) => {
  const authorization = { Authorization: `Bearer ${storage.get('token')}` }
  const defaults = {
    method: 'GET',
    baseURL: apiUrl,
    headers: {
      ...authenticated ? authorization : {}
    }
  }

  return axios({ ...defaults, ...rest })
}
