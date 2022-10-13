export interface IBankAccount {
    bankId: string;
    bankName?: string | null;
    accountNumber: string;
    accountName?: string;
}

export interface IBankAccountDto extends IBankAccount {}
