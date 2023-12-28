import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface ProfileUseCaseRequest {
  userId: string
}

interface ProfileUseCaseResponse {
  user: User
}

export class ProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found!')
    }

    return { user }
  }
}
