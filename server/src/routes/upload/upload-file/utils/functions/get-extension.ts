import { extname } from 'node:path'

const getExtension = (fileName: string) => {
  const extension = extname(fileName)

  return extension
}

export { getExtension }
