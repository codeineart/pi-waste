import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('users')
  },
  addUser (params) {
    return Api().post('users', params)
  },
  authenticate (params) {
    return Api().post('user', params)
  },
  LoggedInUser (params) {
    return Api().put('users/' + params.user, params)
  },
  LogOut (params) {
    return Api().put('userslogout/' + params.user, params)
  }, 
  UniqueUser (params) { 
    return Api().post('UniqueUser',params) 
  }, 
  UniqueMail (params) { 
    return Api().post('UniqueMail',params) 
  }, 
  DeleteUser (params) {
    console.log(params)
    return Api().put('DeleteUser',params)
  },
  EditUser (params) {
    return Api().put('EditUser',params)
  }
}
