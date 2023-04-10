/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserType } from '../../../enums'
import { iUser } from '../../../types'


export const mockJwt = 'mock JWT'
export const mockUser: iUser = {
  id: '1',
  fullName: 'some fake name',
  username: 'someFakeUsername',
  contact: '1234567890',
  password: 'somefakepassword',
  userType: UserType.CORPORATE
}
export const mockAuthBody = {
  username: 'someUsername',
  password: 'password123'
}
