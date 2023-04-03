import { insertNewParking, queryParkings } from './queries'

export const getAllParkings = async () => {
  return await queryParkings()
}

export const createNewParkign = async (parkingData) => {
  const parkingCreated = await insertNewParking(parkingData)
  return parkingCreated
}
