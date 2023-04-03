import joi from 'joi'
import { iParking } from '../../../../types'
import { ParkingType } from '../../../../enums'

const parkingExample: iParking = {
  id: 1,
  name: '',
  spots: 1,
  contact: '',
  parkingType: ParkingType.COURTESY,
}

export const querySchema = {
  skip: joi.string().allow(''),
  limit: joi.string().allow(''),
  order: joi.string().valid('asc', 'desc').allow(''),
  orderBy: joi.string().valid(...Object.keys(parkingExample)).allow(''),
}
