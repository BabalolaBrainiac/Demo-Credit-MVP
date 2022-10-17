import {UserService} from "../services/userService";
import {IExpressRequest, IResponse} from "../interfaces/IExpressReq";
import {WalletService} from "../services/WalletService";
import {HandleErrorResponse, HandleSuccessResponse} from "../helpers/handlers";
import {UserRepository} from "../repository/userRepository";

export const WalletController = {

    async createWallet(req: IExpressRequest, res: IResponse): Promise<any> {
        const { user } =<any> req.body
        await WalletService.createWallet(user).then((response: any) => {
            res.status(200).json({
                message: "Wallet Successfully Added",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could not add Wallet',
                err
            })
        })
    },

    async getALlWallets(req: IExpressRequest, res: IResponse): Promise<any> {

        await WalletService.getWallets().then((response) => {
            res.status(200).json({
                message: "Wallets Successfully Added",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Get Wallets'
            })
        })
    },


    async getWalletById(req: IExpressRequest, res: IResponse): Promise<any> {
        const {walletId} = req.params;
        await WalletService.getWalletById(walletId).then((response) => {
            res.status(200).json({
                message: "Wallet Successfully Fetched",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Fetch Wallet',
                err,
            })
        })
    },

    async updateWallet(req: IExpressRequest, res: IResponse): Promise<any> {
        const {item} = <any>req.body
        const {walletId} = req.params

        await WalletService.updateWallet(walletId, item).then((response) => {
            res.status(200).json({
                message: "Wallet Successfully Modified",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Modify Wallet',
                err
            })
        })
    },

    async deleteItem(req: IExpressRequest, res: IResponse ) {
        const {walletId} = req.params

        await WalletService.deleteWallet(walletId).then((response) => {
            res.status(200).json({
                message: "Wallet Successfully Deleted",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not Delete Wallet'
            })
        })
    },

    async getWalletBalance(req: IExpressRequest, res: IResponse ) {
        const {walletId} = req.params

        await WalletService.getWalletBalance(walletId).then((response) => {
            res.status(200).json({
                message: "Wallet balance retrieved",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not retrieve balance',
                err
            })
        })
    },


    async debitWallet(req: IExpressRequest, res: IResponse ) {
        const {walletId} = req.params
        const value = req.body.value

        await WalletService.creditWallet(walletId, value).then((response) => {
            res.status(200).json({
                message: "Wallet debited successfully",
                response
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Could Not debit wallet',
                err
            })
        })
    },



}
