import express, { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { body, param } from "express-validator";
import { validateToken } from "../authentication/auth";

const router: Router = express.Router();

router.get("/get", TransactionController.getAllTransactions);

router.get(
  "/get/:transactionId",
  [
    param("transactionId")
      .isUUID()
      .withMessage("Please enter a valid transactionId"),
  ],

  TransactionController.getTransaction
);

router.post(
  "/create",
  [
    body("transactionStatus")
      .isString()
      .withMessage("Please enter transaction status"),
    body("transactionType").isString().withMessage("Please enter a last name"),
    body("walletId").isUUID().withMessage("Please enter a walletId"),
    body("userId").isUUID().withMessage("Please enter userId"),
    body("value").isNumeric().withMessage("Please enter a valid value"),
    body("bankId").isString(),
    body("isInternal").isBoolean().withMessage("Please enter value"),
    body("accountNumber").isString().withMessage("Please enter account number"),
  ],
  TransactionController.createTransaction
);

router.put(
  "/update/:transactionId",
  [
    param("transactionId")
      .isUUID()
      .withMessage("Please enter a valid transactionId"),
  ],
  validateToken,
  TransactionController.updateTransaction
);

router.put(
  "/delete/:transactionId",
  [
    param("transactionId")
      .isUUID()
      .withMessage("Please enter a valid transactionId"),
  ],
  validateToken,
  TransactionController.deleteTransaction
);

router.post("/new/:userId", TransactionController.withdrawToInternal);

router.get("/banks", TransactionController.listBanks);

router.post(
  "/banks/validate",
    [
        body("bankId")
            .isString()
            .withMessage("Please enter valid bankId"),
        body("accountNumber").isString().withMessage("Please enter a valid account number"),
    ],
    validateToken,
  TransactionController.validateExternalBankAccount
);

export default router;
