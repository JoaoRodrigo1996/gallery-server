import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetUserProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getProfileUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ user: { ...user, password: undefined } })
  }
}
