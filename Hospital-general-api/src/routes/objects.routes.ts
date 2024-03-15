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
router.post('/xlsx/codes',  controller.generateExcelbyCodes)
router.get('/code/:code',  controller.getObjectbyCode)
router.post('/codes', controller.getObjectsByCode)

export default router
