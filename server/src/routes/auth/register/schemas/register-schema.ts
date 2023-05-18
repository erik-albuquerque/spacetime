import { z } from 'zod'

const registerSchema = z.object({
  code: z.string(),
})

export { registerSchema }
