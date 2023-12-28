import { makeAvatarUrlUseCase } from '@/use-cases/factories/make-avatar-url-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class PutAvatarUrlController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const avatarUrlBodySchema = z.object({
      avatarUrl: z.string().url(),
    })

    const { avatarUrl } = avatarUrlBodySchema.parse(request.body)

    try {
      const avatarUrlUseCase = makeAvatarUrlUseCase()
      await avatarUrlUseCase.execute({ avatarUrl, userId: request.user.sub })
    } catch (error) {
      console.log(error)
    }

    return reply.status(201).send()
  }
}
