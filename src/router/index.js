import Vue from 'vue'
import Router from 'vue-router'
import { router as authRouter } from '@/modules/auth'

// const  = () => import('src/folder/component') --> async component signature
const Home = () => import('@/views/Home')
const Dashboard = () => import('@/views/Dashboard')
const AdminDashboard = () => import('@/views/AdminDashboard')
const Users = () => import('@/modules/users/views/Crud')
const Estructura = () => import('@/views/pantallas/Estructura')
const Politicas = () => import('@/views/pantallas/Politicas')
const Noticias = () => import('@/views/pantallas/Noticias')
const Noticia = () => import('@/views/pantallas/Noticia')
const Comite = () => import('@/views/pantallas/Comite')
const Proyectos = () => import('@/views/pantallas/Proyectos.vue')
const Proyecto = () => import('@/views/pantallas/Proyecto.vue')
const Videos = () => import('@/views/pantallas/Videos')
const Gerencias = () => import('@/views/pantallas/Gerencias')
const Solicitudes = () => import('@/views/pantallas/Solicitudes')
const Soporte = () => import('@/views/pantallas/Soporte')
const AgendaDirectorio = () => import('@/views/pantallas/AgendaDirectorio')
const MisionVision = () => import('@/views/pantallas/MisionVision')

const baseRoutes = [
  {
    path: '/dash',
    name: 'Dashboard',
    component: Dashboard,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dash/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    children: [
      {
        path: 'users',
        name: 'users',
        component: Users
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/estructura-organizacional',
    name: 'Estructura',
    component: Estructura,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/politicas',
    name: 'Politicas',
    component: Politicas,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/noticias/:category?',
    name: 'Noticias',
    component: Noticias,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/noticia/:id_news',
    name: 'Noticia',
    component: Noticia,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/comite',
    name: 'Comite',
    component: Comite,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/proyectos/:tab?',
    name: 'Proyectos',
    component: Proyectos,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/proyecto/:id_proyecto',
    name: 'Proyecto',
    component: Proyecto,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/videos',
    name: 'Videos',
    component: Videos,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gerencias/:type',
    name: 'Gerencias',
    component: Gerencias,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/solicitudes/:type?',
    name: 'Solicitudes',
    component: Solicitudes,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/soporte/:type?',
    name: 'Soporte',
    component: Soporte,
    children: [], // Import children's here
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agenda-directorio/:type?/:filter?',
    name: 'Soporte',
    component: AgendaDirectorio,
    children: [],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mision_vision',
    name: 'MisionVision',
    component: MisionVision,
    children: [],
    meta: {
      requiresAuth: true
    }
  }
]
const routes = baseRoutes.concat(authRouter)
// export default new Router({routes,})

export default new Router({
  // mode: 'history',
  routes
  // {
  //   path: '/',
  //   component: Page
  // },
  // {
  //   path: '/home',
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   // children: [{
  //   //   path: '/foo',
  //   //   name: 'foo',
  //   //   component: Dash,
  //   //   meta: {
  //   //     requiresAuth: true
  //   //   }
  //   // }],
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
})
