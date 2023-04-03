import { insertNewParking, queryParkings } from './queries'
import { Parking } from '../../types'
import Boom from '@hapi/boom'

export const getAllParkings = async (query) => {
  const queryOptions = {
    offset: query.skip ? parseInt(query.skip) : undefined,
    limit: query.limit ? parseInt(query.limit) : 50,
    order: [[query.orderBy || 'id', query.order || 'ASC']]
  }
  return await queryParkings(queryOptions)
}

export const createNewParkign = async (parkingData: Parking) => {
  if (parkingData.spots < 50 || parkingData.spots > 1500) throw Boom.badRequest('Spots must be between 50 and 1500')
  
  try {
    const parkingCreated = await insertNewParking(parkingData)
    return parkingCreated
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError') throw Boom.badData('Name must be unique')
    throw Boom.internal('Something went wrong with the server')
  }
}
