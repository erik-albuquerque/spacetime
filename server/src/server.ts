import { APP, PORT } from './constants/fastify'

APP.get('/', () => {
  return 'Hello World!'
})

APP.listen({
  port: PORT,
}).then(() => console.log(`HTTP Server Running on http://localhost:${PORT}`))
