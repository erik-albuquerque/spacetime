import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string().url(),
})

export { userSchema }
