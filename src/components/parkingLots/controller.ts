import { NextFunction, Request, Response } from 'express'
import * as service from './service'


export const getAllParkings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllParkings()
    res.send(data)
  } catch (error) {
    next(error)
  }
}

export const getOneParking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('one')
  } catch (error) {
    next(error)
  }
}

export const createNewParkign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newParking = service.createNewParkign(req.body)
    res.send(newParking)
  } catch (error) {
    console.log(error)
  }
}
