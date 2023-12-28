import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(5000),
  JWT_SECRET: z.string(),
  API_KEY_CLOUDINARY: z.string(),
  API_SECRET_CLOUDINARY: z.string(),
  API_CLOUD_NAME_CLOUDINARY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment viriables.')
}

export const env = _env.data
