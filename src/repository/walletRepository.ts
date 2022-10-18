import { uuid } from "uuidv4";
import db from "../db/dbQueryRunner";

export const WalletRepository = {
  async deleteWallet(id: any): Promise<any> {
    db("demo_wallets").where("walletId", id).del();
  },

  updateWallet(id: string, param: any, value: any): Promise<any> {
    return db("demo_wallets").where("walletId", id).update(param, value);
  },

  getAllWallets() {
    return db("demo_wallets").from("demo_wallets").select("*");
  },

  getWalletById(id: string) {
    return db("demo_wallets")
      .select("*")
      .from("demo_wallets")
      .where("walletId", id)
      .first();
  },
  createWallet(item: any) {
    return db("demo_wallets").insert({
      walletId: uuid(),
      userId: item.userId,
      balance: 0,
      type: item.type,
    });
  },

  getWalletByUserId(id: string) {
    return db("demo_wallets")
      .select("*")
      .from("demo_wallets")
      .where("userId", id)
      .limit(1);
  },

  getWalletBalance(walletId: any) {
    return db("demo_wallets")
      .select("balance")
      .from("demo_wallets")
      .where("walletId", walletId)
      .limit(1);
  },
};
