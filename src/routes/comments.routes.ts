import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { commentSchema, idSchema } from '../schemas'

type Comment = z.infer<typeof commentSchema>

const fakeComments: Comment[] = [
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2ce7c',
    userId: 'fd16c96b-3d63-4a62-8f50-0d27b6a2be7a',
    gameId: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be7a',
    title: 'Working great!',
    description: 'Duck Game is running great on GPTK',
    layer: 'GPTK',
    launcher: 'Steam',
    state: 'Perfect',
    mac: 'iMac M3 2023',
    createdAt: new Date(),
  },
  {
    id: 'fd17c97a-3e63-4a62-8f50-0d27b6a2ce7c',
    userId: 'fd16c96b-3d63-4a62-8f50-0d27b6a2ce7a',
    gameId: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be7a',
    title: 'Unplayable',
    description: 'Duck Game is unplayable under PlayCover',
    layer: 'PlayCover',
    launcher: 'Steam',
    state: 'Unplayable',
    mac: 'iMac M1 2021',
    createdAt: new Date(),
  },
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2ce4d',
    userId: 'fd16c96b-3d63-4a62-8f50-0d27b6a2be7a',
    gameId: 'fd26c46a-3e63-4a62-8f50-0d27b6a2be7a',
    title: 'Not working!',
    description: 'Dragon Ball Z is not running on my mac',
    layer: 'Crossover',
    launcher: 'Heroic',
    state: 'Broken',
    mac: 'Mac mini M2 2023',
    createdAt: new Date(),
  },
]

export const commentsRoute = new Hono()
  .get('/', (c) => {
    // Get all comments
    return c.json({ comments: fakeComments, length: fakeComments.length })
  })
  .get('/g/:gameId', (c) => {
    // Get all comments by gameId
    try {
      const id = idSchema.parse(c.req.param('gameId'))
      const comments = fakeComments.filter((comment) => comment.gameId === id)

      if (!comments) {
        c.status(404)
        return c.json({ message: 'Comments not found' })
      }
      c.status(201)
      return c.json(comments)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'Invalid gameId format' })
    }
  })
  .get('/:id', (c) => {
    // Get comment by id
    try {
      const id = idSchema.parse(c.req.param('id'))
      const comment = fakeComments.find((comment) => comment.id === id)

      if (!comment) {
        c.status(404)
        return c.json({ message: 'Comment not found' })
      }
      c.status(201)
      return c.json(comment)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'Invalid id format' })
    }
  })
  .get('/user/:userId', (c) => {
    // Get all comments by userId
    try {
      const id = idSchema.parse(c.req.param('userId'))
      const comments = fakeComments.filter((comment) => comment.userId === id)

      if (!comments) {
        c.status(404)
        return c.json({ message: 'Comments not found' })
      }

      c.status(201)
      return c.json(comments)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'Invalid userId format' })
    }
  })
  .post('/', zValidator('json', commentSchema), (c) => {
    // Add a comment
    try {
      const comment = c.req.valid('json')

      fakeComments.push({
        ...comment,
        id: `fd${fakeComments.length + 1}c96a-3e63-4a62-8f50-0d27b6a2ce7c`,
      })

      if (!comment) {
        c.status(404)
        return c.json({ message: 'Invalid comment schema' })
      }

      c.status(201)
      return c.json(comment)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to add this comment' })
    }
  })
  .delete('/:id', (c) => {
    // Delete comment by id
    try {
      const id = idSchema.parse(c.req.param('id'))
      const index = fakeComments.findIndex((comment) => comment.id === id)

      if (index === -1) {
        c.status(404)
        return c.json({ message: 'Comment not found' })
      }

      const deletedComment = fakeComments.splice(index, 1)[0]

      c.status(201)
      return c.json({ deletedComment })
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to delete this comment' })
    }
  })
