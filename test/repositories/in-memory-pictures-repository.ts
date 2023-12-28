import { randomUUID } from 'node:crypto'
import { PicturesRepository } from '@/repositories/pictures-repository'
import { Picture, Prisma } from '@prisma/client'

export class InMemoryPicturesRepository implements PicturesRepository {
  public items: Picture[] = []

  async create(data: Prisma.PictureUncheckedCreateInput) {
    const picture = {
      id: randomUUID(),
      pictureUrl: data.pictureUrl,
      createdAt: new Date(),
      userId: data.userId,
    }

    this.items.push(picture)
  }

  async fetchManyByUserId(userId: string) {
    const pictures = this.items.filter((picture) => picture.userId === userId)

    return pictures
  }
}
