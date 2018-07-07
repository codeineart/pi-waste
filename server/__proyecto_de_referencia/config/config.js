// Archivo de configuración de la app.

const port = process.env.PORT || 3000
const bd = process.env.MONGODB || 'mongodb://localhost:27017/mpm_data'
export { port, bd }
