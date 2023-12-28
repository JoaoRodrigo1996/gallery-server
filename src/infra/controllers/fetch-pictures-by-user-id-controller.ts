import { makeFetchPicturesByUserIdUseCase } from '@/use-cases/factories/make-fetch-pictures-by-user-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export class FetchPicturesByUserIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchPicturesByUserIdUseCase = makeFetchPicturesByUserIdUseCase()

    const pictures = await fetchPicturesByUserIdUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send(pictures)
  }
}
