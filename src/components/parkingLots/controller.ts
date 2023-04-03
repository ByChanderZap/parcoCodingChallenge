import { NextFunction, Request, Response } from 'express'
import * as service from './service'
import { Parking } from '../../types'


export const getAllParkings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query)
    const data = await service.getAllParkings(req.query)
    res.send({
      totalItems: data.length,
      data
    })
  } catch (error) {
    next(error)
  }
}

export const createNewParkign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parkignToCreate: Parking = {
      ...req.body
    }

    const newParking = await service.createNewParkign(parkignToCreate)
    res.send(newParking)
  } catch (error) {
    next(error)
  }
}
