import {UserRepository} from "../repository/userRepository";

export const UserService = {

    async createNewUser(user: any): Promise<any> {
        try {
            return await UserRepository.createNewItem(user)
        } catch (err) {
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

    async getUserById(userId: any ): Promise<any> {
        try {
            return await UserRepository.getSingleItemById(userId)
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
