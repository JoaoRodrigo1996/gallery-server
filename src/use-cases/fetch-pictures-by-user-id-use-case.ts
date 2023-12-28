import { PicturesRepository } from '@/repositories/pictures-repository'
import { Picture } from '@prisma/client'

interface FetchPicturesByUserIdUseCaseRequest {
  userId: string
}

interface FetchPicturesByUserIdUseCaseResponse {
  pictures: Picture[]
}

export class FetchPicturesByUserIdUseCase {
  constructor(private picturesRepository: PicturesRepository) {}

  async execute({
    userId,
  }: FetchPicturesByUserIdUseCaseRequest): Promise<FetchPicturesByUserIdUseCaseResponse> {
    const pictures = await this.picturesRepository.fetchManyByUserId(userId)

    return { pictures }
  }
}
