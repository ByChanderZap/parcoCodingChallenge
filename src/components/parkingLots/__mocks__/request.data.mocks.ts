/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest } from '../../../types'
import { ParkingType } from '../../../enums'

export const mockAuthenticatedRequest: AuthenticatedRequest = {
  user: {
    id: '123',
    userType: 'someusertype'
  },
  body: {
    parkingId: 'abc123'
  },
  headers: {},
  params: {}
} as any


export const mockParkingData = [{ id: 1, name: 'Parking 1', spots: 10, contact: 'contact@example.com', parkingType: ParkingType.PUBLIC }]
export const mockParkignToCreate = {
  name: 'New Parking',
  spots: 10,
  contact: 'contact@example.com',
  parkingType: 'indoor'
}
