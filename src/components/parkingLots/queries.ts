import { Parking } from '../../utils/db/models'


export const queryParkings = (query) => {
  return Parking.findAll(query)
}

export const insertNewParking = (parkingData) => {
  return Parking.create(parkingData, { returning: true })
}
