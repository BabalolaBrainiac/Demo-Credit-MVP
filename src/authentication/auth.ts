import { IExpressRequest, IResponse } from "../interfaces/IExpressReq";
import { NextFunction } from "express";
import {Base64} from "js-base64";
import { ErrorCode } from "../helpers/ErrorCodes";
import { Keys } from "../config/config";
import jwt from "jsonwebtoken";
import { Errors } from "../helpers/Errors";

export const validateToken = async (req: any, res: IResponse, next: NextFunction) => {
  let authHeaders = req.headers["authorization"];

  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      code: ErrorCode.UNAUTHORIZED,
      message: 'You Are Not Permitted to Perform This Operation'
    });

  return jwt.verify(token, Base64.decode(Keys.JWT_TOKEN as string), {algorithms: ['HS256']},(err: any, user: any) => {
    if (err) {
      throw new Errors(ErrorCode.UNAUTHORIZED, "Invalid Token: Could Not Authorize User");
    }

    res.locals.jwt = user;
    // req.user = user
    next();
  });
};
