import Fastify from 'fastify'
import { PORT } from './port'

const app = Fastify({
  logger: true,
})

const initServer = async () => {
  try {
    await app
      .listen({
        port: PORT,
        // host: '0.0.0.0',
      })
      .then(() =>
        console.log(`HTTP Server Running on http://localhost:${PORT}`),
      )
  } catch (error) {
    app.log.error(error)

    process.exit(1)
  }
}

export { app, initServer }
