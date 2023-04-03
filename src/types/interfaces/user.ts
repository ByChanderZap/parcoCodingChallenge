import { UserType } from '../../enums'

export interface iUser {
  id?: number
  name: string
  username: string
  contact: string
  password: string
  userType: UserType
}

export interface iUpdateUserData {
  name?: string
  username?: string
  contact?: string
  password?: string
  userType?: UserType
}

export type iUserCreation = Omit<iUser, 'id'>
