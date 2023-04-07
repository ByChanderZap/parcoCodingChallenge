import { Parking } from '../../utils/db/models'
import { iParking, iUpdateParkingData } from '../../types'
import { FindOptions } from 'sequelize/types'

export const queryParkings = (query: FindOptions) => {
  return Parking.findAll(query)
}

export const createNewParking = (parkingData: iParking) => {
  return Parking.create(parkingData, { returning: true })
}

export const updateParkingDb = async (id: string, dataToUpdate: iUpdateParkingData) => {
  return await Parking.update(dataToUpdate, {
    returning: true,
    where: { id },
    fields: ['spots', 'contact']
  })
}
