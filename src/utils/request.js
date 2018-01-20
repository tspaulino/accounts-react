import axios from 'axios'
import storage from '../utils/storage'
import { apiUrl } from '../config'

export default ({ authenticated, ...rest }) => {
  const defaults = {
    method: 'GET',
    baseURL: apiUrl,
    headers: {
      Authorization: authenticated && `Bearer ${storage.get('token')}`
    }
  }

  return axios({ ...defaults, ...rest })
}
