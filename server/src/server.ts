import 'dotenv/config'
import cors from '@fastify/cors'
import { app, initServer } from './constants/fastify'
import { memoriesRoutes } from './routes'

const bootstrap = async () => {
  app.register(cors, { origin: true })

  await app.register(memoriesRoutes)

  await initServer()
}

bootstrap()
