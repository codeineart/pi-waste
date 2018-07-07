/**********************************************************
 *                  MAIN STORE LOADER                     *
 **********************************************************/

import Vue from 'vue'
import vuex from 'vuex'
import { store as authStore } from '@/modules/auth'
import { store as userManagementStore } from '@/modules/userManagement'
import moduleFactoryStore from '@/_mixins/moduleFactory'

// Store modules import
// import user from './modules/user'

Vue.use(vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new vuex.Store({
  modules: {
    authStore,
    moduleFactoryStore,
    userManagementStore
  },
  strict: debug
})
