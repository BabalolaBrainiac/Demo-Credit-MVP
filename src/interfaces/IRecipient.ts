interface Recipient {
    id: string;
    bankId?: string;
    firsName?: string;
    lastName?: string;
    bankName?: string | null;
    accountNumber?: string;
    accountName?: string;
    walletId?: number;
    isUser: boolean;

}

export type ITransactionRecipient = Recipient;
