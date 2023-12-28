import { makeCreatePictureUseCase } from '@/use-cases/factories/make-create-picture-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreatePictureController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createPictureBodySchema = z.object({
      pictureUrl: z.string(),
    })

    const { pictureUrl } = createPictureBodySchema.parse(request.body)

    const createPictureUseCase = makeCreatePictureUseCase()
    await createPictureUseCase.execute({
      pictureUrl,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  }
}
