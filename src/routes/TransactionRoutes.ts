import express, { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";

const router: Router = express.Router();

router.get("/get", TransactionController.getAllTransactions);

router.get("/get/:transactionId", TransactionController.getTransaction);

router.post("/create", TransactionController.createTransaction);

router.put("/update/:userId", TransactionController.updateTransaction);

router.put("/delete/:userId", TransactionController.deleteTransaction);

router.post("/new/:userId", TransactionController.test);

export default router;
