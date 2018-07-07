const Users = () => import('../views/Crud')

export default [
  {
    path: 'users',
    name: 'Users',
    component: Users,
    title: "User Management",
  }
]