import { Prisma } from '@prisma/client'
import { PicturesRepository } from '../pictures-repository'
import { prisma } from '.'

export class PrismaPicturesRepository implements PicturesRepository {
  async create(data: Prisma.PictureUncheckedCreateInput) {
    await prisma.picture.create({ data })
  }

  async fetchManyByUserId(userId: string) {
    const pictures = await prisma.picture.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return pictures
  }
}
