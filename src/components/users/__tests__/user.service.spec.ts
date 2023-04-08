import { createNewUser } from '../service'
import { insertUser } from '../queries'
import { UniqueConstraintError } from 'sequelize'
import { mockUser } from '../__mocks__/user.data.mocks'
import bcrypt from 'bcrypt'

jest.mock('../queries', () => ({
  insertUser: jest.fn()
}))
beforeEach(() => {
  jest.clearAllMocks()
})
describe('createNewUser', () => {
  it('should create a new user with a hashed password', async () => {    
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(mockUser.password, salt)
    const expectedUser = {
      ...mockUser,
      password: passwordHashed
    };
    (insertUser as jest.Mock).mockResolvedValue(expectedUser)
  
    const result = await createNewUser(mockUser)
  
    expect(result).toEqual(expectedUser)
    expect(insertUser).toHaveBeenCalledWith(expect.objectContaining({
      ...mockUser,
      password: expect.any(String)
    }))
  })
  
  it('should throw a Boom.badRequest error if the username is already in use', async () => {
    const errorMessage = 'Validation error: username already in use'
    const error = {
      name: 'SequelizeUniqueConstraintError',
      message: errorMessage,
      errors: [{ message: errorMessage }],
    } as UniqueConstraintError;
    (insertUser as jest.Mock).mockRejectedValue(error)

    try {
      await createNewUser(mockUser)
      fail('Expected error to be thrown')
    } catch (err) {
      expect(insertUser).toHaveBeenCalledWith(expect.objectContaining({
        ...mockUser,
        password: expect.any(String)
      }))
      expect(err).toEqual(error)
    }
  })
  

  it('should throw the corresponding error if an error different than UniqueConstraintError is thrown', async () => {
    const errorMessage = 'Database connection lost'
    const error = new Error(errorMessage);
    (insertUser as jest.Mock).mockRejectedValue(error)
    try {
      await createNewUser(mockUser)
      fail('Expected error to be thrown')
    } catch (err) {
      expect(insertUser).toHaveBeenCalledWith(expect.objectContaining({
        ...mockUser,
        password: expect.any(String)
      }))
      expect(err).toEqual(error)
    }
  })
})
