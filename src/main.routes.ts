import express from 'express'
import * as parkingLots from './components/parkingLots/routes'
import * as userRoutes from './components/users/routes'
//  Import here your routes like: import * as users from './components/users/routes'


const apiRouter = express.Router()
export function routes() {
  // Use here your routes like: users.routes(apiRouter)
  parkingLots.routes(apiRouter)
  userRoutes.routes(apiRouter)
  return apiRouter
}
