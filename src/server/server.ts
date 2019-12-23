import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'

import apiRouter from './routes'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

app.use(express.static('public'))
app.use('/api', apiRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port: ${port}`))
