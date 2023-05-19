import 'dotenv/config'

import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import jwt from '@fastify/jwt'

import { app, initServer } from './constants/fastify'
import { memoriesRoutes, authRoutes, uploadRoutes } from './routes'
import { resolve } from 'node:path'

const bootstrap = async () => {
  app.register(cors, { origin: true })

  app.register(multipart)

  app.register(fastifyStatic, {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads',
  })

  app.register(jwt, {
    secret: process.env.JWT_SECRET as string,
  })

  await app.register(authRoutes)

  await app.register(memoriesRoutes)

  await app.register(uploadRoutes)

  await initServer()
}

bootstrap()
