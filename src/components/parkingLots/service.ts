import { createNewParking, queryParkings, updateParkingDb } from './queries'
import { iJwtPayload, iParking, iUpdateParkingData } from '../../types'
import Boom from '@hapi/boom'
import canUserEnterParking from '../../utils/validateCheckin' 
import { FindOptions } from 'sequelize/types'


export const getAllParkings = async (query): Promise<iParking[]> => {
  const queryOptions: FindOptions = {
    offset: query.skip ? parseInt(query.skip) : undefined,
    limit: query.limit ? parseInt(query.limit) : 50,
    order: [[query.orderBy || 'id', query.order || 'ASC']]
  }
  const parkings = await queryParkings(queryOptions)
  
  return parkings.map((parking) => {
    return parking.get({ plain: true }) as iParking
  })
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

export const checkIn = async (user: iJwtPayload, parkingId): Promise<boolean> => {
  console.log(user.id, user.userType)
  const [parking] = await queryParkings({ where: { id: parkingId } })
  const parkingValues = parking.get({ plain: true })
  const canUserEnter = canUserEnterParking(user, parkingValues)
  if(!canUserEnter) throw Boom.unauthorized('You are not allowed to check in')

  return canUserEnter
}
