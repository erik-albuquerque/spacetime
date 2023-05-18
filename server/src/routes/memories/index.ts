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
  app.route({
    method: 'GET',
    url: '/memories',
    preHandler: async (request) => await request.jwtVerify(),
    handler: async (request, reply) => getAllMemories(request, reply),
  })

  app.route({
    method: 'GET',
    url: '/memories/:id',
    preHandler: async (request) => await request.jwtVerify(),
    handler: async (request, reply) => getMemoryById(request, reply),
  })

  app.route({
    method: 'POST',
    url: '/memories',
    preHandler: async (request) => await request.jwtVerify(),
    handler: async (request, reply) => createNewMemory(request, reply),
  })

  app.route({
    method: 'PUT',
    url: '/memories/:id',
    preHandler: async (request) => await request.jwtVerify(),
    handler: async (request, reply) => updateMemory(request, reply),
  })

  app.route({
    method: 'DELETE',
    url: '/memories/:id',
    preHandler: async (request) => await request.jwtVerify(),
    handler: async (request, reply) => deleteMemory(request, reply),
  })

  next()
}

const memoriesRoutes = fp(routes)

export { memoriesRoutes }
