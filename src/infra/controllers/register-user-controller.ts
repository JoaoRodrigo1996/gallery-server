import { UserAlreadyExistsError } from '@/use-cases/error/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class RegisterUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    try {
      const registerUserUseCase = makeRegisterUserUseCase()
      await registerUserUseCase.execute({ name, email, password })
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      }
    }

    return reply.status(201).send()
  }
}
