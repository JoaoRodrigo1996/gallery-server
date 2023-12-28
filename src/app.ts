import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import cors from '@fastify/cors'

import { env } from './env'
import { usersRoutes } from './infra/routes/users.router'
import { picturesRoutes } from './infra/routes/pictures.router'
import { resolve } from 'node:path'
import { uploadRouter } from './infra/routes/upload.router'

export const app = fastify()

app.register(cors, {
  origin: true,
  credentials: true,
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)
app.register(fastifyMultipart)
app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(usersRoutes)
app.register(picturesRoutes)
app.register(uploadRouter)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //  Here we should log to an external tool like dataDog e.t.c
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
