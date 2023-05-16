import { APP, PORT } from './constants/fastify'
import { prisma } from './lib'

APP.get('/', async () => {
  const users = await prisma.user.findMany()

  return users
})

APP.listen({
  port: PORT,
}).then(() => console.log(`HTTP Server Running on http://localhost:${PORT}`))
