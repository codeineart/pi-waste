import axios from 'axios'

/**
 * SERVICE INSTANCE
 */
export function service () {
  return axios.create({
    baseURL: process.env.ROOT_API,
    headers: {
      Authorization: localStorage.getItem('user-token') || ''
    }
  })
}

/**
 * ENDPOINTS
 */
export const endpoints = {
  projects: {
    get: '/project/',
    update: '/project/',
    delete: '/project/',
    create: '/project',
    getAll: '/project'
  },
  user: {
    getAllPhoneDir: '/user/obtenerDirectorio'
  },
  home: {
    get: '/home/obtenerHome'
  },
  news: {
    getAll: '/news/obtenerTodo',
    get: '/news/obtenerPorId?id='
  },
  video: {
    getAll: '/video'
  },
  organization: {
    getAll: '/info/organization_chart'
  },
  peerCommittee: {
    getAll: '/info/peer_committee'
  },
  events: {
    getAllevents: '/event/obtenerTodo',
    postEvent: '/event',
    delete: '/event/'
  },
  files: {
    getUserAreaAllowedFiles: (area, query) => {
      return '/file/allowed?area=' + area + '&query=' + JSON.stringify(query)
    },
    getAllFiles: '/file/allowed?area=admin_dashboard&query=',
    search: '/file/search?pattern=',
    delete: '/file/',
    testUpload: '/file/test_upload',
    gfsUpload: '/fs/upload'
  },
  system: {
    dashboardModules: '/test/getmodules'
  }
}
