import { UserRepository } from "../repository/userRepository";
import { Errors } from "../helpers/Errors";
import { ErrorCode } from "../helpers/ErrorCodes";
import { Logger } from "../utils/Logger/Logger";
import { assignToken } from "../authentication/jwt";
import { IUserDto } from "../interfaces/IUser";
import { comparePassword } from "../helpers/PasswordHash";

export const UserService = {
  async loginUser(item: any) {
    const { email, password } = item;

    try {
      let user = await this.getUserByEmail(email);
      if (!user) {
        return new Errors(
          ErrorCode.NOT_FOUND,
          "No user exists with this email"
        );
      }
      let isAuth = await comparePassword(password, user.demo_users_pass);
      if (!isAuth) {
        Logger.Error(ErrorCode.UNAUTHORIZED);
        return new Errors(ErrorCode.UNAUTHORIZED, "Incorrect Password");
      }
      return assignToken(user);
    } catch (err) {
      Logger.Error(ErrorCode.REQUEST_FAILED, err);
      return err;
    }
  },

  async createNewUser(user: IUserDto): Promise<any> {
    try {
      let isExist = await this.getUserByEmail(user.email);
      if (isExist) {
        return new Errors(
          ErrorCode.BAD_REQUEST,
          "Email already registered to a user"
        );
      }
      return UserRepository.createNewItem(user);
    } catch (err) {
      console.log(err);
      Logger.Error(ErrorCode.REQUEST_FAILED, err);
    }
  },

  async getAllUsers(): Promise<any> {
    try {
      return await UserRepository.getAllItems();
    } catch (err) {
      throw err;
    }
  },

  getUserById(userId: any) {
    try {
      return UserRepository.getSingleItemById(userId);
    } catch (e) {
      throw e;
    }
  },

  async getUserByEmail(email: any) {
    try {
      return await UserRepository.getSingleItemByEmail(email);
    } catch (e) {
      throw e;
    }
  },

  async updateUser(userId: any, item: any): Promise<any> {
    const { param, value } = item;
    try {
      return await UserRepository.updateItem(userId, param, value);
    } catch (e) {
      throw e;
    }
  },

  async deleteUser(userId: any) {
    try {
      return await UserRepository.deleteItem(userId);
    } catch (e) {
      throw e;
    }
  },
};
