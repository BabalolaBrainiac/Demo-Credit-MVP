import { Knex } from "knex";
import {uuid} from "uuidv4";
import {TransactionStatus} from "../../interfaces/ITransaction";
import {TransactionType} from "../../interfaces/ITransaction";
import {IWalletOwnerType} from "../../interfaces/IWallet";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("demo_users").del();

    // Inserts seed entries
    await knex("demo_users").insert([
        {
            userId: uuid(),
            userName: 'testUser001',
            lastName: 'testLast001',
            firstName: 'testFirst001',
            phoneNumber: '+23490000000000',
            dob: '2022-10-12',
            walletId: uuid(),
            email:'withdrawToInternal@email.com',

        },
        {
            userId: uuid(),
            userName: 'testUser002',
            lastName: 'testLast002',
            firstName: 'testFirst002',
            phoneNumber: '+23490000000001',
            dob: '2022-10-13',
            walletId: uuid(),
            email:'test1@email.com',
        },
        {
            userId: uuid(),
            userName: 'testUser003',
            lastName: 'testLast003',
            firstName: 'testFirst0013',
            phoneNumber: '+234900000000002',
            dob: '2022-10-14',
            walletId: uuid(),
            email:'test2@email.com',
        }
    ]);

    // Deletes ALL existing entries
    await knex("demo_transactions").del();

    // Inserts seed entries
    await knex("demo_transactions").insert([
        {
            transactionId: uuid(),
            status: TransactionStatus.PENDING,
            type: TransactionType.SAVE,
            userId: uuid(),
            walletid: uuid(),
            value: 1000,
            denomination: 'NGN',
            fees: 200,
            bankId: 58,
            isInternal: true,
            accountNumber: 1234567890,
            recipientId: uuid()


        },
        {

            transactionId: uuid(),
            status: TransactionStatus.PENDING,
            type: TransactionType.SAVE,
            userId: uuid(),
            walletid: uuid(),
            value: 1000,
            denomination: 'NGN',
            fees: 200,
            bankId: 58,
            isInternal: true,
            accountNumber: 1234567890,
            recipientId: uuid()
        },
        {

            transactionId: uuid(),
            status: TransactionStatus.PENDING,
            type: TransactionType.SAVE,
            userId: uuid(),
            walletid: uuid(),
            value: 1000,
            denomination: 'NGN',
            fees: 200,
            bankId: 58,
            isInternal: true,
            accountNumber: 1234567890,
            recipientId: uuid()
        }
    ]);

    // Deletes ALL existing entries
    await knex("demo_recipients").del();

    // Inserts seed entries
    await knex("demo_recipients").insert([
        {
            recipientId: uuid(),
            bankId: uuid(),
            firstName: 'testRecipient1',
            lastName: 'testRecipient2',
            bankname: '',
            accountName: '',
            isUser: true,
            walletId: uuid(),
            accountNumber: 1234567890
        },
        {
            recipientId: uuid(),
            bankId: uuid(),
            firstName: 'testRecipient2',
            lastName: 'testRecipient2',
            bankname: 'GTB',
            accountName: 'sarewagba',
            isUser: true,
            walletId: uuid(),
            accountNumber: 1234567890
        },
        {
            recipientId: uuid(),
            bankId: uuid(),
            firstName: 'testRecipient3',
            lastName: 'testRecipient3',
            bankname: 'Access',
            accountName: 'kogbagidi',
            isUser: true,
            walletId: uuid(),
            accountNumber: 1234567891
        }
    ]);

    // Deletes ALL existing entries
    await knex("demo_wallets").del();

    // Inserts seed entries
    await knex("demo_wallets").insert([
        {
            walletId: uuid(),
            userId: uuid(),
            balance: 100000,
            type: IWalletOwnerType.USER
        },
        {
            walletId: uuid(),
            userId: uuid(),
            balance: 100000,
            type: IWalletOwnerType.USER
        },
        {
            walletId: uuid(),
            userId: uuid(),
            balance: 100000,
            type: IWalletOwnerType.USER
        }
    ]);
}
