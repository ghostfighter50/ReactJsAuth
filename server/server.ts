import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
// import 'dotenv/config'
import DBconnect from './src/Config/db.config'
import AuthRouter from './src/routes/auth.route'
import UserRouter from './src/routes/users.route'
import { Logger } from './src/helpers/logger.helper'
DBconnect()
const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors({
  origin: [process.env.ORIGIN || 'http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}))
app.use(session({
  secret: process.env.SECRET || 'S/oSc00terDanslaStaT!0N',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: (60000 * 30) }
}))
app.use('/api/auth', AuthRouter)
app.use('/api/users', UserRouter)

app.listen(process.env.PORT || 8000, () => { console.clear(); Logger({ type: 'Server', content: `Server Running on port ${process.env.PORT || 8000}` }) }
)
