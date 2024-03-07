import { Router } from 'express'
import controller from '../controllers/objects.controller'
import ensureAuth from '../Middlewares/auth.middleware'

const router = Router()

router.get('/',  controller.getObjects)
router.post('/', controller.createObject)
router.get('/:id',  controller.getObject)
router.put('/:id',  controller.updateObject)
router.delete('/:id',  controller.deleteObject)
router.get('/pdf/:id',  controller.generatePDF)
router.get('/responsable/:responsable',  controller.getObjectbyResponsable)
router.get('/code/:code',  controller.getObjectbyCode)
router.post('/codes', controller.getObjectsByCode)

export default router
