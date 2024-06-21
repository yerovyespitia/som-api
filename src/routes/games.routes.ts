import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const gamesSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  wallpaper: z.string().url(),
  status: z
    .enum(['Unknown', 'Perfect', 'Playable', 'Unplayable', 'Broken'])
    .default('Unknown'),
  updatedAt: z.date(),
})

type Game = z.infer<typeof gamesSchema>

const fakeGames: Game[] = [
  {
    id: 0,
    title: 'Duck Game',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    status: 'Perfect',
    updatedAt: new Date(),
  },
  {
    id: 1,
    title: 'Dragon Ball Z',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    status: 'Unknown',
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Black ops 2',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    status: 'Playable',
    updatedAt: new Date(),
  },
]

export const gamesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ fakeGames })
  })
  .get('/:game', (c) => {
    return c.json({ message: '/:game' })
  })
  .post('/', zValidator('json', gamesSchema), async (c) => {
    const game = await c.req.valid('json')
    fakeGames.push({ ...game, id: fakeGames.length + 1 })
    c.status(201)
    return c.json(game)
  })
  .put('/:game', (c) => {
    return c.json({ message: '/PUT' })
  })
