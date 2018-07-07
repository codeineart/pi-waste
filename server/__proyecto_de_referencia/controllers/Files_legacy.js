'use strict'

const File = require('../models/Files.js')
const Path = require('path')
const formidable = require('formidable')
const mongoose = require('mongoose')
const gridfs = require('gridfs-stream')
const fs = require('fs')

function GetFile (req, res) {
  // Devuelve los documentos de archivos de la BD. Utiliza un modificador y parámetros para determinar qué documentos obtener.
  //   Llamada: file/modificador?parámetros
  //   Ejemplo: file/obtenerArchivo?id=x
  //
  //   Modificadores:
  //
  //     'obtenerArchivos': devuelve todos los documentos de archivos.
  //     'obtenerArchivo' ? id: devuelve el documento del archivo especificado en el parámetro id.
  //     'obtenerArchivosDepartamento' ? area: devuelve todos los documentos asociados al departamento pasado a través de la query
  //     'allowed' ? area: nombre de gerencia, query: funcionalidades de datatables
  //     'search' ? pattern: patrón regex a buscar en índice

  let modificador = req.params.modificador

  switch (modificador) {
    case 'search':
      console.log('Searching text...' + req.query.pattern)
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

      console.log(query)

      // let searchString = query.search != undefined ? query.search : 'Nyan_cat'
      let limit = query.limit
      let offset = query.offset
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

        res.status(200).send({
          files: files
        })
      }).sort({
        created: 1
      })
      break

    case 'upload':
      res.sendFile(Path.join(Path.join(__dirname, '/../..'), '/test.html'))
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

function PostFile (req, res) {
  // Crea un documento en la colección de Archivos en la BD, o sube un archivo de documento al servidor. Utiliza un modificador y parámetros para determinar la operación a realizar.
  //   Llamada: file/modificador?parámetros
  //   Ejemplo: file/crear
  //
  //   Modificadores:
  //
  //     'crear': crea un documento en la colección de Archivos en la BD.
  //     'subir': sube al servidor un archivo de documento seleccionado en la vista.
  let modificador = req.params.modificador

  switch (modificador) {
    case 'test_upload':
      let gridFsBlock = {
        fileName: '',
        fileType: '',
        fileUrl: ''
      }

      // Formidable plugin
      let form = new formidable.IncomingForm()

      // Parse the incoming request
      form.parse(req)

      // On upload
      form.on('fileBegin', function (name, file) {
        // Define the final location of the upladed file
        // Needed, otherwise formidable plugin doesn't save
        // the file
        file.path = Path.join(__dirname, '../private', file.name)

        // Prepare the gridFsblock to store file on database
        gridFsBlock.fileName = file.name
        gridFsBlock.fileType = file.type
        gridFsBlock.fileUrl = file.path
      })

      form.on('end', function () {
        // console.log(`Name: ${name} | File: ${file}`)
        // console.log('Upload finished. Writting to GridFs')
        // file.path = Path.join(tempDirFolder, file.name)
        // fileExplorer.writeFile(name, file.path)
        console.log(JSON.stringify(gridFsBlock))
        console.log('End of upload. enter the VOID')
        fileExplorer.writeFile(req, res, gridFsBlock)
      })
      break
    case 'crear':
      let file = new File()

      file.name = req.body.name
      file.type = req.body.type
      file.creator.id = req.body.creator.id
      file.creator.section = req.body.creator.section
      file.creator.name = req.body.creator.name
      file.creator.date = req.body.creator.date
      file.available = req.body.available
      file.url = req.body.url
      file.size_Mb = req.body.size_Mb
      file.last_modification = req.body.last_modification
      file.created = req.body.created

      file.save((err, fileStored) => {
        if (err) {
          return res.status(500).send({
            message: 'Ha ocurrido un error al intentar guardar los datos en la base de datos. ' + err
          })
        }

        res.status(200).send({
          file: fileStored
        })
      })
      break

    case 'subir':
      const Path = require('path')

      var form = new formidable.IncomingForm()

      form.parse(req)

      form.on('fileBegin', function (name, file) {
        file.path = Path.join(__dirname, Path.join('../public/documentos-subidos/', file.name))
        res.status(200).send({ path: 'documentos-subidos/' + file.name })
      })
      break
  }
}

function UpdateFile (req, res) {
  let id = req.params.id
  let body = req.body

  File.findByIdAndUpdate(id, body, (err, fileUpdated) => {
    if (err) {
      return res.status(500).send({
        message: 'Ha ocurrido un error al intentar actualizar un elemento de la base de datos. ' + err
      })
    }

    res.status(200).send({
      file: fileUpdated
    })
  })
}

function DeleteFile (req, res) {
  let id = req.params.id

  File.remove(
    {
      _id: id
    },
    (err, result) => {
      if (err) {
        return res.status(500).send({
          message: 'Ha ocurrido un error al intentar eliminar el archivo deseado.'
        })
      }

      return res.status(200).send({
        message: 'El archivovha sido eliminado con éxito :)'
      })
    }
  )
}

module.exports = {
  GetFile,
  PostFile,
  UpdateFile,
  DeleteFile
}
