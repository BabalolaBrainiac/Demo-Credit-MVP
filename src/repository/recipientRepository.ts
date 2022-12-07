import db from "../db/dbQueryRunner";
import { uuid } from "uuidv4";

export const RecipientRepository = {
  async deleteRecipient(id: any): Promise<any> {
    db("demo_recipients").where("recipientId", id).del();
  },

  updateRecipient(id: string, param: any, value: any): Promise<any> {
    return db("demo_recipients").where("recipientId", id).update(param, value);
  },

  getAllRecipients() {
    return db("demo_recipients").from("demo_recipients").select("*");
  },

  getRecipientById(id: string) {
    return db("demo_recipients")
      .select("*")
      .from("demo_recipients")
      .where("recipientId", id)
      .first();
  },

  createRecipient(item: any) {
    return db("demo_recipients").insert({
      recipientId: uuid(),
      firstName: item.firstName,
      lastName: item.lastName,
      bankId: item.bankId,
      bankName: item.bankName,
      accountName: item.accountName,
      isUser: item.isUser,
      walletId: uuid(),
      accountNumber: item.accountNumber,
    });
  },

  createRecipientWithParams(
    recipientId: any,
    firstName: any,
    lastName: any,
    isUser: boolean,
    walletId?: any,
    bankId?: any,
    bankName?: any,
    accountName?: any,
    accountNumber?: any
  ) {
    return db("demo_recipients").insert({
      recipientId: recipientId,
      firstName: firstName,
      lastName: lastName,
      isUser: isUser,
      walletId: walletId,
      bankId: bankId,
      bankName: bankName,
      accountName: accountName,
      accountNumber: accountNumber,
    });
  },
};
