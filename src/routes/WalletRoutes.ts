import express, { Router } from "express";
import { WalletController } from "../controllers/WalletController";

const router: Router = express.Router();

router.get("/get", WalletController.getALlWallets);

router.get("/get/:walletId", WalletController.getWalletById);

router.post("/create", WalletController.createWallet);

router.put("/update/:walletId", WalletController.updateWallet);

router.put("/delete/:walletId", WalletController.deleteItem);

router.get("/balance/:walletId", WalletController.getWalletBalance);

router.put("/debit/:walletId", WalletController.debitWallet);

router.put("/credit/:walletId", WalletController.creditWallet);

export default router;
