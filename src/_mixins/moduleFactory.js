/**
 * Import module loader service
 */
import { service, endpoints } from '@/services/general_service'

/**
 * Modules dictionary
 */

class Module {
  constructor (canonicalName, identifier, icon, component) {
    this.id = identifier
    this.name = canonicalName
    this.icon = icon
    this.component = component
  }
}

/**
 * Diccionario de módulos deben coincidir con módulos
 * declarados en el servidor.
 */
const modulesAvailable = {
  UserManager: () => import('@/modules/_user_manager'),
  News: () => import('@/modules/news'),
  Comite: () => import('@/modules/comite'),
  Videos: () => import('@/modules/videos'),
  Archivos: () => import('@/modules/_archivos/adminUI'),
  Destinatario: () => import('@/modules/destinatario'),
  Estructura: () => import('@/modules/estructura'),
  CorreoMasivo: () => import('@/modules/correo-masivo')
}

const state = {
  modules: []
}

const getters = {
  getModules: state => state.modules
}

// Use descriptive names of what they do
const actions = {
  loadModules: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      service()
        .get(endpoints.system.dashboardModules)
        .then(resp => {
          let systemModulesLoad = []

          let systemAuthorizedModules = resp.data.modules

          // Walk modules downloaded
          systemAuthorizedModules.forEach(module => {
            // Packs module with his corresponding component
            let unit = new Module(module.name, module.id, module.icon, modulesAvailable[module.id])

            // Push to the load
            systemModulesLoad.push(unit)
          })

          commit('mountComponents', systemModulesLoad)
          resolve('Componentes cargados en store')
        })
        .catch(e => {
          console.log(e)
          reject('Error en la autorización de los módulos de dashboard: ' + e)
        })
    })
  }
}

// Always have to run synchronously
// Mutations get commited
const mutations = {
  mountComponents: (state, modules) => {
    state.modules = modules
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
