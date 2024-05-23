const authService = require('../services/AuthService');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dbConnection = require('../utils/MongoConection');
const {
  generateHashedPassword,
  verifyPassword,
} = require('../utils/PasswordEncoder');

jest.mock('../models/User');
jest.mock('jsonwebtoken');
jest.mock('../utils/MongoConection');
jest.mock('../utils/PasswordEncoder');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user and return a JWT token', async () => {
      dbConnection.mockResolvedValueOnce();
      User.findOne.mockResolvedValueOnce(null);
      generateHashedPassword.mockReturnValue('hashedpassword');
      User.prototype.save = jest.fn().mockResolvedValueOnce();
      jwt.sign.mockReturnValue('jsonwebtoken');
      User.findOne.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue({
          email: 'john.doe@example.com',
          name: 'John',
          lastname: 'Doe',
          rol: 'paciente',
        }),
      }));

      const result = await authService.signup('John', 'Doe', 'john.doe@example.com', 'password123!');

      expect(dbConnection).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
      expect(generateHashedPassword).toHaveBeenCalledWith('password123!');
      expect(User.prototype.save).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: expect.anything(),
          email: 'john.doe@example.com',
          rol: 'paciente',
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      expect(result).toEqual({
        token: 'jsonwebtoken',
        user: {
          email: 'john.doe@example.com',
          name: 'John',
          lastname: 'Doe',
          rol: 'paciente',
        },
      });
    });

    it('should throw an error if the email already exists', async () => {
      dbConnection.mockResolvedValueOnce();
      User.findOne.mockResolvedValueOnce({ email: 'existing@example.com' });

      await expect(authService.signup('John', 'Doe', 'existing@example.com', 'password123!'))
        .rejects
        .toThrow('This email already has an account');
    });
  });

  describe('signin', () => {
    it('should authenticate a user and return a JWT token', async () => {
      dbConnection.mockResolvedValueOnce();
      User.findOne.mockImplementation(() => ({
        select: jest.fn().mockResolvedValueOnce({
          email: 'john.doe@example.com',
          password: 'hashedpassword',
          _id: 'userid',
          rol: 'paciente',
        }),
      }));
      verifyPassword.mockReturnValue(true);
      jwt.sign.mockReturnValue('jsonwebtoken');
      User.findOne.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue({
          email: 'john.doe@example.com',
          name: 'John',
          lastname: 'Doe',
          rol: 'paciente',
        }),
      }));

      const result = await authService.signin('john.doe@example.com', 'password123!');

      expect(dbConnection).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
      expect(verifyPassword).toHaveBeenCalledWith('password123!', 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: 'userid',
          email: 'john.doe@example.com',
          rol: 'paciente',
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      expect(result).toEqual({
        token: 'jsonwebtoken',
        user: {
          email: 'john.doe@example.com',
          name: 'John',
          lastname: 'Doe',
          rol: 'paciente',
        },
      });
    });

    it('should throw an error if the email does not exist', async () => {
      dbConnection.mockResolvedValueOnce();
      User.findOne.mockResolvedValueOnce(null);

      await expect(authService.signin('nonexistent@example.com', 'password123!'))
        .rejects
        .toThrow('Invalid email or password');
    });

    it('should throw an error if the password is invalid', async () => {
      dbConnection.mockResolvedValueOnce();
      User.findOne.mockResolvedValueOnce({
        email: 'john.doe@example.com',
        password: 'hashedpassword',
        _id: 'userid',
        rol: 'paciente',
      });
      verifyPassword.mockReturnValue(false);

      await expect(authService.signin('john.doe@example.com', 'wrongpassword'))
        .rejects
        .toThrow('Invalid email or password');
    });
  });
});
