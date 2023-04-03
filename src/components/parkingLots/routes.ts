import { Router } from 'express'
import {
  createNewParkign,
  getAllParkings,
  updateParking
} from './controller'
import {
  validationHandler
} from '../../utils/middlewares'
import { idSchema, parkingCreateSchema, parkingUpdateSchema, querySchema } from '../../utils/validations/schemas'

export function routes(api: Router) {
  api.get('/parkings', validationHandler(querySchema, 'query'), getAllParkings)
  api.post('/parkings', validationHandler(parkingCreateSchema), createNewParkign)
  api.patch('/parkings/:id', validationHandler(parkingUpdateSchema), validationHandler({ id: idSchema }, 'params'), updateParking)
  return api
}
