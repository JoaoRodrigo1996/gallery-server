import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middleware/verify-jwt'
import { UploadPictureController } from '../controllers/upload-picture-controller'

const uploadPictureController = new UploadPictureController()

export async function uploadRouter(app: FastifyInstance) {
  app.post(
    '/upload',
    { onRequest: [verifyJWT] },
    uploadPictureController.handle,
  )
}
