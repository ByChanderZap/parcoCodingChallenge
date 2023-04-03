import { ParkingType } from '../../enums'

export interface Parking {
  id?: number
  name: string
  spots: number
  contact: string
  parkingType: ParkingType
}
