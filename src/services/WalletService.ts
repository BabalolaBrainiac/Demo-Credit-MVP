import {WalletRepository} from "../repository/walletRepository";
import {UserRepository} from "../repository/userRepository";
import {exists} from "fs";
import {rejects} from "assert";
import {Logger} from "../utils/Logger/Logger";
import {ErrorCode} from "../helpers/ErrorCodes";

export const WalletService = {

    async createWallet(user: any): Promise<any> {

        try {
            await this.validateWallet(user.userId);
            let newWallet =  WalletRepository.createWallet(user).then((wallet) => {
               return {
                   message: 'Wallet Added',
                   wallet
               }
           })
            return newWallet
        } catch(err) {
            Logger.Error(ErrorCode.BAD_REQUEST, err)
        }
    },
    async validateWallet(userId: any) {
        return new Promise(async () => {
            let wallet = await WalletRepository.getWalletByUserId(userId);
            if (wallet[0]?.walletId) throw new Error('User has a wallet already');
        }).catch((err) => {
           Logger.Error(ErrorCode.BAD_REQUEST, err)
        })
    },

    async getWallets(): Promise<any> {
        try {
            return await WalletRepository.getAllWallets()
        } catch (err) {
            throw err
        }
    },

    async getWalletById(walletId: any ): Promise<any> {
        try {
            return await WalletRepository.getWalletById(walletId)
        }
        catch (e) {
            throw e
        }
    },

    async getWalletBalance(walletId: any): Promise<any> {
        return new Promise( (resolve, reject) => {

            let wallet = WalletRepository.getWalletBalance(walletId);
            console.log(resolve(wallet))
        }).catch((err) => {
            Logger.Error(ErrorCode.BAD_REQUEST, err)
        })

    },

    async debitWallet(walletId: any, value: any) {
            let debitWallet = await this.getWalletBalance(walletId).then((balance: any) => {
                if (balance < value) {
                    throw new Error('Insufficient funds')
                }

                let newBal = value - balance;
                return this.updateWallet(walletId, {balance: 'balance', debit: newBal});
            }).catch((err) => {
                return err;
            });
    },

    async creditWallet(walletId: any, value: any) {
        let creditWallet = await this.getWalletBalance(walletId).then((balance: any) => {
            let newBal = value + balance;
            return this.updateWallet(walletId, {balance: 'balance', debit: newBal});
        }).catch((err) => {
            return err;
        });
    },

    async updateWallet(walletId: any, item: any ): Promise<any> {
        const {param, value} = item;
        try {
            return await UserRepository.updateItem(walletId, param, value)
        }
        catch (e) {
            throw e
        }
    },

    async deleteWallet(walletId: any ) {
        try {
            return await UserRepository.deleteItem(walletId)
        }
        catch (e) {
            throw e
        }
    },
}
