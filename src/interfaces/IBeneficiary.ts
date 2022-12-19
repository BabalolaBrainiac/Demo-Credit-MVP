import {ITransactionRecipient} from "./IRecipient";

export interface IBeneficiary {
    beneficiaryId: string;
    bankId?: string;
    firsName?: string;
    lastName?: string;
    bankName?: string | null;
    accountNumber?: string;
    accountName?: string;
    isActive: boolean;
    dateAdded: string;
    lastUpdated: string;
    isUser: boolean;
}

