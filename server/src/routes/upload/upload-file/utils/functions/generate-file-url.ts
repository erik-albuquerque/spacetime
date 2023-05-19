import { FastifyRequest } from 'fastify'

const generateFileUrl = (fileName: string, request: FastifyRequest) => {
  const baseUrl = request.protocol.concat('://').concat(request.hostname)

  const fileUrl = new URL(`/uploads/${fileName}`, baseUrl).toString()

  return fileUrl
}

export { generateFileUrl }
