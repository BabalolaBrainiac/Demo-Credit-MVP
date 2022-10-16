import {Knex} from "knex";

export const typeHelper = async (id: any) => {
    let item: any;
    let tableName: any;

switch (id) {
    case "user":
        item = 'userId';
        tableName = 'demo_user'
    case "wallet":
        item = 'wallet';
        tableName = 'demo_wallet'
    case "recipient":
        item = 'recipientId';
        tableName = 'demo_recipient'
    case "transaction":
        item = 'transactionId';
        tableName = 'demo_transaction'
    default:
        return {
           item,
            tableName
        };
}
}
