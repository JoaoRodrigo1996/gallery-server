import { Picture, Prisma } from '@prisma/client'

export interface PicturesRepository {
  create(data: Prisma.PictureUncheckedCreateInput): Promise<void>
  fetchManyByUserId(userId: string): Promise<Picture[]>
}
