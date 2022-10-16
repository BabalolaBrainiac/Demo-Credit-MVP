import db from '../db/dbQueryRunner'
import {CrudRepository} from "./CrudRepository";
import {uuid} from "uuidv4";
import {TransactionStatus} from "../interfaces/ITransaction";

export const TransactionRepository = {

    async deleteTransaction(id: any): Promise<any> {
        db('demo_transactions')
            .where('transactionId', id)
            .del()
    },

    updateTransaction(id: string, param: any, value: any): Promise<any> {
        return db('demo_transactions')
            .where('transactionId', id)
            .update(param, value)
    },

    getTransactionById(id: string) {
        return db('demo_transactions').select('*')
            .from('demo_transactions')
            .where('transactionId', id)
            .first();
    },

    getAllTransactions() {
        return db('demo_transactions')
            .from('demo_transactions')
            .select('*');

    },

    getTransactionByEmail(email: string) {
        return db('demo_transactions').select('*')
            .from('demo_transactions')
            .where('email', email)
            .first();
    },

    createTransaction(item: any) {
        return db('demo_transactions').insert({
            transactionId: uuid(),
            status: TransactionStatus.PENDING,
            type: item.type,
            userId: item.userId,
            walletId: item.walletId,
            fees: item.fees,
            value: item.value,
            denomination: item.denomination,
            bankId: item.bankId,
            isInternal: item.isInternal,
            accountNumber: item.accountNumber,
            recipientId: item.recipientId
        })
    },

    createTransactionWithParam(transactionId: any, status: any, type: any, walletId: any, userId: any, fees: any,
            value: any, denomination: any, bankId:  any, isInternal: any, accountNumber: any, recipientId: any) {
        return db('demo_transactions').insert({
            transactionId: uuid(),
            status: status,
            type: type,
            userId: userId,
            walletId: walletId,
            fees: fees,
            value: value,
            denomination: denomination,
            bankId: bankId,
            isInternal: isInternal,
            accountNumber: accountNumber,
            recipientId: recipientId
        })

    }



}
