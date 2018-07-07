/**********************************************************
 *                  AUTH API SERVICE                      *
 **********************************************************/

import axios from 'axios'

/**
 * SERVICE INSTANCE
 */
export function service () {
  return axios.create({
    baseURL: process.env.ROOT_API
  })
}

/**
 * AUTH API ENDPOINTS
 */
export const endpoint = {
  login: '/auth/login',
  checkToken: '/auth/token'
}
