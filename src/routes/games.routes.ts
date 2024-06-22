import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { gamesSchema, idSchema } from '../schemas'

type Game = z.infer<typeof gamesSchema>

const fakeGames: Game[] = [
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be7a',
    title: 'Duck Game',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    state: 'Perfect',
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 'fd26c46a-3e63-4a62-8f50-0d27b6a2be7a',
    title: 'Dragon Ball Z',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    state: 'Unknown',
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be7b',
    title: 'Black ops 2',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    state: 'Playable',
    updatedAt: new Date(),
    createdAt: new Date(),
  },
]

export const gamesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ games: fakeGames })
  })
  .get('/:id', (c) => {
    try {
      const id = idSchema.parse(c.req.param('id'))
      const game = fakeGames.find((game) => game.id === id)

      if (!game) {
        c.status(404)
        return c.json({ message: 'Game not found' })
      }

      c.status(201)
      return c.json(game)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'Invalid ID format' })
    }
  })
  .post('/', zValidator('json', gamesSchema), async (c) => {
    try {
      const game = await c.req.valid('json')
      fakeGames.push({
        ...game,
        id: `fd16c96a-3e63-4a62-8f50-0d${fakeGames.length + 1}b6a2be7a`,
      })

      if (!game) {
        c.status(404)
        return c.json({ message: 'Game not found' })
      }

      c.status(201)
      return c.json(game)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to add this game' })
    }
  })
  .put('/:id', (c) => {
    try {
      const id = idSchema.parse(c.req.param('id'))
      const game = fakeGames.find((game) => game.id === id)

      if (!game) {
        c.status(404)
        return c.json({ message: 'Game not found' })
      }

      c.status(201)
      return c.json({ message: '/PUT' })
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to update this game' })
    }
  })
  .delete('/:id', (c) => {
    try {
      const id = idSchema.parse(c.req.param('id'))
      const index = fakeGames.findIndex((game) => game.id === id)

      if (index === -1) {
        c.status(404)
        return c.json({ message: 'Game not found' })
      }

      const deletedGame = fakeGames.splice(index, 1)[0]

      c.status(201)
      return c.json({ deletedGame })
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to delete this game' })
    }
  })
