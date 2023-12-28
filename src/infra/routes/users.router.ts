import { FastifyInstance } from 'fastify'
import { RegisterUserController } from '../controllers/register-user-controller'
import { GetUserProfileController } from '../controllers/profile-controller'
import { AuthenticateUserController } from '../controllers/authenticate-user-controller'
import { verifyJWT } from '../middleware/verify-jwt'
import { PutAvatarUrlController } from '../controllers/put-avatar-url-controller'

const registerUserController = new RegisterUserController()
const getUserProfileController = new GetUserProfileController()
const authenticateUserController = new AuthenticateUserController()
const avatarUrlController = new PutAvatarUrlController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController.handle)
  app.post('/sessions', authenticateUserController.handle)

  app.get('/me', { onRequest: [verifyJWT] }, getUserProfileController.handle)
  app.put('/avatarUrl', { onRequest: [verifyJWT] }, avatarUrlController.handle)
}
