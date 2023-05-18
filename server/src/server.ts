import { app, initServer } from './constants/fastify'
import { memoriesRoutes } from './routes'

const bootstrap = async () => {
  await app.register(memoriesRoutes)

  await initServer()
}

bootstrap()
