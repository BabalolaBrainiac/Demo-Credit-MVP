import {UserRepository} from "../repository/userRepository";
import {compare} from "bcrypt";
import {comparePassword} from "../helpers/PasswordHash";
import {Errors} from "../helpers/Errors";
import {ErrorCode} from "../helpers/ErrorCodes";
import {Logger} from "../utils/Logger/Logger";
import {authenticateLogin} from "../authentication/jwt";
import {IUserDto} from "../interfaces/IUser";

export const UserService = {

    async loginUser(item: any) {
        const {email, password} = item;

        try {
            let user = await this.getUserByEmail(email);
            if (user) {
                return  new Errors(ErrorCode.NOT_FOUND, 'No user exists with this email')
            }
            let isAuthorized = await comparePassword(password, user.password);
            if (!isAuthorized) {
                return  new Errors(ErrorCode.NOT_FOUND, 'Password is incorrect. Kindly check password and retry')
            }

            const {accessToken, refreshToken}  = authenticateLogin(user);
            console.log(accessToken, refreshToken)
            return {
                accessToken, refreshToken
            };
        } catch(err) {
            Logger.Error(ErrorCode.REQUEST_FAILED, err)
            return err;
        }

    },

    async createNewUser(user: any): Promise<any> {
        try {
            return UserRepository.createNewItem(user)

        } catch (err) {
            console.log(err)
            throw err
        }

    },

    async getAllUsers(): Promise<any> {
        try {
            return await UserRepository.getAllItems()
        } catch (err) {
            throw err
        }
    },

     getUserById(userId: any ) {
        try {
            return UserRepository.getSingleItemById(userId)
            }
        catch (e) {
            throw e
        }
    },

    async getUserByEmail(email: any ) {
        try {
            return await UserRepository.getSingleItemByEmail(email)
        }
        catch (e) {
            throw e
        }
    },

    async updateUser(userId: any, item: any ): Promise<any> {
        const {param, value} = item;
        try {
            return await UserRepository.updateItem(userId, param, value)
        }
        catch (e) {
            throw e
        }
    },

    async deleteUser(userId: any ) {
        try {
            return await UserRepository.deleteItem(userId)
        }
        catch (e) {
            throw e
        }
    },
}
