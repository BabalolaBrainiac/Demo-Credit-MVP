import {TransactionRepository} from "../repository/transactionRepository";
import {TransactionStatus, TransactionType} from "../interfaces/ITransaction";
import {UserService} from "./userService";
import {ErrorCode} from "../helpers/ErrorCodes";
import {WalletService} from "./WalletService";
import {Logger} from "../utils/Logger/Logger";
import {uuid} from "uuidv4";
import {Errors} from "../helpers/Errors";
import {RecipientService} from "./RecipientService";

export const TransactionService = {
  async createNewTransaction(transaction: any): Promise<any> {
    try {
      return await TransactionRepository.createTransaction(transaction);
    } catch (err) {
      throw err;
    }
  },

  async getAllTransactions(): Promise<any> {
    try {
      return await TransactionRepository.getAllTransactions();
    } catch (err) {
      throw err;
    }
  },

  async getAllTransactionById(transactionId: any): Promise<any> {
    try {
      return await TransactionRepository.getTransactionById(transactionId);
    } catch (e) {
      throw e;
    }
  },

  async updateTransaction(transactionId: any, item: any): Promise<any> {
    const { param, value } = item;
    try {
      return await TransactionRepository.updateTransaction(
        transactionId,
        param,
        value
      );
    } catch (e) {
      throw e;
    }
  },

  async deleteTransaction(transactionId: any) {
    try {
      return await TransactionRepository.deleteTransaction(transactionId);
    } catch (e) {
      throw e;
    }
  },
  async getWalletBalance(walletId: string) {
    try {
      return await WalletService.getWalletBalance(walletId);
    } catch (err) {}
  },

  async sendFundsToInternalUser(
    transaction: any,
    userId: string
  ) {
    try {
      let newTx = await this.prepareWithdrawal(userId, transaction);
      if (!newTx) throw new Error(ErrorCode.BAD_REQUEST);

      await RecipientService.prepareRecipient(recipientItem, newTx, true).then(() => {
          const withdraw = WalletService.debitWallet(newTx.walletId, newTx.value)
      })

      // const {newTx, newRec} = await Promise.all([
      //     await this.prepareWithdrawal(userId, transaction),
      //     await RecipientService.prepareRecipient(recipient, transaction)
      //
      // ])
    } catch (err) {}
  },
  async prepareWithdrawal(userId: any, transaction: any) {
    //check if user is our user

    try {
      let user = await UserService.getUserById(userId);
      if (!user) {
        throw new Errors(ErrorCode.NOT_FOUND, "User not found");
      }

      let walletBalance = await this.getWalletBalance(user.walletId);

      if (walletBalance[0].balance < transaction.value) {
        throw new Errors(
          ErrorCode.BAD_REQUEST,
          "You have insufficient funds to perform this operation"
        );
      }

      let tx: any = await this.createTransactionWithParam(
        uuid(),
        TransactionStatus.PENDING,
        TransactionType.WITHDRAW,
        userId,
        user.walletId,
        0,
        transaction.value,
        "NGN",
        transaction.bankId || null,
        transaction.isInternal || false,
        transaction.accountNumber || null,
        uuid()
      );
      if (!tx)
        throw new Errors(ErrorCode.BAD_REQUEST, "Could not prepare withdrawal");

      return tx;
    } catch (err: any) {
      Logger.Error(
        "Unable to Prepare Withdrawal",
        err.response?.data?.message || err.message,
        err.stack
      );
      return err;
    }
  },

  async createTransactionWithParam(
    transactionId: any,
    status: any,
    type: any,
    walletId: any,
    userId: any,
    fees: any,
    value: any,
    denomination: any,
    bankId: any,
    isInternal: any,
    accountNumber: any,
    recipientId: any
  ) {
    try {
      return await TransactionRepository.createTransactionWithParam(
        transactionId,
        status,
        type,
        walletId,
        userId,
        fees,
        value,
        denomination,
        bankId,
        isInternal,
        accountNumber,
        recipientId
      );
    } catch (err) {
      return err;
    }
  },
};
