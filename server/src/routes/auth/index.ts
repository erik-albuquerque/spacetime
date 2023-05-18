import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { register } from './register'

const routes = async (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  next: (err?: Error | undefined) => void,
) => {
  app.post(
    '/register',
    async (request, reply) => await register(request, reply),
  )

  next()
}

const authRoutes = fp(routes)

export { authRoutes }
