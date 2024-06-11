import { Router } from 'express'
import controller from '../controllers/objects.controller'
import ensureAuth from '../Middlewares/auth.middleware'

const router = Router()

router.get('/crud',  ensureAuth,controller.getObjects)
router.post('/crud', ensureAuth,controller.createObject)
router.delete('/crud/:id',  ensureAuth,controller.deleteObject)
router.get('/xlsx/:id',  ensureAuth,controller.generateExcelbyResponsable)
router.get('/responsable/:responsable',  ensureAuth,controller.getObjectbyResponsable)
router.post('/xlsx',  ensureAuth,controller.generateExcelbyCodes)
router.get('/codes/:code',  ensureAuth,controller.getObjectbyCode)
router.post('/responsable/update/codes',  ensureAuth,controller.updateResponsableofObjects)
router.put('/crud/:code', ensureAuth,controller.updateObjectbyCode)
router.post('/update/codes', ensureAuth,controller.updateObjectsbyCodes)
router.get('/responsables', ensureAuth,controller.getResponsablesofObjects)
router.get('/crud/:code', ensureAuth,controller.getObjectbyCode)
router.get('/ubicaciones', ensureAuth,controller.getUbicacionesofObjects)
router.get('/ubicacion/:ubicacion', ensureAuth,controller.getObjectsfromUbicacion)
router.post('/ubicaciones', ensureAuth,controller.updateUbicationofObject)
router.post('/ids', ensureAuth,controller.getIdsbyCodes)

export default router
