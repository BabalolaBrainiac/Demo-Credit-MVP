import express from 'express';
import testRoutes from '../routes/testRoutes'
import userRoutes from './userRoutes'

const router: express.Router = express.Router();

router.use('/', testRoutes);

router.use('/api/users', userRoutes);

router.use('/health', (req, res) => {
    res.send({ status: 'OK' });
});

export default router;
