import { FastifyInstance } from 'fastify'
import { CreatePictureController } from '../controllers/create-picture-controller'
import { verifyJWT } from '../middleware/verify-jwt'
import { FetchPicturesByUserIdController } from '../controllers/fetch-pictures-by-user-id-controller'

const createPicturesController = new CreatePictureController()
const fetchPicturesByUserIdController = new FetchPicturesByUserIdController()

export async function picturesRoutes(app: FastifyInstance) {
  app.post(
    '/pictures',
    { onRequest: [verifyJWT] },
    createPicturesController.handle,
  )

  app.get(
    '/pictures',
    { onRequest: [verifyJWT] },
    fetchPicturesByUserIdController.handle,
  )
}
