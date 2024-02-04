import { Router } from 'express'
import controller from '../controllers/objects.controller'
import ensureAuth from '../Middlewares/auth.middleware'

const router = Router()

router.get('/', ensureAuth, controller.getObjects)
router.post('/', ensureAuth, controller.createObject)
router.get('/:id', ensureAuth, controller.getObject)
router.put('/:id', ensureAuth, controller.updateObject)
router.delete('/:id', ensureAuth, controller.deleteObject)
router.get('/responsable/:responsable', ensureAuth, controller.getObjectbyResponsable)
router.get('/pdf/:responsable', ensureAuth, controller.createPDF)

export default router
