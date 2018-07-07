/**********************************************************
 *             USER_MANAGEMENT MODULE SERVICE             *
 **********************************************************/

import axios from 'axios'

/**
 * SERVICE INSTANCE
 */
export function service () {
  return axios.create({
    baseURL: process.env.ROOT_API,
    headers: {
      Authorization: 'SAMPLE_JWT'
    }
  })
}

/**
 * ENDPOINTS
 */
export const endpoints = {
  // USERS CRUD
  getUsers: '/auth/getusers',
  createUser: '/auth/createuser',
  updateUser: '/auth/updateuser',
  deleteUser: '/auth/deleteuser',
  // SYSTEM SETS
  getPermits: '/getpermits'
}
