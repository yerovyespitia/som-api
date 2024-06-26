import { z } from 'zod'
import { launcherSchema, layerSchema, macSchema, stateSchema } from './enums'

export const idSchema = z.string().uuid()

export const gamesSchema = z.object({
  id: idSchema,
  title: z.string().min(3),
  wallpaper: z.string().url(),
  state: stateSchema.default('Unknown'),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export const usersSchema = z.object({
  id: idSchema,
  username: z.string().min(3),
  photo: z.string().url(),
  email: z.string().email(),
  password: z.string().min(6).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/),
  createdAt: z.date(),
})

export const commentSchema = z.object({
  id: idSchema,
  userId: idSchema,
  gameId: idSchema,
  title: z.string().min(3),
  description: z.string().min(3),
  layer: layerSchema,
  launcher: launcherSchema,
  state: stateSchema,
  mac: macSchema,
  createdAt: z.date(),
})
