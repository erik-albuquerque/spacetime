import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib'

const updateMemory = async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const user = request.user

  try {
    const { id } = paramsSchema.parse(request.params)

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    if (!memory) {
      return reply.status(400).send({
        code: 400,
        status: 'Bad Request',
        message: 'Memory not found!',
      })
    }

    if (memory.userId !== user.sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: user.sub,
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
