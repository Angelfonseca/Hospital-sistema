import { Router } from 'express'
import controller from '../controllers/objects.controller'
import ensureAuth from '../Middlewares/auth.middleware'

const router = Router()

router.get('/',  controller.getObjects)
router.post('/', controller.createObject)
router.get('/:id',  controller.getObject)
router.put('/:id',  controller.updateObject)
router.delete('/:id',  controller.deleteObject)
router.get('/xlsx/:id',  controller.generateExcelbyResponsable)
router.get('/responsable/:responsable',  controller.getObjectbyResponsable)
router.post('/genxlsx/codes',  controller.generateExcelbyCodes)
router.get('/codes/:code',  controller.getObjectbyCode)
router.post('/responsable/update/codes',  controller.updateResponsableofObjects)

export default router
