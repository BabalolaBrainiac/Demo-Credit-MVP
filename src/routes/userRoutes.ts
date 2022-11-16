import express, { Router } from "express";
import { body, param, query, validationResult } from "express-validator";
import { UserController } from "../controllers/userController";
import {validateToken} from "../authentication/auth";

const router: Router = express.Router();

router.get("/", UserController.getAllUsers);

router.get(
  "/:userId",
  validateToken,
  UserController.getSingleUser
);

router.post(
  "/create",
  [
    body("user.firstName")
      .isString()
      .withMessage("Please enter a valid first name"),
    body("user.lastName").isString().withMessage("Please enter a last name"),
    body("user.email").isEmail().withMessage("Please enter a valid email"),
    body("user.phoneNumber")
      .isString()
      .withMessage("Please enter a phone number"),
    body("user.dob").isString().withMessage("Please enter a valid email"),
    body("user.password").isLength({ min: 4, max: 20 }),
  ],
  UserController.createNewUser
);

router.put(
  "/update/:userId",
  [query("userId").isUUID],
    validateToken,
  UserController.updateUserInfo
);

router.put(
  "/delete/:userId",
  [query("userId").isUUID],
    validateToken,
  UserController.deleteItem
);

router.post(
  "/login",
  [
    body("user.email").isEmail().withMessage("Please enter a valid email"),
    body("user.password").isLength({ min: 4, max: 20 }),
  ],
  UserController.login
);

export default router;
