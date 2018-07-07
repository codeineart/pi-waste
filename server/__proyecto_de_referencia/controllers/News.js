'use strict'

const News = require('../models/News.js')

function GetNews (req, res) {
  // Devuelve los documentos de noticias de la BD. Utiliza un modificador y parámetros para determinar qué documentos obtener.
  //   Llamada: news/modificador?parámetros
  //   Ejemplo: news/obtenerPorPagina?numPagina=1&numNoticiasPorPagina=3&tags=RRHH,aniversario
  //
  //   Modificadores:
  //
  //     'obtenerTodo': obtiene todas las noticias.
  //     'obtenerPorId' ? id: obtiene una noticia especificada en el parámetro id.
  //     'obtenerPorPagina' ? numPagina & numDocumentosPorPagina [& tags]: obtiene una cantidad de noticias igual a lo especificado
  //       en numDocumentosPorPagina, y a partir de determinado documento en la colección según los valores de los parámetros numPagina
  //       y numDocumentosPorPagina.
  //       numPagina: número de página a obtener.
  //       numDocumentosPorPagina: número de documentos contenidos como máximo en cada página.
  //       [tags]: opcional. Obtiene los documentos que contengan todos los tags indicados, separados por coma.
  //     'obtenerNumTotalDocumentos': obtiene el número de documentos de la colección.

  let modificador = req.params.modificador

  switch (modificador) {
    case 'obtenerTodo':
      News.find({}, (err, news) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        res.status(200).send({ news: news })
      }).sort({'creator.date': 1})
      break

    case 'obtenerPorId':
      let id = req.query.id

      News.findById(id, (err, news) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }
        if (!news) {
          return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
        }

        res.status(200).send({ news: news })
      })
      break

    case 'obtenerPorPagina':
      let numPagina = req.query.numPagina
      let numDocumentosPorPagina = Number(req.query.numDocumentosPorPagina)
      let numTotalDocumentos = 0
      let listaTags = []
      let tags = ''
      if (req.query.tags) {
        tags = req.query.tags
        listaTags = tags.split(',')
      }

      // Obtener número de documentos
      News.count((err, count) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }

        numTotalDocumentos = count
      })

      if (tags === '') {
        News.find({}).count((err, count) => {
          if (err) {
            return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
          }

          numTotalDocumentos = count
        })
      } else {
        News.find({ tags: {$all: listaTags} }).count((err, count) => {
          if (err) {
            return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
          }

          numTotalDocumentos = count
        })
      }

      // Obtener documentos.
      if (tags === '') {
        News.find({}, (err, news) => {
          if (err) {
            return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
          }
          if (!news) {
            return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
          }

          res.status(200).send({ numTotalDocumentos: numTotalDocumentos, news: news })
        }).limit(numDocumentosPorPagina).skip((numPagina - 1) * numDocumentosPorPagina).sort({'creator.date': 1})
      } else {
        News.find({ tags: {$all: listaTags} }, (err, news) => {
          if (err) {
            return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
          }
          if (!news) {
            return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
          }

          res.status(200).send({ numTotalDocumentos: numTotalDocumentos, news: news })
        }).limit(numDocumentosPorPagina).skip((numPagina - 1) * numDocumentosPorPagina).sort({'creator.date': 1})
      }
      break

    case 'obtenerNumTotalDocumentos':
      News.find({}, (err, news) => {
        if (err) {
          return res.status(500).send({ message: 'Ha ocurrido un error al consultar la base de datos. ' + err })
        }
        if (!news) {
          return res.status(404).send({ message: 'El elemento no existe en la base de datos.' })
        }

        res.status(200).send({ numTotalDocumentos: news.length })
      })
      break
  }
}

function NewNews (req, res) {
  let news = new News()

  news.creator._id = req.body.creator._id
  news.creator.name = req.body.creator.name
  news.creator.date = req.body.creator.date
  news.guest_users_id = req.body.guest_users_id
  news.available = req.body.available
  news.tags = req.body.tags
  news.cover_url = req.body.cover_url
  news.images_url = req.body.images_url
  news.title = req.body.title
  news.content = req.body.content

  news.save((err, newsStored) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err })
    }

    res.status(200).send({ news: newsStored })
  })
}

function UpdateNews (req, res) {
  let id = req.params.id
  let body = req.body

  News.findByIdAndUpdate(id, body, (err, newsUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err })
    }

    res.status(200).send({ news: newsUpdated })
  })
}

function DeleteNews (req, res) {
  let id = req.params.id

  News.findById(id, (err, news) => {
    if (err) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
    }

    news.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'Ha ocurrido un error al intentar borrar un elemento de la base de datos. ' + err })
      }

      res.status(200).send({ message: 'El elemento ha sido borrado' })
    })
  })
}

module.exports = {
  GetNews,
  NewNews,
  UpdateNews,
  DeleteNews
}
