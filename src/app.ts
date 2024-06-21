import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { gamesRoute } from './routes/games.routes'

const app = new Hono()

app.get('*', logger())

app.basePath('/api').route('/games', gamesRoute)

export default app
