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
      let isAuth = await comparePassword(password, user.password);
      if (!isAuth) {
        Logger.Error(ErrorCode.UNAUTHORIZED);
        return new Errors(
          ErrorCode.UNAUTHORIZED,
          "Kindly Enter A Valid/Correct Password"
        );
      }
      return assignToken(user);
    } catch (err) {
      Logger.Error(ErrorCode.REQUEST_FAILED, err);
      return err;
    }
  },

  async createNewUser(user: IUserDto): Promise<any> {
    try {
      let isExist = UserRepository.getSingleItemByEmail(user.email);
      console.log(isExist);
      if (await isExist) {
        return new Errors(
          ErrorCode.BAD_REQUEST,
          "Email already registered to a user"
        );
      }
      return UserRepository.createNewItem(user);
    } catch (err) {
      Logger.Error(ErrorCode.REQUEST_FAILED, err);
      return err;
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
      return UserRepository.getSingleItemByEmail(email);
    } catch (e) {
      throw e;
    }
  },

  async updateUser(item: any): Promise<any> {
    const { param, value, userId } = item;
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
