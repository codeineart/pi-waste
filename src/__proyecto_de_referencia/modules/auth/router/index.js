const Login = () => import('../views/Login')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    title: "Login Area",
    alias: '/'
  }
]