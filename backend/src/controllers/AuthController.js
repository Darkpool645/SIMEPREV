const express = require("express");
const { body, validationResult } = require("express-validator");
const authService = require("../services/AuthService");

const router = express.Router();

/**
 * @swagger
 *  /api/auth/signup:
 *      post:
 *          summary: User signup
 *          description: Creates a new user and returns a JWT token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - name
 *                              - lastname
 *                              - email
 *                              - password
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: John
 *                              lastname:
 *                                  type: string
 *                                  example: Doe
 *                              email:
 *                                  type: string
 *                                  example: john.doe@example.com
 *                              password:
 *                                  type: string
 *                                  example: password123!
 *          responses:
 *              201:
 *                  description: User created successfully
 *                  headers:
 *                      Authorization:
 *                          description: Bearer token
 *                          schema:
 *                              type: string
 *                              example: Bearer <token>
 *              400:
 *                  description: Email already exists
 *              500:
 *                  description: Error during signup
 */
router.post(
  "/signup",
  [
    body("name").isString().withMessage("Name must be a string"),
    body("lastname").isString().withMessage("Lastname must be a string"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { name, lastname, email, password } = req.body;
      const result = await authService.signup(name, lastname, email, password);

      return res
        .status(201)
        .header("Authorization", `Bearer ${result.token}`)
        .json({
          message: "User created successfully",
          user: result.user,
        });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

/**
 * @swagger
 *  /api/auth/signin:
 *      post:
 *          summary: User signin
 *          description: Authenticates a user and returns a JWT token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: john.doe@example.com
 *                              password:
 *                                  type: string
 *                                  example: password123!
 *          response:
 *              200:
 *                  description: User authenticated successfully
 *                  headers:
 *                      Authorization:
 *                          description: Bearer token
 *                          schema:
 *                              type: string
 *                              example: Bearer <token>
 *              401:
 *                  description: Invalid email or password
 *              500:
 *                  description: Error during signin
 */
router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isString().withMessage("Password must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { email, password } = req.body;
      const result = await authService.signin(email, password);

      return res
        .status(200)
        .header("Authorization", `Bearer ${result.token}`)
        .json({
          message: "User authenticated successfully",
          user: result.user,
        });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;
