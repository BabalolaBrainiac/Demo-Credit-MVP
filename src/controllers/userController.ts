import {UserService} from "../services/userService";
import {IExpressRequest, IResponse} from "../interfaces/IExpressReq";
import {HandleErrorResponse, HandleSuccessResponse} from "../helpers/handlers";
import {UserRepository} from "../repository/userRepository";

export const UserController = {

    async createNewUser(req: IExpressRequest, res: IResponse): Promise<any> {
        const { user } =<any> req.body
            await UserService.createNewUser(user).then((response) => {
                res.status(200).json({
                    message: "User Successfully Added",
                    response
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Coulr not add User'
                })
            })
    },

    async getAllUsers(req: IExpressRequest, res: IResponse): Promise<any> {

        await UserService.getAllUsers().then((response) => {
            res.status(200).json({
                message: "User Successfully Added",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Get Users'
            })
        })
    },


    async getSingleUser(req: IExpressRequest, res: IResponse): Promise<any> {
        const {userId} = req.params;
        await UserService.getUserById(userId).then((response) => {
            res.status(200).json({
                message: "User Successfully Fetched",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Fetch User',
                err,
            })
        })
    },

    async updateUserInfo(req: IExpressRequest, res: IResponse): Promise<any> {
        const {item} = <any>req.body
        const {userId} = req.params

        await UserService.updateUser(userId, item).then((response) => {
            res.status(200).json({
                message: "User Successfully Modified",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Modify User',
                err
            })
        })
    },

    async deleteItem(req: IExpressRequest, res: IResponse ) {
        const {userId} = req.params

        await UserService.deleteUser(userId).then((response) => {
            res.status(200).json({
                message: "User Successfully Deleted",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Delete User'
            })
        })
    },

}
