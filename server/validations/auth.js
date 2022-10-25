import { body } from "express-validator";

export const registerValidation = [
  body("username", "Is not valid username, length must be 5 and more symbol").isLength({ min: 5 }),
  body("password","Is not valid password, length must be 6 and more symbol").isLength({ min: 6 }),
];
