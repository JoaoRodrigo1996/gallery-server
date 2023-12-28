import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user-use-case'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUserUseCase(usersRepository)

  return useCase
}
