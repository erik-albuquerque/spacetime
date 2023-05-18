import 'dotenv/config'
import cors from '@fastify/cors'
import { app, initServer } from './constants/fastify'
import { memoriesRoutes, authRoutes } from './routes'

const bootstrap = async () => {
  app.register(cors, { origin: true })

  await app.register(authRoutes)

  await app.register(memoriesRoutes)

  await initServer()
}

bootstrap()
