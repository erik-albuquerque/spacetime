import { MultipartFile } from '@fastify/multipart'

import { randomUUID } from 'node:crypto'

import { getExtension } from './get-extension'

const generateFileName = (file: MultipartFile) => {
  const fileId = randomUUID()

  const fileExtension = getExtension(file.filename)

  const fileName = fileId.concat(fileExtension)

  return fileName
}

export { generateFileName }
