import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { gamesRoute } from './routes/games.routes'
import { commentsRoute } from './routes/comments.routes'

const app = new Hono()

app.get('*', logger())

app
  .basePath('/api')
  .route('/games', gamesRoute)
  .route('/comments', commentsRoute)

export default app
