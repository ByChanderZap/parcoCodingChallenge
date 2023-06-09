import { ParkingType } from '../../enums'

export interface iParking {
  id?: number
  name: string
  spots: number
  contact: string
  parkingType: ParkingType
  createdAt?: Date
  updatedAt?: Date
}

export interface iUpdateParkingData {
  spots?: number;
  contact?: string;
}

export type iParkingCreation = Omit<iParking, 'id'>
