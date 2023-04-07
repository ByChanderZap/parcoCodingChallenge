import { createNewParking, queryParkings, updateParkingDb } from './queries'
import { iParking, iUpdateParkingData } from '../../types'
import Boom from '@hapi/boom'

export const getAllParkings = async (query) => {
  const queryOptions = {
    offset: query.skip ? parseInt(query.skip) : undefined,
    limit: query.limit ? parseInt(query.limit) : 50,
    order: [[query.orderBy || 'id', query.order || 'ASC']]
  }
  return await queryParkings(queryOptions)
}

export const createNewParkign = async (parkingData: iParking) => {
  try {
    const parkingCreated = await createNewParking(parkingData)
    return parkingCreated
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError') throw Boom.badRequest('Name must be unique')
    throw error
  }
}

export const updateParking = async (id: string, parkingToUpdate: iUpdateParkingData) => {
  try {
    const [affectedCount, [updatedParking]] = await updateParkingDb(id, parkingToUpdate)
    if (affectedCount < 1) throw Boom.badData('Parking not found')
    return updatedParking.dataValues
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError') throw Boom.badRequest('Name must be unique')
    throw error
  }
}
