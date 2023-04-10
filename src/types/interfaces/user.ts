import { UserType } from '../../enums'
import { Request } from 'express'

export interface iUser {
  id?: string
  fullName: string
  username: string
  contact: string
  password: string
  userType: UserType
}

export interface iUserCreationRequest {
  body: {
    id?: string
    fullName: string
    username: string
    contact: string
    password: string
    userType: UserType
  }
}

export interface iUpdateUserData {
  fullName?: string
  username?: string
  contact?: string
  password?: string
  userType?: UserType
}

export type iUserCreation = Omit<iUser, 'id'>

export interface iSignIn {
  username: string
  password: string
}
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    userType: string;
  }

  body: {
    parkingId: string
  }
}

export interface iJwtPayload {
  id: string;
  userType: UserType;
}

export interface SignInRequest extends Request {
  body: {
    username: string
    password: string
  }
}
