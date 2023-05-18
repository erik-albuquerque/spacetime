import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib'

const createNewMemory = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const user = request.user

  try {
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: user.sub,
      },
    })

    return reply.status(201).send({ memory })
  } catch (error) {
    console.log(error)

    throw new Error('Error on create a new memory.')
  }
}

export { createNewMemory }
