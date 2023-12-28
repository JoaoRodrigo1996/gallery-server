import { PrismaPicturesRepository } from '@/repositories/prisma/prisma-pictures-repository'
import { CreatePictureUseCase } from '../create-picture-use-case'

export function makeCreatePictureUseCase() {
  const picturesRepository = new PrismaPicturesRepository()
  const useCase = new CreatePictureUseCase(picturesRepository)

  return useCase
}
