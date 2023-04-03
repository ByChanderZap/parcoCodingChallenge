import { Parking } from '../../utils/db/models'


export const queryParkings = () => {
  return Parking.findAll()
}

export const insertNewParking = (parkingData) => {
  return Parking.create(parkingData)
}
