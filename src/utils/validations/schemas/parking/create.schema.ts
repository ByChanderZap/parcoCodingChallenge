import joi from 'joi'
import { ParkingType } from '../../../../enums'

export const idSchema =  joi.string().uuid()
const nameSchema =  joi.string()
const spotsSchema = joi.number().integer().positive()
const contactSchema = joi.string()
  .pattern(/^(\+)[1-9]{1,3}\d{1,10}$/)
  .message('Did not match the pattern, must contain country code and nombre ex: +52123456789')
const parkingTypeSchema = joi.string().valid(...Object.values(ParkingType)).required()

export const parkingCreateSchema = {
  name: nameSchema.required(),
  spots: spotsSchema.required(),
  contact: contactSchema.required(),
  parkingType: parkingTypeSchema.required()
}
