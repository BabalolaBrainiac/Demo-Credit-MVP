import express from 'express';

const router = express.Router();

router.get('/', () => {
    console.log("Routes Working")
});

export default router;
