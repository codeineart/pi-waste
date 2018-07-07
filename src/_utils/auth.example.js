import Axios from "axios";

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
}

const getters = {
  // ES6 syntax for return
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {

  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {           // Promise to resolve routing
      commit(AUTH_REQUEST)
      Axios({url: 'login', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
//----------Storage of token. PUT INTO A COOKIE FOR XSS AVOID!!!!!!--------------------
            localStorage.setItem('user-token', token)
            Axios.defaults.headers.common['Authorization'] = token
//----------Storage of token. PUT INTO A COOKIE FOR XSS AVOID!!!!!!--------------------
            commit(AUTH_SUCCESS, token)
            // Got the token, login the user
            dispatch(USER_REQUEST)
            resolve(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('user-token') // On error, nuclear bomb everything
            reject(err)
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

}

// Always have to run synchronously
// Mutations get commited
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}