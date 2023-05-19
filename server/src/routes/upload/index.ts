import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { uploadFile } from './upload-file'

const routes = async (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  next: (err?: Error | undefined) => void,
) => {
  app.post(
    '/upload',
    async (request, reply) => await uploadFile(request, reply),
  )

  next()
}

const uploadRoutes = fp(routes)

export { uploadRoutes }
