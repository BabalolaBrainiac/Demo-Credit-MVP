import { RecipientRepository } from "../repository/recipientRepository";
import { UserService } from "./userService";
import { ErrorCode } from "../helpers/ErrorCodes";
import { Errors } from "../helpers/Errors";
import { WalletService } from "./WalletService";
import { TransactionService } from "./TransactionService";

export const RecipientService = {
  async createRecipient(recipient: any): Promise<any> {
    try {
      return await RecipientRepository.createRecipient(recipient);
    } catch (err) {
      throw err;
    }
  },

  async createRecipientWithParams(
    recipientId: any,
    firstName: any,
    lastName: any,
    bankId: any,
    bankName: any,
    accountName: any,
    isUser?: boolean,
    walletId?: any,
    accountNumber?: any
  ): Promise<any> {
    try {
      return await RecipientRepository.createRecipientWithParams(
        recipientId,
        firstName,
        lastName,
        bankId,
        bankName,
        accountName,
        isUser,
        walletId,
        accountNumber
      );
    } catch (err) {
      throw err;
    }
  },

  async prepareInternalRecipient(
    recipientData: any,
    transaction: any,
    isInternal: boolean
  ) {
    const { firstName, lastName, email, accountName, accountNumber } =
      recipientData;
    const { recipientId, value } = transaction;
    const user: any = await UserService.getUserByEmail(email);

    if (isInternal) {
      if (!user)
        throw new Errors(ErrorCode.NOT_FOUND, "Recipient is not a user");
      await RecipientRepository.createRecipientWithParams(
        recipientId,
        firstName,
        lastName,
        isInternal,
        user.walletId
      );
    }
    return await WalletService.creditExtWallet(user.walletId, value);
  },

  async prepareExternalRecipient(recipientData: any) {
    const { bankId, number, recipientId } = recipientData;
    let validatedAccount: any =
      await TransactionService.validateExternalAccount(bankId, number);
    if (!validatedAccount)
      throw new Errors(ErrorCode.NOT_FOUND, "Could not Validate Bank Account");
    const { firstName, lastName, accountNumber, bank, bankCode } =
      validatedAccount;

    await RecipientRepository.createRecipientWithParams(
      recipientId,
      firstName,
      lastName,
      false,
      accountNumber
    );
  },

  async getAllRecipients(): Promise<any> {
    try {
      return await RecipientRepository.getAllRecipients();
    } catch (err) {
      throw err;
    }
  },

  async getRecipientById(recipientId: any): Promise<any> {
    try {
      return await RecipientRepository.getRecipientById(recipientId);
    } catch (e) {
      throw e;
    }
  },

  async updateRecipient(recipientId: any, item: any): Promise<any> {
    const { param, value } = item;
    try {
      return await RecipientRepository.updateRecipient(
        recipientId,
        param,
        value
      );
    } catch (e) {
      throw e;
    }
  },

  async deleteRecipient(recipientId: any) {
    try {
      return await RecipientRepository.deleteRecipient(recipientId);
    } catch (e) {
      throw e;
    }
  },
};
