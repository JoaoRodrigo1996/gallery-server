import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/repositories/prisma'
import { hash } from 'bcryptjs'

describe('[/POST] - /pictures', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new picture', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: await hash('123456', 9),
      },
    })

    const response = await request(app.server).post('/pictures').send({
      pictureUrl: 'picture-01',
      userId: user.id,
    })

    expect(response.statusCode).toEqual(201)
  })
})
