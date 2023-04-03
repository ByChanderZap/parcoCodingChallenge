import { Router } from 'express'
import {
  createNewParkign,
  getAllParkings,
  getOneParking
} from './controller'

export function routes(api: Router) {
  api.get('/parkings', getAllParkings)
  api.get('/parkings/:id', getOneParking)
  api.post('/parkings', createNewParkign)
  return api
}
