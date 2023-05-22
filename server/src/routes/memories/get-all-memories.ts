import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../lib'

const getAllMemories = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user

  try {
    const memoriesResults = await prisma.memory.findMany({
      where: {
        userId: user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const memories = memoriesResults.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
        createdAt: memory.createdAt,
      }
    })

    return reply.status(200).send({ memories })
  } catch (error) {
    console.log(error)

    throw new Error('Error on get all memories.')
  }
}

export { getAllMemories }
