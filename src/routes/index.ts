import express from 'express';
import testRoutes from '../routes/testRoutes'
import userRoutes from './userRoutes'
import transactionRoutes from "./TransactionRoutes";
import walletRoutes from "./WalletRoutes";

const router: express.Router = express.Router();

router.use('/', testRoutes);

router.use('/api/users', userRoutes);

router.use('/api/transactions', transactionRoutes)

router.use('/api/wallets', walletRoutes)

router.use('/health', (req, res) => {
    res.send({ status: 'OK' });
});

export default router;
