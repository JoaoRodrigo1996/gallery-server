import { PrismaPicturesRepository } from '@/repositories/prisma/prisma-pictures-repository'
import { FetchPicturesByUserIdUseCase } from '../fetch-pictures-by-user-id-use-case'

export function makeFetchPicturesByUserIdUseCase() {
  const picturesRepository = new PrismaPicturesRepository()
  const useCase = new FetchPicturesByUserIdUseCase(picturesRepository)

  return useCase
}
