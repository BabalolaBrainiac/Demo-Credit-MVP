import {TransactionRepository} from "../repository/transactionRepository";

export const TransactionService = {

    async createNewTransaction(transaction: any): Promise<any> {
        try {
            return await TransactionRepository.createTransaction(transaction);
        } catch (err) {
            throw err
        }

    },

    async getAllTransactions(): Promise<any> {
        try {
            return await TransactionRepository.getAllTransactions()
        } catch (err) {
            throw err
        }
    },

    async getAllTransactionById(transactionId: any ): Promise<any> {
        try {
            return await TransactionRepository.getTransactionById(transactionId)
        }
        catch (e) {
            throw e
        }
    },


    async updateTransaction(transactionId: any, item: any ): Promise<any> {
        const {param, value} = item;
        try {
            return await TransactionRepository.updateTransaction(transactionId, param, value)
        }
        catch (e) {
            throw e
        }
    },

    async deleteTransaction(transactionId: any ) {
        try {
            return await TransactionRepository.deleteTransaction(transactionId)
        }
        catch (e) {
            throw e
        }
    },
}
