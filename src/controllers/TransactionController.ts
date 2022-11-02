import { TransactionService } from "../services/TransactionService";
import { IExpressRequest, IResponse } from "../interfaces/IExpressReq";
import {validationResult} from "express-validator";

export const TransactionController = {
  async createTransaction(req: IExpressRequest, res: IResponse): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { user } = <any>req.body;
    await TransactionService.createNewTransaction(user)
      .then((response) => {
        res.status(200).json({
          message: "Transaction Successfully Added",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could not add Transaction",
        });
      });
  },

  async getAllTransactions(req: IExpressRequest, res: IResponse): Promise<any> {
    await TransactionService.getAllTransactions()
      .then((response) => {
        res.status(200).json({
          message: "Transactions successfully retrieved",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not Get Transactions",
        });
      });
  },

  async getTransaction(req: IExpressRequest, res: IResponse): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { transactionId } = req.params;
    await TransactionService.getAllTransactionById(transactionId)
      .then((response) => {
        res.status(200).json({
          message: "Transaction Successfully Fetched",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not Fetch Transaction",
          err,
        });
      });
  },

  async updateTransaction(req: IExpressRequest, res: IResponse): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { item } = <any>req.body;
    const { transactionId } = req.params;

    await TransactionService.updateTransaction(transactionId, item)
      .then((response) => {
        res.status(200).json({
          message: "User Successfully Modified",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not Modify User",
          err,
        });
      });
  },

  async deleteTransaction(req: IExpressRequest, res: IResponse) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { transactionId } = req.params;

    await TransactionService.deleteTransaction(transactionId)
      .then((response) => {
        res.status(200).json({
          message: "User Successfully Deleted",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not Delete User",
        });
      });
  },

  async withdrawToInternal(req: IExpressRequest, res: IResponse): Promise<any> {
    const { userId } = req.params;
    const { transaction, recipient } = req.body;
    await TransactionService.withdrawToInternalUser(
      userId,
      transaction,
      recipient
    )
      .then((response: any) => {
        res.send({
          message: 'Withdrawal Processed Successfully',
          response
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could Not prepare withdrawal",
          err,
        });
      });
  },

  async withdrawToExternalAccount(req: IExpressRequest, res: IResponse): Promise<any> {
    //To Be Implemented
  },

  async validateExternalBankAccount(req: IExpressRequest, res: IResponse) {
    let {bankId, accountNumber} = req.body;

    await TransactionService.validateExternalAccount(bankId, accountNumber).then((bank) => {
      res.send({
        message: 'bank account validated',
        data: bank
      })
    })
        .catch((err) => {
          res.status(500).json({
            message: "Could Not prepare withdrawal",
            err,
          });
        });
  },

  async listBanks(req: IExpressRequest, res: IResponse) {
    await TransactionService.listBanks().then((banks) => {
      res.send({
        data: banks,
        message: 'bank list retrieved'
      })
    })
        .catch((err) => {
          res.status(500).json({
            message: "Could Not prepare withdrawal",
            err,
          });
        });
  }
};
