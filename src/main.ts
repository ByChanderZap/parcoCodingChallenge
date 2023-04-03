import express, { Express } from 'express'
import * as ParcoRoutes from './main.routes'
import { connectToDatabase } from './utils/db/db'

const api: Express = express()

const HOST = 'localhost'
const PORT = process.env.PORT || 3000


//  Server configuration
api.use(express.json())
api.use(express.urlencoded({ extended: true }))


// routes
api.use('/', ParcoRoutes.routes());

(async () => {
  try {
    await connectToDatabase()
  } catch (error) {
    console.error('An error occurred while connecting to the database:', error)
  }
})()

api.listen(PORT, () => console.log(`API running ${HOST}:${PORT}`))
