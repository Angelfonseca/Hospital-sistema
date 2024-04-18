import { Router } from 'express'
import controller from '../controllers/objects.controller'
import ensureAuth from '../Middlewares/auth.middleware'

const router = Router()

router.get('/crud',  controller.getObjects)
router.post('/crud', controller.createObject)
router.delete('/crud/:id',  controller.deleteObject)
router.get('/xlsx/:id',  controller.generateExcelbyResponsable)
router.get('/responsable/:responsable',  controller.getObjectbyResponsable)
router.post('/xlsx',  controller.generateExcelbyCodes)
router.get('/codes/:code',  controller.getObjectbyCode)
router.post('/responsable/update/codes',  controller.updateResponsableofObjects)
router.put('/crud/:code', controller.updateObjectbyCode)
router.post('/update/codes', controller.updateObjectsbyCodes)
router.get('/responsables', controller.getResponsablesofObjects)
router.get('/crud/:code', controller.getObjectbyCode)
router.get('/ubicaciones', controller.getUbicacionesofObjects)
router.get('/ubicacion/:ubicacion', controller.getObjectsfromUbicacion)
router.put('/crud/:code', controller.updateObjectbyCode)
router.post('/update/codes', controller.updateObjectsbyCodes)
router.get('/responsables', controller.getResponsablesofObjects)
router.get('/crud/:code', controller.getObjectbyCode)
export default router
