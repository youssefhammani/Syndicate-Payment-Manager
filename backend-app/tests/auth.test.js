const { mockRequest, mockResponse } = require('express');
const { register } = require('../src/controllers/authController'); // Replace with the actual path to your module
const User = require('../src/models/userModel'); // Replace with the actual path to your User model
const PasswordUtils = require('../src/utils/passwordUtils'); // Replace with the actual path to your PasswordUtils module
const roleModel = require('../src/models/roleModel'); // Replace with the actual path to your roleModel module
const { generateAccessToken } = require('../src/utils/authUtils'); // Replace with the actual path to your AuthUtils module
const { sendConfirmationEmail } = require('../src/utils/emailUtils'); // Replace with the actual path to your EmailUtils module
const emailTemplates = require('../src/utils/emailUtils'); // Replace with the actual path to your emailTemplates module

jest.mock('../src/models/userModel.js'); // Mock the User model
jest.mock('../src/utils/passwordUtils.js'); // Mock the PasswordUtils module
jest.mock('../src/models/roleModel.js'); // Mock the roleModel module
jest.mock('../src/utils/authUtils.js'); // Mock the AuthUtils module
jest.mock('../src/utils/emailUtils.js'); // Mock the EmailUtils module

describe('register function', () => {
    it('should register a new user', async () => {
        const req = mockRequest({
            body: {
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword',
                fullName: 'Test User',
                dateOfBirth: '1990-01-01',
            },
        });

        const res = mockResponse();

        const mockExistingUser = null; // No existing user
        User.findOne.mockResolvedValue(mockExistingUser);

        const mockHashedPassword = 'hashedPassword123';
        PasswordUtils.hashPassword.mockResolvedValue(mockHashedPassword);

        const mockRole = { _id: 'role123' };
        roleModel.getRole.mockResolvedValue(mockRole);

        const mockNewUser = {
            _id: 'user123',
            save: jest.fn(),
        };
        User.mockImplementation(() => mockNewUser);

        const mockToken = 'mockToken123';
        generateAccessToken.mockReturnValue(mockToken);

        await register(req, res);

        // Assertions
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(PasswordUtils.hashPassword).toHaveBeenCalledWith('testpassword');
        expect(roleModel.getRole).toHaveBeenCalledWith(req, res);
        expect(User).toHaveBeenCalledWith({
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedPassword123',
            fullName: 'Test User',
            dateOfBirth: '1990-01-01',
            role: 'role123',
        });
        expect(mockNewUser.save).toHaveBeenCalled();
        expect(generateAccessToken).toHaveBeenCalledWith('user123');
        expect(sendConfirmationEmail).toHaveBeenCalledWith(
            'testuser',
            'test@example.com',
            expect.any(String), // You may want to mock this value for precise matching
            'mockToken123',
            emailTemplates
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully please verify your email' });
    });

    // Add more test cases for error scenarios if needed
});
