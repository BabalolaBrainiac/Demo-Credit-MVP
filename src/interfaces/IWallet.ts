import {ITransactionDTO} from "./ITransaction";

export enum IWallet {
    FIAT = 'FIAT',
    CRYPTO = 'CRYPTO',
}

export enum IWalletOwnerType {
    USER = 'USER',
    BUSINESS = 'BUSINESS',
}

export class IWalletErrorDto {
    status!: string;
    error!: {
        code: string;
        message: string;
        data: any;
    };
}

export class IWalletTDto {
    id!: string;
    walletId: number;
    userId!: string;
    balance!: number;
    type!: IWalletOwnerType;
    created: Date;
}

export interface IWalletDebitDto {
    reference: string;
    amount: {
        value: number;
        denomination: string;
    };
    feeAmount: {
        value: number;
        denomination: string;
    };
    memo: string;
    category?: string;
    metadata?: {
        name: string;
        value: string | number;
    }[];
}

export interface IWalletCreditDto extends IWalletDebitDto {}
