/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
const send = jest.fn((a) => a)
const json = jest.fn((a) => a)
export const req: Request = {
  headers: {},
  body: {},
  params: {},
} as any

export const res: Response = {
  headers: {},
  body: {},
  status: jest.fn(() => ({ json })),
  send,
  json
} as any

export const next: NextFunction = jest.fn()
