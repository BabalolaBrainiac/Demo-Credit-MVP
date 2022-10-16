import {RecipientRepository} from "../repository/recipientRepository";
import {uuid} from "uuidv4";
import {UserService} from "./userService";
import {ErrorCode} from "../helpers/ErrorCodes";

export const RecipientService = {

    async createRecipient(recipient: any): Promise<any> {
        try {
            return await RecipientRepository.createRecipient(recipient)
        } catch (err) {
            throw err
        }

    },

    async createRecipientWithParams(recipientId: any, firstName: any, lastName: any, bankId: any, bankName: any, accountName: any,
                                    isUser?: boolean, walletId?: any, accountNumber?: any): Promise<any> {
        try {
            return await RecipientRepository.createRecipientWithParams(recipientId, firstName, lastName, bankId,
                bankName, accountName,
                isUser, walletId, accountNumber)
        } catch (err) {
            throw err
        }

    },


    async prepareRecipient(item: any, transaction: any, isInternal: boolean) {
        const {firstName, lastName, email, accountName, accountNumber} = item;

        let recipientData: any = {firstName, lastName, email, accountName, accountNumber};

        if (isInternal) {
            const user = await UserService.getUserByEmail(recipientData.email);
            if (!user) throw new Error('This email does not belong to any user')

            Object.assign(recipientData.walletId, user.walletId);
        }
             await RecipientRepository.createRecipientWithParams(uuid(), recipientData.firstName,
                recipientData.lastName, isInternal, transaction.walletId).then((recipient) => {
                    return recipient;
            })
    },

    async getAllRecipients(): Promise<any> {
        try {
            return await RecipientRepository.getAllRecipients()
        } catch (err) {
            throw err
        }
    },

    async getRecipientById(recipientId: any ): Promise<any> {
        try {
            return await RecipientRepository.getRecipientById(recipientId)
        }
        catch (e) {
            throw e
        }
    },


    async updateRecipient(recipientId: any, item: any ): Promise<any> {
        const {param, value} = item;
        try {
            return await RecipientRepository.updateRecipient(recipientId, param, value)
        }
        catch (e) {
            throw e
        }
    },

    async deleteRecipient(recipientId: any ) {
        try {
            return await RecipientRepository.deleteRecipient(recipientId)
        }
        catch (e) {
            throw e
        }
    },
}
