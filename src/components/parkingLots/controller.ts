import { NextFunction, Request, Response } from 'express'
import * as service from './service'
import { iParking, iUpdateParkingData } from '../../types'


export const getAllParkings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllParkings(req.query)
    res.json({
      totalItems: data.length,
      data
    })
  } catch (error) {
    next(error)
  }
}

export const createNewParkign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parkignToCreate: iParking = {
      ...req.body
    }

    const newParking = await service.createNewParkign(parkignToCreate)
    res.json({
      create: 'success',
      parking: newParking
    })
  } catch (error) {
    next(error)
  }
}

export const updateParking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    const newData: iUpdateParkingData = {
      ...req.body
    }

    const parkingUpdated = await service.updateParking(id, newData)
    res.json({
      update: 'success',
      parking: parkingUpdated
    })
  } catch (error) {
    next(error)
  }
}
