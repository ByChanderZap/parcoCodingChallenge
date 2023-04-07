import { Router } from 'express'
import {
  checkIn,
  createNewParkign,
  getAllParkings,
  updateParking
} from './controller'
import {
  validationHandler,
  verifyToken
} from '../../utils/middlewares'
import { idSchema, parkingCreateSchema, parkingUpdateSchema, querySchema } from '../../utils/validations/schemas'

export function routes(api: Router) {
  api.get('/parkings', validationHandler(querySchema, 'query'), getAllParkings)
  api.post('/parkings', validationHandler(parkingCreateSchema), createNewParkign)
  api.patch('/parkings/:id', validationHandler(parkingUpdateSchema), validationHandler({ id: idSchema }, 'params'), updateParking)
  api.get('/parkings/checkIn', verifyToken, validationHandler({ parkingId: idSchema.required() }), checkIn)
  return api
}
