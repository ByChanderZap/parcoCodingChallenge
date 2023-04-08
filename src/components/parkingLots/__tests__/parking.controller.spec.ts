/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import * as service from '../service'
import { checkIn, createNewParkign, getAllParkings, updateParking } from '../controller'
import { mockAuthenticatedRequest, mockParkignToCreate, mockParkingData } from '../__mocks__/request.data.mocks'


jest.mock('../service')

let res: Response

beforeEach(() => {
  jest.resetAllMocks()
  res = {
    headers: {},
    body: {},
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  } as any
})

describe('Success checkIn controller tests', () => {
  test('should check in a user', async () => {
    const req = mockAuthenticatedRequest

    await checkIn(req, res, jest.fn())
    expect(service.checkIn).toHaveBeenCalledWith(req.user, req.body.parkingId)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'User allowed to enter'
    })
  })

  test('should update a parking', async () => {
    const id = 'abc123'
    const newData = {
      spots: 10,
      contact: 'newcontact@example.com'
    }

    const req: Request = {
      params: {
        id
      },
      body: newData
    } as any

    const parkingUpdated = {
      id,
      ...newData
    }

    ;(service.updateParking as jest.Mock).mockResolvedValue(parkingUpdated)

    await updateParking(req, res, jest.fn())
    expect(service.updateParking).toHaveBeenCalledWith(id, newData)
    expect(res.json).toHaveBeenCalledWith({
      update: 'success',
      parking: parkingUpdated
    })
  })

  test('should create a new parking', async () => {

    const req: Request = {
      body: mockParkignToCreate
    } as any

    const newParking = {
      id: 1,
      ...mockParkignToCreate
    }

    ;(service.createNewParkign as jest.Mock).mockResolvedValue(newParking)

    await createNewParkign(req, res, jest.fn())
    expect(service.createNewParkign).toHaveBeenCalledWith(mockParkignToCreate)
    expect(res.json).toHaveBeenCalledWith({
      create: 'success',
      parking: newParking
    })
  })

  test('should get all parkings', async () => {

    const req: Request = {
      query: {},
    } as any

    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    (service.getAllParkings as jest.Mock).mockResolvedValue(mockParkingData)

    await getAllParkings(req, mockResponse, jest.fn())

    expect(service.getAllParkings).toHaveBeenCalledWith(req.query)
    expect(mockResponse.json).toHaveBeenCalledWith({
      totalItems: mockParkingData.length,
      data: mockParkingData,
    })
  })
})

describe('Failure checkIn controller tests', () => {
  test('should return 400 if parkingId is not provided', async () => {
    const errorMessage = 'Failed to create user'
    const error = new Error(errorMessage)
    ;(service.checkIn as jest.Mock).mockRejectedValue(error)
    const req = mockAuthenticatedRequest

    const next = jest.fn()

    await checkIn(req, res, next)
    expect(service.checkIn).toBeCalledWith(req.user, req.body.parkingId)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(error)
  })

  test('should return 400 if updateParking throws an error', async () => {
    const errorMessage = 'Failed to update parking'
    const error = new Error(errorMessage)
    const id = 'abc123'
    const newData = {
      spots: 10,
      contact: 'newcontact@example.com'
    }

    const req: Request = {
      params: {
        id
      },
      body: newData
    } as any

    ;(service.updateParking as jest.Mock).mockRejectedValue(error)

    const next = jest.fn()

    await updateParking(req, res, next)
    expect(service.updateParking).toHaveBeenCalledWith(id, newData)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(error)
  })

  test('should return 500 if createNewParkign throws an error', async () => {
    const errorMessage = 'Failed to create new parking'
    const error = new Error(errorMessage)
    const req: Request = {
      body: mockParkignToCreate,
    } as any
    ;(service.createNewParkign as jest.Mock).mockRejectedValue(error)
  
    const next = jest.fn()
  
    await createNewParkign(req, res, next)
  
    expect(service.createNewParkign).toHaveBeenCalledWith(mockParkignToCreate)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(error)
  })
  test('should return 500 if getAllParkings throws an error', async () => {
    const errorMessage = 'Failed to get parkings'
    const error = new Error(errorMessage)
    const req: Request = {} as any
    ;(service.getAllParkings as jest.Mock).mockRejectedValue(error)
  
    const next = jest.fn()
  
    await getAllParkings(req, res, next)
  
    expect(service.getAllParkings).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
