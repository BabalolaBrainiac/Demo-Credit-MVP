import {UserService} from "../services/userService";
import {IExpressRequest, IResponse} from "../interfaces/IExpressReq";
import {ErrorCode} from "../helpers/ErrorCodes";
import {NextFunction} from "express";

export const UserController = {

    async createNewUser(req: IExpressRequest, res: IResponse, next: NextFunction): Promise<any> {
            const { user } =<any> req.body
                await UserService.createNewUser(user).then((response) => {
                    res.status(200).json({
                        message: "User Successfully Added",
                        response
                    })
                }).catch((err) => {
                    if (err.code == 'ER_DUP_ENTRY') {
                       res.status(500).json({
                           message: 'Email is already registered to a user',
                       })
                    }
                    res.status(500).json({
                        message: 'Could not add User',
                        err
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
             if(!response) throw new Error(ErrorCode.NOT_FOUND)
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

    async login(req: IExpressRequest, res: IResponse, next: NextFunction) {
        const {user} = req.body;

        await UserService.loginUser(user).then((response) => {
            res.status(200).json({
                message: "Login Successful",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Login Not Successful'
            })
        })
    }

}
