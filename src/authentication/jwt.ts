import jwt from "jsonwebtoken";
import { Keys } from "../config/config";
import { IUserLoginDto } from "../interfaces/IUser";
import { ErrorCode } from "../helpers/ErrorCodes";
import { Logger } from "../utils/Logger/Logger";
import {Base64} from "js-base64";

let tokens;

export const assignToken = (payload: any) => {
  return jwt.sign(payload, Keys.JWT_TOKEN as string);
};

const generateToken = (item: any) => {
  try {
    return jwt.sign(item, Base64.decode(Keys.JWT_TOKEN), {
      issuer: Keys.JWT_ISSUER,
      algorithm: "HS256",
      expiresIn: "20s",
    });
  } catch (err) {
    Logger.Error(ErrorCode.REQUEST_FAILED, err);
    return err;
  }
};
export const authenticateLogin = (user: IUserLoginDto) => {
  return generateToken(user);
};
