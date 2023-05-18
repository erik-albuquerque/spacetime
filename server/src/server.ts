import 'dotenv/config'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { app, initServer } from './constants/fastify'
import { memoriesRoutes, authRoutes } from './routes'

const bootstrap = async () => {
  app.register(cors, { origin: true })

  app.register(jwt, {
    secret: process.env.JWT_SECRET as string,
  })

  await app.register(authRoutes)

  await app.register(memoriesRoutes)

  await initServer()
}

bootstrap()
