import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '.'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }

    return user
  }

  async save(userId: string, avatarUrl: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarUrl,
      },
    })
  }
}
