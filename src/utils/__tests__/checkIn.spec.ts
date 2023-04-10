import canUserEnterParking from '../validateCheckin'
import { iJwtPayload, iParking } from '../../types'
import { ParkingType, UserType } from '../../enums'

describe('canUserEnterParking', () => {
  let user: iJwtPayload
  let parking: iParking
  jest.useFakeTimers('modern')

  beforeEach(() => {
    user = {
      id: '123',
      userType: UserType.CORPORATE,
    }

    parking = {
      id: 1,
      name: 'Corporate Parking',
      spots: 50,
      contact: 'John Doe',
      parkingType: ParkingType.PRIVATE,
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns true for public parking', () => {
    parking.parkingType = ParkingType.PUBLIC
    expect(canUserEnterParking(user, parking)).toBe(true)
  })

  it('returns true for private parking and corporate users on weekdays', () => {
    parking.parkingType = ParkingType.PRIVATE
    user.userType = UserType.CORPORATE
    jest.setSystemTime(new Date('april 6, 2023')) // Friday
    expect(canUserEnterParking(user, parking)).toBe(true)
  })
  it('returns false for private parking and corporate users on weekend', () => {
    parking.parkingType = ParkingType.PRIVATE
    user.userType = UserType.CORPORATE
    jest.setSystemTime(new Date('april 8, 2023'))
    expect(canUserEnterParking(user, parking)).toBe(false)
  })

  it('returns false for private parking and any other user', () => {
    parking.parkingType = ParkingType.PRIVATE
    user.userType = UserType.PROVIDER
    jest.setSystemTime(new Date('april 8, 2023')) 
    expect(canUserEnterParking(user, parking)).toBe(false)
  })

  it('returns true for user visitor and parking courtesy on saturday', () => {
    parking.parkingType = ParkingType.COURTESY
    user.userType = UserType.VISITOR
    jest.setSystemTime(new Date('april 8, 2023')) 
    expect(canUserEnterParking(user, parking)).toBe(true)
  })

  it('returns true for user visitor and parking courtesy on sunday', () => {
    parking.parkingType = ParkingType.COURTESY
    user.userType = UserType.VISITOR
    jest.setSystemTime(new Date('april 9, 2023')) 
    expect(canUserEnterParking(user, parking)).toBe(true)
  })
  it('returns false for user visitor and parking courtesy on any monday', () => {
    parking.parkingType = ParkingType.COURTESY
    user.userType = UserType.VISITOR
    const min = 3
    const max = 7
    const weekDays = Math.floor(Math.random() * (max - min + 1)) + min
    console.log(weekDays)
    // eslint-disable-next-line quotes
    jest.setSystemTime(new Date(`april ${weekDays}, 2023`)) 
    expect(canUserEnterParking(user, parking)).toBe(false)
  })

  it('returns false for user corporate and parking courtesy on weekend', () => {
    parking.parkingType = ParkingType.COURTESY
    user.userType = UserType.CORPORATE
    
    jest.setSystemTime(new Date('april 8, 2023')) 
    expect(canUserEnterParking(user, parking)).toBe(false)
  })
})
