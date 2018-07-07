/**********************************************************
 *                 USERMANAGEMENT STORE                   *
 **********************************************************/
import { service, endpoints } from '@/services/user_management_service'
import { FETCH_USERS, SAVE_USER, UPDATE_USER, DELETE_USER, FETCH_SYS_PERMISSIONS } from './actions'

/**
 * To-Do:
 * - Fetch data for tables
 * - Make Pagination of data
 * - Make filters of data
 * - Make dropdown menus on sidebar
 * - Style dashboard
 * - Create modal for creation/edit of users
 * - Fetch permits available into modal for user creation
 */

/**********************************************************
 *                    STORE STATE                         *
 **********************************************************/

const state = {
  users: [],
  tableLoading: false
}

/**********************************************************
 *                   STORE GETTERS                        *
 **********************************************************/

const getters = {
  isTableLoading: state => state.tableLoading
}

/**********************************************************
 *                   STORE ACTIONS                        *
 **********************************************************/
const actions = {
  [FETCH_USERS]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      console.log('Fetching users...')
      commit(FETCH_USERS)
      service()
        .get(endpoints.getUsers)
        .then(resp => {
          commit(FETCH_USERS)
          resolve(resp.data.users)
        })
    })
  },

  [SAVE_USER]: ({ commit, dispatch }, payload) => {
    console.log(payload)
    return new Promise((resolve, reject) => {
      console.log('Saving User...')
      commit(FETCH_USERS)
      service()
        .post(endpoints.createUser, payload)
        .then(resp => {
          console.log(resp)
          commit(FETCH_USERS)
          resolve()
        })
    })
  },

  [UPDATE_USER]: ({ commit, dispatch }, payload) => {
    console.log('Updating user...')
    console.log(payload)
    commit(FETCH_USERS)
    return new Promise((resolve, reject) => {
      service()
        .post(endpoints.updateUser, payload)
        .then(resp => {
          console.log(resp)
          commit(FETCH_USERS)
          resolve()
        })
    })
  },

  [DELETE_USER]: ({ commit, dispatch }, user) => {
    console.log('Updating user...')
    console.log(user)
    commit(FETCH_USERS)
    return new Promise((resolve, reject) => {
      service()
        .post(endpoints.deleteUser, user)
        .then(resp => {
          console.log(resp)
          commit(FETCH_USERS)
          resolve()
        })
    })
  },

  [FETCH_SYS_PERMISSIONS]: ({ commit, dispatch }) => {
    console.log('Retrieving permissions...')
    commit(FETCH_USERS)
    return new Promise((resolve, reject) => {
      service()
        .get(endpoints.getPermits)
        .then(res => {
          console.log(res.data.permisos)
          commit(FETCH_USERS)
          resolve(res.data.permisos)
        })
    })
  }
}

/**********************************************************
 *                  STORE MUTATIONS                       *
 **********************************************************/

// Always have to run synchronously
// Mutations get commited
const mutations = {
  [FETCH_USERS]: state => {
    state.tableLoading = !state.tableLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
