/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import * as service from '../service'
import { createUser, signIn } from '../controller'
import { mockAuthBody, mockJwt, mockUser } from '../__mocks__/user.data.mocks'

jest.mock('../service')

const req: Request = {
  headers: {},
  params: {},
  body: {}
} as any

let res: Response

beforeEach(() => {
  jest.resetAllMocks()
  req.body = {}
  res = {
    headers: {},
    body: {},
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  } as any
})

describe('Success cases users controller tests', () => {
  test('signIn should return a JWT token', async () => {
    (service.authenticateUser as jest.Mock).mockResolvedValue(mockJwt)
    req.body = mockAuthBody
    
    const next = jest.fn()
  
    await signIn(req, res, next)
    expect(service.authenticateUser).toBeCalledWith(mockAuthBody)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: mockJwt,
    })
  })
  test('createUser should return a new user', async () => {
    (service.createNewUser as jest.Mock).mockResolvedValue(mockUser)
  
    req.body = mockUser
    
    const next = jest.fn()
  
    await createUser(req, res, next)
    expect(service.createNewUser).toBeCalledWith(req.body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      create: 'success',
      user: mockUser,
    })
  })
})


describe('failure cases users controller tests', () => {
  test('createUser should throw an error', async () => {
    const errorMessage = 'Failed to create user'
    const error = new Error(errorMessage)
    ;(service.createNewUser as jest.Mock).mockRejectedValue(error)
  
    req.body = {
      fullName: 'some fake name',
      username: 'someFakeUsername',
      contact: '1234567890',
      password: 'somefakepassword',
      userType: 'user'
    }
    
    const next = jest.fn()
  
    await createUser(req, res, next)
    expect(service.createNewUser).toBeCalledWith(req.body)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(error)
  })

  test('signIn should throw an error', async () => {
    const errorMessage = 'Failed to create user'
    const error = new Error(errorMessage)
    ;(service.authenticateUser as jest.Mock).mockRejectedValue(error)
    req.body = {
      username: 'someUsername',
      password: 'password123'
    }
    
    const next = jest.fn()
  
    await signIn(req, res, next)
    expect(service.authenticateUser).toBeCalledWith(req.body)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(error)
  })
  
})
