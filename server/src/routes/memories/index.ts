import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

import { getAllMemories } from './get-all-memories'
import { getMemoryById } from './get-memory-by-id'
import { createNewMemory } from './create-new-memory'
import { updateMemory } from './update-memory'
import { deleteMemory } from './delete-memory'

const routes = async (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  next: (err?: Error | undefined) => void,
) => {
  app.addHook('preHandler', async (request) => await request.jwtVerify())

  app.get('/memories', async (request, reply) => getAllMemories(request, reply))

  app.get('/memories/:id', async (request, reply) =>
    getMemoryById(request, reply),
  )

  app.post('/memories', async (request, reply) =>
    createNewMemory(request, reply),
  )

  app.put('/memories/:id', async (request, reply) =>
    updateMemory(request, reply),
  )

  app.delete('/memories/:id', async (request, reply) =>
    deleteMemory(request, reply),
  )

  next()
}

const memoriesRoutes = fp(routes)

export { memoriesRoutes }
