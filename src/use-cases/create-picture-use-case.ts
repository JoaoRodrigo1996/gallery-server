import { PicturesRepository } from '@/repositories/pictures-repository'

interface CreatePictureUseCaseRequest {
  userId: string
  pictureUrl: string
}

export class CreatePictureUseCase {
  constructor(private picturesRepository: PicturesRepository) {}

  async execute({
    userId,
    pictureUrl,
  }: CreatePictureUseCaseRequest): Promise<void> {
    await this.picturesRepository.create({
      userId,
      pictureUrl,
    })
  }
}
