import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ProfileUseCase } from '../profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new ProfileUseCase(usersRepository)

  return useCase
}
