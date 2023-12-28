import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PutAvatarUrlUseCase } from '../put-avatar-url-use-case'

export function makeAvatarUrlUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new PutAvatarUrlUseCase(usersRepository)

  return useCase
}
