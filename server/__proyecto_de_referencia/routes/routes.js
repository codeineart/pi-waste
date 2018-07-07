// Archivo para definir las rutas de la api RESTful.

'use strict'

const express = require('express')
const api = express.Router()
const PositionController = require('../controllers/Positions.js')
const DepartmentController = require('../controllers/Departments.js')
const InfoController = require('../controllers/Info.js')
const PeerCommitteeController = require('../controllers/PeerCommittee.js')
const OrganizationChartController = require('../controllers/OrganizationChart.js')
const ProjectController = require('../controllers/Projects.js')
const VideoController = require('../controllers/Videos.js')
const EventController = require('../controllers/Events.js')
const NewsController = require('../controllers/News.js')
const FileController_Legacy = require('../controllers/Files_legacy.js')
const FileController = require('../controllers/Files.js')
const RequestController = require('../controllers/Requests.js')
const SysConfigController = require('../controllers/Sysconfig')
const HomeController = require('../controllers/Home.js')
const UserController = require('../controllers/Users')
const AddresseeController = require('../controllers/Addressees.js')
const MailingController = require('../controllers/MailingController.js')

/**
 * TESTS AND AUTH SERVICE ENDPOINTS
 */

const _authService = require('./auth.js')
const _testService = require('./test.js')
api.use('/auth', _authService)
api.use('/test', _testService)

/**********************************************************
 *                USER & AUTH CONTROLLER                  *
 **********************************************************/

// Operaciones sobre colección Users
api.get('/user/:modificador', UserController.GetUser)
api.post('/user', UserController.NewUser)

// api.post('', UserController.)

/**********************************************************
 *                 POSITIONS CONTROLLER                   *
 **********************************************************/

// Operaciones sobre colección Positions
api.get('/position/:id', PositionController.GetPosition)
api.get('/position', PositionController.GetPositions)
api.post('/position', PositionController.NewPosition)
api.put('/position/:id', PositionController.UpdatePosition)
api.delete('/position/:id', PositionController.DeletePosition)

/**********************************************************
 *               DEPARTMENTS CONTROLLER                   *
 **********************************************************/

// Operaciones sobre colección Departments
api.get('/department/:id', DepartmentController.GetDepartment)
api.get('/department', DepartmentController.GetDepartments)
api.post('/department', DepartmentController.NewDepartment)
api.put('/department/:id', DepartmentController.UpdateDepartment)
api.delete('/department/:id', DepartmentController.DeleteDepartment)

/**********************************************************
 *                  COMMENT HEADER                        *
 **********************************************************/

// Operaciones sobre colección Info
api.get('/info/:doc_type', InfoController.GetInfo)
api.post('/info', InfoController.NewInfo)
api.put('/info/:doc_type', InfoController.UpdateInfo)
api.delete('/info/:doc_type', InfoController.DeleteInfo)

/**********************************************************
 *              PEER_COMMITEE CONTROLLER                  *
 **********************************************************/

// Operaciones sobre colección Info, específicamente sobre miembros del Peer Committee.
api.get('/peer_committee/:id', PeerCommitteeController.GetPeerCommitteeMember)
api.get('/peer_committee', PeerCommitteeController.GetPeerCommitteeMembers)
api.post('/peer_committee', PeerCommitteeController.NewPeerCommitteeMember)
api.put('/peer_committee/:id', PeerCommitteeController.UpdatePeerCommitteeMember)
api.delete('/peer_committee/:id', PeerCommitteeController.DeletePeerCommitteeMember)

// Operaciones sobre colección Info, específicamente sobre miembros de la Estructura organizacional.
api.get('/organization_chart/:id', OrganizationChartController.GetOrganizationChartMember)
api.get('/organization_chart', OrganizationChartController.GetOrganizationChartMembers)
api.post('/organization_chart', OrganizationChartController.NewOrganizationChartMember)
api.put('/organization_chart/:id', OrganizationChartController.UpdateOrganizationChartMember)
api.delete('/organization_chart/:id', OrganizationChartController.DeleteOrganizationChartMember)

/***********************************************************
 *                  PROJECT CONTROLLER                     *
 **********************************************************/

// Operaciones sobre colección Projects
api.get('/project/:id', ProjectController.GetProject)
api.get('/project', ProjectController.GetProjects)
api.post('/project', ProjectController.NewProject)
api.put('/project/:id', ProjectController.UpdateProject)
api.delete('/project/:id', ProjectController.DeleteProject)

/**********************************************************
 *                  VIDEOS CONTROLLER                     *
 **********************************************************/

// Operaciones sobre colección Videos
api.get('/video/:id', VideoController.GetVideo)
api.get('/video', VideoController.GetVideos)
api.post('/video', VideoController.NewVideo)
api.put('/video/:id', VideoController.UpdateVideo)
api.delete('/video/:id', VideoController.DeleteVideo)

/**********************************************************
 *               EVENTS CONTROLLER                        *
 **********************************************************/

// Operaciones sobre colección Events
api.get('/event/:modificador', EventController.GetEvent)
api.post('/event', EventController.NewEvent)
api.put('/event/:id', EventController.UpdateEvent)
api.delete('/event/:id', EventController.DeleteEvent)

/**********************************************************
 *                   NEWS CONTROLLER                      *
 **********************************************************/

// Operaciones sobre colección News
api.get('/news/:modificador', NewsController.GetNews)
api.post('/news', NewsController.NewNews)
api.put('/news/:id', NewsController.UpdateNews)
api.delete('/news/:id', NewsController.DeleteNews)

/**********************************************************
 *                  FILES CONTROLLER [2]                  *
 **********************************************************/

/**
 * MÉTODOS LEGACY
 */
api.get('/file/:modificador', FileController_Legacy.GetFile)
api.post('/file/:modificador', FileController_Legacy.PostFile)
api.put('/file/:id', FileController_Legacy.UpdateFile)
api.delete('/file/:id', FileController_Legacy.DeleteFile)

/**
 * MÉTODOS GRIDFS
 */
// api.get('/fs/:modificador', FileController.GetFile)
api.post('/fs/upload', FileController.postFiles)
// api.delete('/fs/:id', FileController.DeleteFile)

/**********************************************************
 *                 REQUESTS CONTROLLER                    *
 **********************************************************/

// Operaciones sobre colección Requests
api.get('/request/:id', RequestController.GetRequest)
api.get('/request', RequestController.GetRequests)
api.post('/request', RequestController.NewRequest)
api.put('/request/:id', RequestController.UpdateRequest)
api.delete('/request/:id', RequestController.DeleteRequest)

/**********************************************************
 *                  ADRESSES CONTROLLER                   *
 **********************************************************/

// Operaciones sobre Addressees.js (destinatarios de Soporte y Solicitudes)
api.get('/addressee/:modificador', AddresseeController.GetAddressees)
api.put('/addressee/:id', AddresseeController.UpdateAddreesse)

/**********************************************************
 *                  OTROS CONTROLADORES                   *
 **********************************************************/

// Massive mailing
api.post('/massive-mailing', MailingController.SendMail)

// Operaciones sobre el Home
api.get('/home/:modificador', HomeController.GetHome)

// Operaciones sobre variables de sistema
api.post('/set_configs', SysConfigController.sysConfigSet)
api.get('/getpermits', SysConfigController.getPermits)

module.exports = api
