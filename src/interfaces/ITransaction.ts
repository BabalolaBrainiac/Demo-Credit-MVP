import {IWalletCreditDto} from "./IWallet";

export enum TransactionType {
    WITHDRAW = 'WITHDRAW',
    SAVE = 'SAVE',
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'COMPLETE',
}
export class ITransactionDTO {
    transactionReference: string;
    status: TransactionStatus;
    type: TransactionType;
    userId: string;
    walletId: string;
    value: number;
    denomination: string;
    isInternal?: boolean;
    fees?: number;
    bankId?: number;
    accountNumber?: number;
    recipientId?: string;
    created: Date;
    updated: Date;
    completed: Date;
}

export interface ITransactionRecipient {
    isInternal: boolean;
    recipientId: string;
    firstName?: string;
    lastName?: string;
    bankId?: string;
    accountNumber: string;
}

export interface ITransactionRequest {
    type: TransactionType;
    status: TransactionStatus;
    userId: string;
    recipientId?: string;
    value: string;
    isSufficient?: boolean;
    denomination: string;
    paymentDetails: ITransactionRecipient;
}

