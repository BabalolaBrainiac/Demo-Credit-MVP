import express from 'express';
import testRoutes from '../routes/testRoutes'

const router: express.Router = express.Router();

router.use('/', testRoutes);
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

export default router;
