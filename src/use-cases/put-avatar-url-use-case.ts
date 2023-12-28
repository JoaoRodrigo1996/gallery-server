import { UsersRepository } from '@/repositories/users-repository'

interface PutAvatarUrlUseCaseRequest {
  userId: string
  avatarUrl: string
}

export class PutAvatarUrlUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, avatarUrl }: PutAvatarUrlUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    user.avatarUrl = avatarUrl

    await this.usersRepository.save(userId, avatarUrl)
  }
}
