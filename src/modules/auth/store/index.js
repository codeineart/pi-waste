import {AUTH_LOGIN,
        AUTH_LOGOUT,
        AUTH_TOKEN_CHECK,
        STATUS_REQUEST,
        STATUS_SUCCESS,
        STATUS_ERROR } from './actions'
import { service , endpoint} from '@/services/auth_service'

const state = {
  tokenValid: false,
  token: localStorage.getItem('user-token') || '',
  status: '',
  message: '',
}

const getters = {
  // ES6 syntax for return
  isTokenValid: state => state.tokenValid,
  isAuthenticated: state => !!state.token,
  requestStatus: state => state.status,
  statusMessage: state => state.message
}

// Use descriptive names of what they do
const actions = {

  [AUTH_LOGIN]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(STATUS_REQUEST)
      console.log(user)
      service().post(endpoint.login, user)
        .then(resp => {
          console.log(resp)
          commit(AUTH_LOGIN, resp.data.token)
          localStorage.setItem('user-token', resp.data.token)
          commit(STATUS_SUCCESS)
          resolve(resp.data.msg)
        })
        .catch(e => {
          console.log(e)
          commit(STATUS_ERROR)
          // reject(e.response.data.msg)
          reject("Error de conexión.")
        })
    })
  },

  // {commit, dispatch} = context.commit && context.dispatch
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      resolve()
    })
  },

  [AUTH_TOKEN_CHECK]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {

      commit(STATUS_REQUEST)
      
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('user-token')
        }
      }

      service().get(endpoint.checkToken, config)
        .then(res => {
          commit(STATUS_SUCCESS)
          commit(AUTH_TOKEN_CHECK, true)
          resolve(true)

        })
        .catch(err => {
          commit(STATUS_ERROR)
          commit(AUTH_TOKEN_CHECK, false)
          commit(AUTH_LOGOUT)
          resolve(false)
        })
    })
  }

}

// Always have to run synchronously
// Mutations get commited
const mutations = {
  [STATUS_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [STATUS_SUCCESS]: (state, token) => {
    state.status = 'success'
  },
  [STATUS_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  },
  [AUTH_LOGIN]: (state, token) => {
    state.token = token
  },
  [AUTH_TOKEN_CHECK]: (state, flag) => {
    state.tokenValid = flag
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}