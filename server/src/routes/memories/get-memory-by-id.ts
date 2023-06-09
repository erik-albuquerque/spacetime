import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib'

const getMemoryById = async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const user = request.user

  try {
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUnique({
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

    if (!memory.isPublic && memory.userId !== user.sub) {
      return reply.status(401).send()
    }

    return reply.status(200).send({ memory })
  } catch (error) {
    console.log(error)

    throw new Error('Erro on get a unique memory.')
  }
}

export { getMemoryById }
