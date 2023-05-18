import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib'

const updateMemory = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { id } = paramsSchema.parse(request.params)

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const findMemory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    if (!findMemory) {
      return reply.status(400).send({
        code: 400,
        status: 'Bad Request',
        message: 'Memory not found!',
      })
    }

    const memory = await prisma.memory.update({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '83d67a61-9d89-4a1d-ba58-af030e04ae1a',
      },
      where: {
        id,
      },
    })

    return reply.status(200).send({ memory })
  } catch (error) {
    console.log(error)

    throw new Error('Error on update memory.')
  }
}

export { updateMemory }
