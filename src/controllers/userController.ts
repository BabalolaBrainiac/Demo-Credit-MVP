import { UserService } from "../services/userService";
import { IExpressRequest, IResponse } from "../interfaces/IExpressReq";
import { ErrorCode } from "../helpers/ErrorCodes";
import { NextFunction } from "express";
import { validationResult } from "express-validator";

export const UserController = {
  async createNewUser(
    req: IExpressRequest,
    res: IResponse
  ): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({
        message: "Validation Error",
        errors,
      });
    }

    const { user } = <any>req.body;
    await UserService.createNewUser(user)
      .then((response) => {
        res.send({
          message: "User Successfully Created",
          response,
        });
      })
      .catch((err) => {
        return err
      });
  },
  async getAllUsers(req: IExpressRequest, res: IResponse): Promise<any> {
    await UserService.getAllUsers()
      .then((response) => {
        res.status(200).json({
          message: "Users Successfully Retrieved",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not Get Users",
        });
      });
  },

  async getSingleUser(req: IExpressRequest, res: IResponse): Promise<any> {
    const { userId } = req.params;
    await UserService.getUserById(userId)
      .then((response) => {
        if (!response) throw new Error(ErrorCode.NOT_FOUND);
        res.status(200).json({
          message: "User Successfully Fetched",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not Fetch User",
          err,
        });
      });
  },

  async updateUserInfo(req: IExpressRequest, res: IResponse): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({
        message: "Validation Error",
        errors,
      });
    }
    const { item } = <any>req.body;

    await UserService.updateUser(item)
      .then((response) => {
        res.send({
          message: "User Successfully Modified",
          response,
        });
      })
      .catch((err) => {
        return err;
      });
  },

  async deleteItem(req: IExpressRequest, res: IResponse) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { userId } = req.params;

    await UserService.deleteUser(userId)
      .then((response) => {
        res.status(200).json({
          message: "User Successfully Deleted",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not Delete User",
        });
      });
  },

  async login(req: IExpressRequest, res: IResponse, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }
    const { user } = req.body;
    await UserService.loginUser(user)
      .then((response) => {
        res.send({
          response,
        });
      })
      .catch((err) => {
        return {
          message: "Validation Error",
          err,
        };
      });
  },
};
