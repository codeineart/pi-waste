'use strict'

const File = require('../models/Files.js')
const Path = require('path')
const formidable = require('formidable')
const mongoose = require('mongoose')
const gridfs = require('gridfs-stream')
const fs = require('fs')

/**********************************************************
 *             SINGLETON CLASS FOR GRIDFS                 *
 **********************************************************/

class GridFs {
  constructor () {
    console.info('CREANDO CONEXIÓN CON SISTEMA DE EXPLORACIÓN DE ARCHIVOS...')

    // variables definition
    this.gfs
    this.connection

    mongoose.connect('mongodb://localhost:27017/mpm_data', {
      useMongoClient: true
    })

    mongoose.Promise = global.Promise

    gridfs.mongo = mongoose.mongo

    this.connection = mongoose.connection

    this.connection.on('error', () => {
      console.error('ERROR FATAL: Error al levantar sistema de archivos GridFs!!')
      process.exit(1)
    })

    let connectWrapperFunction = () => {
      this.gfs = gridfs(this.connection.db)
      console.info('LEVANTAMIENTO DEL SISTEMA DE ARCHIVOS GRIDFS LEVANTADO')
    }

    this.connection.once('open', connectWrapperFunction)
  }

  // Writes file into mongodb's grid filesystem
  writeFile (req, res, file) {
    // Variable declaration
    let writeStream

    writeStream = this.gfs.createWriteStream({
      filename: file.fileName,
      metadata: {
        availability: file.availability,
        uploader: file.uploader
      }
    })
    fs.createReadStream(file.fileUrl).pipe(writeStream)

    writeStream.on('close', file => {
      return res.send('Archivo creado en sistema GridFs: ' + file.filename)
    })
  }

  // Reads file into mongodb's grid filesystem
  readFile (req, res, gridFsBlock) {
    this.gfs.exist({ filename: gridFsBlock.fileName }, (err, file) => {
      if (err || file) {
        res.send('File not found')
      } else {
        let readstream = this.gfs.createReadStream({ filename: gridFsBlock.fileName })
        readstream.pipe(res)
      }
    })
  }

  // Erases file into mongodb's grid filesystem
  eraseFile () {}

  // Retrieves file's metadata from mongo's DB grid filesystem
  retrieveMetadata () {}
}

// Singleton instance: creates a new connection to database
const gridFsNautilus = new GridFs()

/**********************************************************
 *               MÉTODOS DEL CONTROLADOR                  *
 **********************************************************/

function getFiles () {
  let modificador = req.params.modificador

  switch (modificador) {
    case 'search':
      let searchPattern = req.query.pattern

      let responseData

      File.find(
        {
          name: {
            $regex: '.*' + searchPattern + '.*',
            $options: 'i'
          }
        },
        (err, files) => {
          responseData = files
        }
      )

      // Fixed Delay
      setTimeout(() => {
        return res.status(200).json({
          data: responseData,
          count: responseData.length
        })
      }, 500)

      break

    case 'allowed':
      /**
       * TODO:
       * - check if depto exists in system configs
       * - check if requesting user has enough permissions
       * - just then execute query on server (saves resources)
       */

      let departamento = req.query.area

      let query = JSON.parse(req.query.query)

      let limit = query.limit

      let offset = query.offset

      // Translates datatable name into field name
      let sort = (() => {
        switch (query.sort) {
          case 'file_name':
            return 'name'
            break
          case 'file_visibility':
            return 'available'
            break
          case 'file_owner':
            return 'creator.name'
            break
          case 'file_last_modified':
            return 'creator.date'
            break
          case 'file_url':
            return 'url'
            break
          case 'file_size':
            return 'size_Mb'
            break
          case 'file_type':
            return 'type'
            break
          default:
            break
        }
      })()

      let order = (() => {
        if (query.order == 'asc') {
          return 1
        } else if (query.order == 'desc') {
          return -1
        } else {
          return -1
        }
      })()

      let numberOfFiles
      let sortObject = {}
      sortObject[sort] = order

      /**********************************************************
       *              FIND AND RETRIEVE FILES                   *
       **********************************************************/
      // let searchString = query.search != undefined ? query.search : 'aenean.ppt'
      // console.log(searchString)

      File.count(
        (() => {
          if (departamento == 'admin_dashboard') {
            return {}
          } else {
            return {
              available: {
                $in: ['public', departamento]
              }
            }
          }
        })(),
        (err, count) => {
          console.log('Total Files available:')
          console.log(count)
          numberOfFiles = count
        }
      )

      File.find(
        (() => {
          if (departamento == 'admin_dashboard') {
            return {}
          } else {
            return {
              available: {
                $in: ['public', departamento]
              }
            }
          }
        })(),
        (err, files) => {
          if (err) {
            return res.status(500).send({
              message: 'Ha ocurrido un error al consultar la base de datos. ' + err
            })
          }
          if (!files) {
            return res.status(404).send({
              message: 'El elemento no existe en la base de datos.'
            })
          }

          console.info(`
        ${String(Object.keys(files).length)} Files Retrieved:
        [ ${Object.keys(files).map(key => {
          return files[key].name
        })} ]
        `)
        }
      )
        .limit(limit)
        .skip(offset)
        .sort(sortObject)
        .exec((err, files) => {
          if (err) {
            return res.status(500).send({
              message: 'Ha ocurrido un error al consultar la base de datos :( ' + err
            })
          }
          // return res.status(200).json({ data: files, count: numberOfFiles })
          setTimeout(() => {
            return res.status(200).json({
              data: files,
              count: numberOfFiles
            })
          }, 500)
        })

      break
    case 'obtenerArchivos':
      File.find({}, (err, files) => {
        if (err) {
          return res.status(500).send({
            message: 'Ha ocurrido un error al consultar la base de datos. ' + err
          })
        }
        if (!file) {
          return res.status(404).send({
            message: 'El elemento no existe en la base de datos.'
          })
        }

        res.status(200).send({
          file: file
        })
      })
      break
    case 'obtenerArchivo':
      /**
       * CAMBIAR FUNCIONALIDAD A MÉTODO
       * DE DESCARGA DE ARCHIVO???
       */
      let id = req.query.id

      File.findById(id, (err, file) => {
        if (err) {
          return res.status(500).send({
            message: 'Ha ocurrido un error al consultar la base de datos. ' + err
          })
        }
        if (!file) {
          return res.status(404).send({
            message: 'El elemento no existe en la base de datos.'
          })
        }

        res.status(200).send({
          file: file
        })
      })
      break
  }
}

function postFiles (req, res) {
  let formUploaded
  let file_object

  formUploaded = new formidable.IncomingForm()
  formUploaded.parse(req)

  // Metadata stream parsing
  formUploaded.on('field', function (field_name, field_data) {
    // console.info(`
    // on field:
    // Name: ${field_name} || value: ${field_data}
    // `)
  })

  // File stream parsing
  formUploaded.on('fileBegin', (file_field_name, file_field_data) => {
    // console.info(`
    // on file Begin:
    // Name: ${name} || value: ${JSON.stringify(file)}
    // `)
    file_object.path = Path.join(__dirname, '../private', file_field_data.name)
    // console.info(`Name: ${file_field_name} || value: ${JSON.stringify(file)}`)
  })

  // File stream upload end
  formUploaded.on('end', () => {
    // Move the data into mongo's database
    gridFsNautilus.writeFile(req, res, file_object)
  })
}

module.exports = {
  postFiles
}
