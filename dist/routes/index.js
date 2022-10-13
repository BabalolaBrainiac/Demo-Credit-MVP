"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testRoutes_1 = __importDefault(require("../routes/testRoutes"));
const router = express_1.default.Router();
router.use('/', testRoutes_1.default);
// router.use('/accounts', allAccountRoutes);
//
// router.use('/me/withdrawals', transactionRoutes);
// router.use('/withdrawals', allTransactionsRoutes);
//
// router.use('/withdrawal/methods', methodRoutes);
//
// router.use('/providers', providersRoutes);
//
// router.use(publicRoutes);
router.use('/health', (req, res) => {
    res.send({ status: 'OK' });
});
exports.default = router;
