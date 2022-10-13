import {Request} from "express";
import {UserService} from "../services/userService";
import {IExpressRequest, IResponse} from "../interfaces/IExpressReq";
import {HandleErrorResponse, HandleSuccessResponse} from "../helpers/handlers";

export const UserController = {

    async getAllUsers(req: IExpressRequest, res: IResponse): Promise<any> {

        try {
            const response = UserService.getAllUsers();
            return res.status(200).json(response)

        } catch (err) {
            HandleErrorResponse(err);
            return err;
        }

    },

    async getSingleUser(req: IExpressRequest, res: IResponse): Promise<any> {

        try {
            const response = await UserService.getUserById(req.body.userId)
             console.log(response)
            return res.status(200).json(response)

        } catch (err) {
            console.log(err)
            HandleErrorResponse(err)
        }

    }

}
