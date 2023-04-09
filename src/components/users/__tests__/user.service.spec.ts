import { authenticateUser, createNewUser } from '../service'
import { insertUser, queryUser } from '../queries'
import { UniqueConstraintError } from 'sequelize'
import { mockAuthBody, mockJwt, mockUser } from '../__mocks__/user.data.mocks'
import bcrypt from 'bcrypt'
import generateToken from '../../../utils/createJwt'
import Boom from '@hapi/boom'


jest.mock('../queries', () => ({
  insertUser: jest.fn(),
  queryUser: jest.fn()
}))
jest.mock('../../../utils/createJwt')
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


describe('authenticateUser', () => {
  it('should throw an error if the password did not match', async () => {
    (queryUser as jest.Mock).mockResolvedValue([
      {
        get: () => ({
          id: 1,
          username: mockAuthBody.username,
          password: 'somerandompass', 
        }),
      },
    ])
  
    await expect(authenticateUser(mockAuthBody)).rejects.toThrow('Invalid username or password')
  
    expect(queryUser).toHaveBeenCalledWith({
      where: { username: mockAuthBody.username },
    })
  })

  it('should authenticate a user with valid credentials', async () => {
    // Mock the queryUser function to return a user with the correct username and password
    const mockUser = {
      id: 1,
      username: 'johndoe',
      password: 'somerandompassowrd',
      get: () => ({
        id: 1,
        username: mockAuthBody.username,
        password: 'somerandompass', 
      })
    };
    (queryUser as jest.Mock).mockResolvedValue([mockUser])
    ;(generateToken as jest.Mock).mockResolvedValue(mockJwt)

  
    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare
    // Call the authenticateUser function with a valid username and password
    const token = await authenticateUser(mockAuthBody)
  
    // Ensure the function returns a JWT token
    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(0)
    expect(token).toBe(mockJwt)
  
    // Ensure the queryUser function was called with the correct parameters
    expect(queryUser).toHaveBeenCalledWith({
      where: { username: mockAuthBody.username },
    })
  })
  it('should throw an error if the user does not exist', async () => {
    (queryUser as jest.Mock).mockResolvedValue([])
    
    await expect(authenticateUser(mockAuthBody)).rejects.toThrow('Invalid username or password')
    
    expect(queryUser).toHaveBeenCalledWith({
      where: { username: mockAuthBody.username },
    })
  })
})
