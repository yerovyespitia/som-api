import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { usersSchema, idSchema } from '../schemas'

type User = z.infer<typeof usersSchema>

const fakeUsers: User[] = [
  {
    id: 'fd16c00a-3e63-4a62-8f50-0d27b6a2be7a',
    username: 'yerovy',
    photo:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    email: 'luyeesgar@gmail.com',
    password: 'Luis08230823',
    createdAt: new Date(),
  },
  {
    id: 'fd16c01a-3e63-4a62-8f50-0d27b6a2be7a',
    username: 'yerovy2',
    photo:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    email: 'luyeesgar2@gmail.com',
    password: 'Luis08230823',
    createdAt: new Date(),
  },
  {
    id: 'fd16c02a-3e63-4a62-8f50-0d27b6a2be7a',
    username: 'yerovy3',
    photo:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    email: 'luyeesgar3@gmail.com',
    password: 'Luis08230823',
    createdAt: new Date(),
  },
]

export const usersRoute = new Hono()
  .get('/', (c) => {
    // Get all users
    return c.json({ users: fakeUsers, length: fakeUsers.length })
  })
  .get('/:id', (c) => {
    // Get user by id
    try {
      const id = idSchema.parse(c.req.param('id'))
      const user = fakeUsers.find((user) => user.id === id)

      if (!user) {
        c.status(404)
        return c.json({ message: 'User not found' })
      }

      c.status(201)
      return c.json(user)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'Invalid id format' })
    }
  })
  .post('/', zValidator('json', usersSchema), async (c) => {
    // Add a user
    try {
      const user = await c.req.valid('json')
      fakeUsers.push({
        ...user,
        id: `fd16c${fakeUsers.length + 1}a-3e63-4a62-8f50-0d27b6a2be7a`,
      })

      if (!user) {
        c.status(404)
        return c.json({ message: 'Invalid user schema' })
      }

      c.status(201)
      return c.json(user)
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to add this user' })
    }
  })
  .put('/:id', (c) => {
    // Edit user by id
    try {
      const id = idSchema.parse(c.req.param('id'))
      const user = fakeUsers.find((user) => user.id === id)

      if (!user) {
        c.status(404)
        return c.json({ message: 'User not found' })
      }

      c.status(201)
      return c.json({ message: '/PUT' })
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to update this user' })
    }
  })
  .delete('/:id', (c) => {
    // Delete user by id
    try {
      const id = idSchema.parse(c.req.param('id'))
      const index = fakeUsers.findIndex((user) => user.id === id)

      if (index === -1) {
        c.status(404)
        return c.json({ message: 'User not found' })
      }

      const deletedUser = fakeUsers.splice(index, 1)[0]

      c.status(201)
      return c.json({ deletedUser })
    } catch (error) {
      c.status(400)
      return c.json({ message: 'It was not possible to delete this user' })
    }
  })
