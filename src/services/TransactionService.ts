import { TransactionRepository } from "../repository/transactionRepository";
import { TransactionStatus, TransactionType } from "../interfaces/ITransaction";
import { UserService } from "./userService";
import { ErrorCode } from "../helpers/ErrorCodes";
import { WalletService } from "./WalletService";
import { Logger } from "../utils/Logger/Logger";
import { uuid } from "uuidv4";
import { Errors } from "../helpers/Errors";
import { RecipientService } from "./RecipientService";

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
    } catch (err) {
      Logger.Error(err);
      return new Errors(ErrorCode.REQUEST_FAILED, "Could not get balance");
    }
  },

  async sendFundsToInternalUser(
    userId: string,
    transaction: any,
    recipientItem: any
  ) {
    try {
      let newTx = await this.prepareWithdrawal(userId, transaction);
      if (newTx.newRef && newTx.recipientId && newTx.userWalletId) {
        await RecipientService.prepareRecipient(
          recipientItem,
          newTx,
          true
        ).then((recipient) => {
          return WalletService.debitWallet(newTx.userWalletId, newTx.value)
        });
      }
    } catch (err: any) {
      throw new Errors(ErrorCode.BAD_REQUEST, err.message);
    }
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

      if (user && walletBalance[0].balance > transaction.value) {
        const txReference = uuid();
        const recipientId = uuid();
        await this.createTransactionWithParam(
          txReference,
          TransactionStatus.PENDING,
          TransactionType.WITHDRAW,
          user.walletId,
          userId,
          0,
          transaction.value,
          "NGN",
          transaction.bankId || null,
          transaction.isInternal || false,
          transaction.accountNumber || null,
          recipientId
        ).then((tx) => {
          return {
            tx,
          };
        });
        return {
          newRef: txReference,
          recipientId: recipientId,
          userWalletId: user.walletId,
          value: transaction.value,
        };
      }
    } catch (err: any) {
      Logger.Error("Unable to Prepare Withdrawal", err);
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
