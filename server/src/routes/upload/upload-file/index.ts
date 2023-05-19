import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'

import { FastifyRequest, FastifyReply } from 'fastify'

import { pump, generateFileName, generateFileUrl } from './utils/functions'
import { mimetypeRegex } from './utils/regex'

const FILE_SIZE = 5_242_880 // 5 mb

const uploadFile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const uploadFile = await request.file({
      limits: {
        fileSize: FILE_SIZE,
      },
    })

    if (!uploadFile) {
      return reply.status(400).send()
    }

    const isValidFileFormat = mimetypeRegex.test(uploadFile.mimetype)

    if (!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileName = generateFileName(uploadFile)

    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', '..', '..', 'uploads', fileName),
    )

    await pump(uploadFile.file, writeStream)

    const fileUrl = generateFileUrl(fileName, request)

    return reply.status(201).send({ fileUrl })
  } catch (error) {
    console.log(error)

    throw new Error('Error on upload file.')
  }
}

export { uploadFile }
