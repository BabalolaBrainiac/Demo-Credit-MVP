import {RecipientService} from "../services/RecipientService";
import {IExpressRequest, IResponse} from "../interfaces/IExpressReq";
import {HandleErrorResponse, HandleSuccessResponse} from "../helpers/handlers";
import {UserRepository} from "../repository/userRepository";

export const UserController = {

    async createRecipient(req: IExpressRequest, res: IResponse): Promise<any> {
        const { user } =<any> req.body
        await RecipientService.createRecipient(user).then((response) => {
            res.status(200).json({
                message: "Recipient Successfully Added",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could not add Recipient'
            })
        })
    },

    async getAllRecipients(req: IExpressRequest, res: IResponse): Promise<any> {

        await RecipientService.getAllRecipients().then((response) => {
            res.status(200).json({
                message: "Recipient Successfully Fetched",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Get Recipients'
            })
        })
    },


    async getSingleRecipient(req: IExpressRequest, res: IResponse): Promise<any> {
        const {recipientId} = req.params;
        await RecipientService.getRecipientById(recipientId).then((response) => {
            res.status(200).json({
                message: "Recipient Successfully Fetched",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Fetch Recipient',
                err,
            })
        })
    },

    async updateRecipient(req: IExpressRequest, res: IResponse): Promise<any> {
        const {item} = <any>req.body
        const {recipientId} = req.params

        await RecipientService.updateRecipient(recipientId, item).then((response) => {
            res.status(200).json({
                message: "Recipient Successfully Modified",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Modify Recipient',
                err
            })
        })
    },

    async deleteRecipient(req: IExpressRequest, res: IResponse ) {
        const {recipientId} = req.params

        await RecipientService.deleteRecipient(recipientId).then((response) => {
            res.status(200).json({
                message: "Recipient Successfully Deleted",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Delete Recipient'
            })
        })
    },

}
