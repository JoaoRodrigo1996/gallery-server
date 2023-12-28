import { InvalidCredentialsError } from '@/use-cases/error/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authetnicateBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = authetnicateBodySchema.parse(request.body)

    try {
      const authenticateUseCase = makeAuthenticateUseCase()
      const { user } = await authenticateUseCase.execute({ email, password })

      const token = await reply.jwtSign({ email }, { sign: { sub: user.id } })
      const refreshToken = await reply.jwtSign(
        { email },
        { sign: { sub: user.id, expiresIn: '7d' } },
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send({ token })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
