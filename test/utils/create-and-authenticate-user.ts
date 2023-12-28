import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/repositories/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 9),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
