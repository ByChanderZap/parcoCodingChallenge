import { iJwtPayload, iParking } from '../types'
import { ParkingType, UserType } from '../enums'

const canUserEnterParking = (user: iJwtPayload, parking: iParking): boolean => {
  const today = new Date()
  const currentDay = today.getDay()

  if (parking.parkingType === ParkingType.PUBLIC) {
    return true
  }

  if (parking.parkingType === ParkingType.PRIVATE && user.userType === UserType.CORPORATE && currentDay >= 1 && currentDay <= 5) {
    return true
  }

  if (parking.parkingType === ParkingType.COURTESY && user.userType === UserType.VISITOR && currentDay === 0 || currentDay === 6) {
    return true
  }

  return false
}

export default canUserEnterParking
