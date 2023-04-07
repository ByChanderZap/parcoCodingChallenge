import { Router } from 'express'
import {
  createUser,
  signIn,
} from './controller'
import {
  validationHandler,
  verifyToken
} from '../../utils/middlewares'
import { loginSchema, userCreateSchema } from '../../utils/validations/schemas'

export function routes(api: Router) {
  api.post('/signup', validationHandler(userCreateSchema), createUser)
  api.post('/signin', validationHandler(loginSchema), signIn)
  return api
}
