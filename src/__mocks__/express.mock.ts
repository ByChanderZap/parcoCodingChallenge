/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
const send = jest.fn((a) => a)
export const req: Request = {
  headers: {},
  body: {},
  params: {},
} as any

export const res: Response = {
  headers: {},
  body: {},
  status: jest.fn(() => ({ send })),
  send
} as any

export const next: NextFunction = jest.fn()
