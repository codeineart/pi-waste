function getUsuarios() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolved(data)
    }, 2000)
  })
}

function getUsuario(id) {
  return new Promise((resolved, reject) => {
    setTimeout(() =>{
      resolved(usuarios.filter((usuario) => usuario.id === id)[0])
    }, 200)
  })
}

function getProfesion(id){
  return new Promise((resolved, reject) => {
    setTimeout(() =>{
      resolved(profesion[id])
    }, 200) 
  })
}


// getUsuarios()
//   .then((usuarios) => getUsuario(usuarios[1].id))
//   .then((usuario) => getProfesion(usuario.profesion_id))
//   .then((profesion) => console.log("La profesión es", profesion))

Promise.all([getProfesion(1),getProfesion(2)])
  .then((respuesta) => console.log(respuesta)) 

/**
 * Currying
 */
  
// Non-ES6 syntax
function sumarConCurrying(a) {
  // closure
  return function(b) {
    return a + b
  }
}

// ES6 Syntax
const _sumarConCurrying = (a) => (b) => (c) => a + b + c 

// Partial functions
const __sumarConCurrying = (a) => (b) => (c) => a + b + c 
const add10 = sumarConCurrying(10)(2)
console.log(add10(5))     // 17

/**
 * Async/Await
 */

 const fetch = require('node-fetch')

 function getNombre(username) {
   const url = `https://api.github.com/users/${username}`
   fetch(url)
        .then(respuesta => respuesta.json())
        .then(json => {
          console.log(json.name)
        })
 }

 async function getNombreAsyncAwait(username) {
  const url = `https://api.github.com/users/${username}`
  const respuesta = await fetch(url)
  const json = await respuesta.json

  if (respuesta.status !== 200)
    throw Error('Fuck!')

  return json.name

 }


 /**
  * Async functions calls
  */
(async function() {
  try {
    const nombre = await getNombreAsyncAwait('inexistente')
    console.log(nombre)
  } catch (e) {
    console.log(`Error: ${e}`)
  }
})()

 const nombre = getNombreAsyncAwait('codeinearts')
    .then((nombre) => console.log(nombre))
    .catch((e) => console.log(`Error: ${e}`))
 