import { Router } from 'express'
import {
  createNewParkign,
  getAllParkings,
} from './controller'
import {
  validationHandler
} from '../../utils/middlewares'
import { parkingCreateSchema, querySchema } from '../../utils/validations/schemas'

export function routes(api: Router) {
  api.get('/parkings', validationHandler(querySchema, 'query'), getAllParkings)
  api.post('/parkings', validationHandler(parkingCreateSchema), createNewParkign)
  return api
}
